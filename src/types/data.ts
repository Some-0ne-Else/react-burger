export interface IOrder {
  _id: string;
  createdAt: string;
  number: number;
  name: string;
  status: string;
  ingredients: string[];
}
