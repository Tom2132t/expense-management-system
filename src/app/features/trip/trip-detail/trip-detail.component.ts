import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { TripModel } from '../../../shared/models/trip.model';
import { selectTripById } from '../../../store/trip/trip.selectors';
import * as TripActions from '../../../store/trip/trip.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastService } from '../../../core/services/toaster.service';
import { AuthService } from '../../../auth/auth.service';
import { Role } from '../../../shared/enums/role.enum';
import { TripStatus } from '../../../shared/enums/trip-status.enum';
import {
  CommunicationActions,
  CommunicationService
} from '../../../core/services/communication.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent implements OnInit {
  trip$!: Observable<TripModel> | Subscription;
  tripId!: string;

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _fb = inject(FormBuilder);
  private _toasterService = inject(ToastService);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _communicationService = inject(CommunicationService);

  isApprover = this._authService.user?.role === Role.APPROVER;
  isFinancer = this._authService.user?.role === Role.FINANCE;
  isEndUser = this._authService.user?.role === Role.END_USER;
  isTripSentForApproval = false;
  isTripApproved = false;
  isDraft = false;

  tripForm: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: [{ value: '', disabled: true }, [Validators.required]],
    financeStatus: [{ value: '', disabled: true }],
    totalExpense: [{ value: 0, disabled: true }],
    comment: [{ value: '', disabled: !this.isApprover }, [Validators.required]],
    expenses: this._fb.group({
      carRental: this._fb.group({
        carName: [''],
        pickUpDate: [''],
        dropOffDate: [''],
        pickUpLocation: [''],
        dropOffLocation: [''],
        totalPrice: [0]
      }),
      hotel: this._fb.group({
        hotelName: [''],
        location: [''],
        checkInDate: [''],
        checkOutDate: [''],
        totalPrice: [0]
      }),
      flight: this._fb.group({
        airline: [''],
        from: [''],
        to: [''],
        departureDate: [''],
        arrivalDate: [''],
        totalPrice: [0]
      }),
      taxi: this._fb.group({
        from: [''],
        to: [''],
        timeAndDate: [''],
        totalPrice: [0]
      })
    })
  });

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('TRIP_ID');

    if (id) {
      this._store.dispatch(TripActions.loadTripById({ id }));
      this.tripId = id;

      this.trip$ = this._store
        .select(selectTripById(id || ''))
        .pipe(
          filter((state): state is TripModel => !!state),
          tap((state) => {
            this.tripForm.patchValue(state);

            this.isTripSentForApproval =
              state.status === TripStatus.PENDING_APPROVAL;
            this.isTripApproved = state.status === TripStatus.APPROVED;
            this.isDraft = state.status === TripStatus.DRAFT;

            if (
              (state.id && state.status === TripStatus.APPROVED) ||
              state.status === TripStatus.PENDING_APPROVAL
            ) {
              this.tripForm.disable();
            }
            if (
              state.status === TripStatus.PENDING_APPROVAL &&
              this.isApprover
            ) {
              this.tripForm.get('comment')?.enable();
              this.tripForm.get('comment')?.addValidators(Validators.required);
            }
            if (this.isFinancer && state.status === TripStatus.APPROVED) {
              this.tripForm.get('financeStatus')?.enable();
              this.tripForm
                .get('financeStatus')
                ?.addValidators(Validators.required);
            }
          })
        )
        .subscribe();
    }
  }

  onSubmit(): void {
    if (this.tripForm.invalid) {
      return;
    }

    const tripData = this.tripForm.getRawValue();

    const payload = {
      ...tripData,
      totalExpense: this._calculateTotalExpense(tripData),
      status: tripData.status || 'draft'
    };

    if (this.tripId) {
      this._store.dispatch(
        TripActions.updateTrip({ id: this.tripId, trip: payload })
      );
      this._communicationService.sendMessage(CommunicationActions.RELOAD_TRIPS);
      this._toasterService.showToast('success', 'Trip Updated Succesfully');
    } else {
      this._store.dispatch(TripActions.addTrip({ trip: payload }));
      this._communicationService.sendMessage(CommunicationActions.RELOAD_TRIPS);
      this._toasterService.showToast('success', 'Trip created Succesfully');
      this._router.navigate(['../'], { relativeTo: this._route });
    }
  }

  onSendForApproval(): void {
    const tripData = this.tripForm.getRawValue();
    const payload = {
      ...tripData,
      totalExpense: this._calculateTotalExpense(tripData),
      status: TripStatus.PENDING_APPROVAL
    };

    this._store.dispatch(
      TripActions.updateTrip({ id: this.tripId, trip: payload })
    );

    this._communicationService.sendMessage(CommunicationActions.RELOAD_TRIPS);

    this.tripForm.patchValue({
      status: TripStatus.PENDING_APPROVAL
    });

    this.tripForm.disable();
    this.isTripSentForApproval = true;
    this.isDraft = false;
    this._toasterService.showToast(
      'success',
      'Trip sent for approval successfully'
    );
  }

  onApproveTrip(): void {
    const form = this.tripForm.getRawValue();
    const updatedTrip = {
      ...form,
      status: TripStatus.APPROVED
    };

    this._store.dispatch(
      TripActions.updateTrip({ id: this.tripId, trip: updatedTrip })
    );

    this._communicationService.sendMessage(CommunicationActions.RELOAD_TRIPS);

    this.tripForm.patchValue({
      status: TripStatus.APPROVED
    });

    this.tripForm.disable();
    this.isTripApproved = true;
    this._toasterService.showToast('success', 'Trip approved successfully');
  }

  onBack() {
    this._router.navigate(['/trip/list']);
  }

  private _calculateTotalExpense(trip: TripModel): number {
    const carRentalExpense = trip.expenses?.carRental?.totalPrice || 0;
    const hotelExpense = trip.expenses?.hotel?.totalPrice || 0;
    const flightExpense = trip.expenses?.flight?.totalPrice || 0;
    const taxiExpense = trip.expenses?.taxi?.totalPrice || 0;

    return carRentalExpense + hotelExpense + flightExpense + taxiExpense;
  }
}
