import { FinanceStatus } from '../enums/finance-status.enum';
import { TripStatus } from '../enums/trip-status.enum';
import { CarRentalExpenseModel } from './car-rental-expense.model';
import { FlightExpenseModel } from './flight-expense.model';
import { HotelExpenseModel } from './hotel-expense-model';
import { TaxiExpenseModel } from './taxi-expense.model';

export interface TripModel {
  id: string;
  name: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: TripStatus;
  createdBy: string;
  approverNotes?: string;
  financeStatus?: FinanceStatus;
  carRentals: CarRentalExpenseModel[];
  hotels: HotelExpenseModel[];
  flights: FlightExpenseModel[];
  taxis: TaxiExpenseModel[];
}
