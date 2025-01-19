import { ExpenseBaseModel } from "./expense-base.model";

export interface TaxiExpenseModel extends ExpenseBaseModel {
  from: string;
  to: string;
  dateTime: Date;
}
