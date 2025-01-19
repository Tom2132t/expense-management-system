export interface ExpenseBaseModel {
  id: string;
  tripId: string;
  totalPrice: number;
  notes?: string;
}
