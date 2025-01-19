import { ExpenseBaseModel } from "./expense-base.model";

export interface CarRentalExpenseModel extends ExpenseBaseModel {
    carName: string;
    pickUpDateTime: Date;
    dropOffDateTime: Date;
    pickUpLocation: string;
    dropOffLocation: string;
  }