export interface RentHistoryEntry {
    date: string;
    user: string;
    _id: string;
  }
  
  export interface ReturnHistoryEntry {
    date: string;
    user: string;
    _id: string;
  }
  
  export interface Rental {
    _id: string;
    bookID: string;
    rentDate: string;
    returnDate: string;
    rentHistory: RentHistoryEntry[];
    returnHistory: ReturnHistoryEntry[];
    createdAt: string;
    updatedAt: string;
    user: string;
  }
  