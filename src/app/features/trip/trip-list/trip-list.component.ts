import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectAllTrips } from '../../../store/trip/trip.selectors';
import { CommonModule } from '@angular/common';
import { TripModel } from '../../../shared/models/trip.model';
import * as TripActions from '../../../store/trip/trip.actions';
import { AppState } from '../../../store/app.state';
import { ToastService } from '../../../core/services/toaster.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
export class TripListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _store = inject(Store<AppState>);
  private _toasterService = inject(ToastService);

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
      this.dataSource.data = res;
    })
  );

  ngOnInit(): void {
    this._loadTrips();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onUpdate(trip: TripModel): void {}

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
  }
}
