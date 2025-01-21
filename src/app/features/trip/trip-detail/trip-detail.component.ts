import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent implements OnInit {
  trip$!: Observable<TripModel> | Subscription;

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _fb = inject(FormBuilder);

  tripForm: FormGroup = this._fb.group({
    id: [''],
    name: [''],
    duration: [''],
    startDate: [''],
    endDate: [''],
    status: [''],
    totalExpense: [0],
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

      this.trip$ = this._store
        .select(selectTripById(id || ''))
        .pipe(
          filter((state): state is TripModel => !!state),
          tap((state) => {
            this.tripForm.patchValue(state);
          })
        )
        .subscribe();
    }
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      console.log('Form Submitted:', this.tripForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
