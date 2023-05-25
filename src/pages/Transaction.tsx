export interface initialValue{
  id:number,
  transactionDate: string,
  monthYear: string,
  transactionType: string,
  fromAccount: string,
  toAccount: string,
  amount: number,
  receipt: string,
  notes: string,
}

export interface userDetail{
  uname : string;
  email : string;
  password : string;
}