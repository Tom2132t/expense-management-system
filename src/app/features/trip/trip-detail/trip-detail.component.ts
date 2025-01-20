import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent {
  private _fb = inject(FormBuilder);

  tripForm: FormGroup = this._fb.group({
    trip_name: ['', Validators.required],
    trip_duration: ['', [Validators.required]],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],

    car_rental: this._fb.group({
      car_name: [''],
      pick_up_time: [''],
      drop_off_time: [''],
      pick_up_location: [''],
      drop_off_location: [''],
      car_rental_price: [0, [Validators.min(0)]]
    }),

    hotel: this._fb.group({
      hotel_name: [''],
      hotel_location: [''],
      check_in_date: [''],
      check_out_date: [''],
      hotel_price: [0, [Validators.min(0)]]
    }),

    flight: this._fb.group({
      airline: [''],
      departure_location: [''],
      arrival_location: [''],
      departure_time: [''],
      arrival_time: [''],
      flight_price: [0, [Validators.min(0)]]
    }),

    taxi: this._fb.group({
      taxi_name: [''],
      taxi_service: [''],
      taxi_pick_up_time: [''],
      taxi_drop_off_time: [''],
      taxi_price: [0, [Validators.min(0)]]
    })
  });

  onSubmit(): void {
    if (this.tripForm.valid) {
      console.log('Form Submitted:', this.tripForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
