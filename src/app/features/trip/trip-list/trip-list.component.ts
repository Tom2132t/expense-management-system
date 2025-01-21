import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toaster.service';
import { TripModel } from '../../../shared/models/trip.model';
import { AppState } from '../../../store/app.state';
import * as TripActions from '../../../store/trip/trip.actions';
import { selectAllTrips } from '../../../store/trip/trip.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  private _store = inject(Store<AppState>);
  private _toasterService = inject(ToastService);
  private _router = inject(Router);

  displayedColumns: string[] = [
    'name',
    'duration',
    'startDate',
    'status',
    'totalExpense',
    'actions'
  ];

  dataSource = new MatTableDataSource<TripModel>();

  trips$: Observable<TripModel[]> = this._store.select(selectAllTrips).pipe(
    tap((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  ngOnInit(): void {
    this._loadTrips();
  }

  onUpdate(id: TripModel): void {
    this._router.navigate(['/trip', id]);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this._store.dispatch(TripActions.deleteTrip({ id }));

      this._toasterService.showToast('success', 'Trip is deleted');

      this._loadTrips();
    }
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
    this.trips$.subscribe();
  }
}
