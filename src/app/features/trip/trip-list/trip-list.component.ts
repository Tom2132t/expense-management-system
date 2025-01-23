import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../../core/services/toaster.service';
import { Role } from '../../../shared/enums/role.enum';
import { TripStatus } from '../../../shared/enums/trip-status.enum';
import { TripModel } from '../../../shared/models/trip.model';
import { AppState } from '../../../store/app.state';
import * as TripActions from '../../../store/trip/trip.actions';
import {
  selectAllTrips,
  selectApprovedTrips
} from '../../../store/trip/trip.selectors';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _authService = inject(AuthService);
  private _store = inject(Store<AppState>);
  private _toasterService = inject(ToastService);
  private _router = inject(Router);

  isEndUser = this._authService.user?.role === Role.END_USER;
  isApprover = this._authService.user?.role === Role.APPROVER;
  isFinance = this._authService.user?.role === Role.FINANCE;

  displayedColumns: string[] = [
    'name',
    'duration',
    'startDate',
    'status',
    'totalExpense',
    'actions'
  ];

  dataSource = new MatTableDataSource<TripModel>();

  trips$!: Observable<TripModel[]>;
  tripStatus = TripStatus;
  dialogRef!: MatDialogRef<ConfirmDialogComponent> | null;

  readonly dialog = inject(MatDialog);

  openDialog(): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
  }

  ngOnInit(): void {
    this.trips$ =
      this.isEndUser || this.isApprover
        ? this._store.select(selectAllTrips)
        : this._store.select(selectApprovedTrips);

    this.trips$
      .pipe(
        tap((res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      )
      .subscribe();

    this._loadTrips();
  }

  onUpdate(id: TripModel): void {
    this._router.navigate(['/trip', id]);
  }

  onDelete(id: string): void {
    this.dialogRef = this.openDialog();

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.dispatch(TripActions.deleteTrip({ id }));
        this._toasterService.showToast('success', 'Trip is deleted');
        this._loadTrips();
      }
      this.dialogRef = null;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _loadTrips(): void {
    this._store.dispatch(TripActions.loadTrips());
  }
}
