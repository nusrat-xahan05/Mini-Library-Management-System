export interface IBook {
  _id: string,
  title: string,
  author: string,
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
  isbn: string,
  copies: number,
  available: boolean,
  createdAt: string,
  updatedAt: string
}

export interface IGetBooksResponse {
  success: boolean,
  message: string,
  data: IBook[]
}

export interface IAddBookRequest {
  title: string,
  author: string,
  genre: string,
  isbn: string,
  copies: number,
  available: boolean
}

export interface IBookResponse {
  success: boolean,
  message: string,
  data: IBook
}

export interface IDeleteBookResponse {
  success: boolean,
  message: string,
  data: null,
}

export interface IBorrowBookResponse {
  success: boolean,
  message: string,
  data: {
    book: string,
    createdAt: string,
    updatedAt: string,
    dueDate: string,
    quantity: number,
    _id: string
  };
}

export interface IBorrowBookRequest {
  book: string | undefined,
  quantity: number,
  dueDate: string,
}

export interface IBorrowSummaryItem {
  book: {
    title: string,
    isbn: string
  },
  totalQuantity: number
}

export interface IBorrowSummaryResponse {
  success: boolean,
  message: string,
  data: IBorrowSummaryItem[]
}