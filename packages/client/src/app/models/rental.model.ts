export interface RentHistoryEntry {
    date: string; // ISO 8601 date string
    user: string; // User ID as string
    _id: string; // ID of the rent history entry
  }
  
  export interface ReturnHistoryEntry {
    date: string; // ISO 8601 date string
    user: string; // User ID as string
    _id: string; // ID of the return history entry
  }
  
  export interface Rental {
    _id: string; // ID of the rental
    bookID: string; // ID of the book
    rentDate: string; // ISO 8601 date string
    returnDate: string; // ISO 8601 date string
    rentHistory: RentHistoryEntry[]; // Array of rent history entries
    returnHistory: ReturnHistoryEntry[]; // Array of return history entries
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    user: string; // User ID as string
  }
  