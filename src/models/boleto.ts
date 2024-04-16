export interface Boleto {
  id: string;
  name: string;
  debitId: string;
  governmentId: string;
  email: string;
  debitAmount: number;
  dueDate: number;
}
