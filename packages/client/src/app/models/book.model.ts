export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  COMEDY = 'Comedy',
  FOOD = 'Food',
  HISTORY = 'History',
  BIOGRAPHY = 'Biography',
  SCIENCE = 'Science',
  SELF_HELP = 'Self Help',
  THRILLER = 'Thriller',
  MYSTERY = 'Mystery',
  CHILDREN = 'Children',
  SCIENCE_FICTION = 'Science Fiction',
  POETRY = 'Poetry',
  DRAMA = 'Drama',
  RELIGION = 'Religion',
}

export interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  category: Category;
  user: string;
  createdAt: string;
  updatedAt: string;
}
