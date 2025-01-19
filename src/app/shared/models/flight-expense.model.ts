import { ExpenseBaseModel } from './expense-base.model';

export interface FlightExpenseModel extends ExpenseBaseModel {
  airline: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
}
