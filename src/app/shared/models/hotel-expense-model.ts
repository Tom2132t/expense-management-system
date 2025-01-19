import { ExpenseBaseModel } from "./expense-base.model";

export interface HotelExpenseModel extends ExpenseBaseModel {
    hotelName: string;
    location: string;
    checkInDate: Date;
    checkOutDate: Date;
  }