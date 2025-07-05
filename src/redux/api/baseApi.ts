import type { IAddBookRequest, IBook, IBookResponse, IBorrowBookRequest, IBorrowBookResponse, IBorrowSummaryResponse, IDeleteBookResponse, IGetBooksResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['book', 'borrow'],
  endpoints: (builder) => ({
    // ----- GET ALL BOOKS
    getBooks: builder.query<IGetBooksResponse, void>({
      query: () => '/books',
      providesTags: ['book', 'borrow'],
    }),

    // ----- ADD A BOOK
    addBook: builder.mutation<IBookResponse, IAddBookRequest>({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['book', 'borrow']
    }),

    // ----- EDIT A BOOK
    editABook: builder.mutation<IBookResponse, { bookId: string | undefined; bookData: Partial<IBook> }>({
      query: ({ bookId, bookData }) => ({
        url: `/books/${bookId}`,
        method: 'PUT',
        body: bookData
      }),
      invalidatesTags: ['book', 'borrow']
    }),

    // ----- VIEW SINGLE BOOK INFO
    getABook: builder.query<IBookResponse, string>({
      query: (id) => `/books/${id}`,
      providesTags: ['book'],
    }),

    // ----- DELETE A BOOK
    deleteABook: builder.mutation<IDeleteBookResponse, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['book', 'borrow']
    }),

    // ----- BORROW A BOOK
    borrowABook: builder.mutation<IBorrowBookResponse, IBorrowBookRequest>({
      query: (bookData) => ({
        url: '/borrow',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['book', 'borrow']
    }),

    // ----- BOOK BORROW SUMMARY
    borrowSummary: builder.query<IBorrowSummaryResponse, void>({
      query: () => '/borrow',
      providesTags: ['borrow']
    })
  }),
})

// Export hooks for usage in function components
export const { useGetBooksQuery, useAddBookMutation, useEditABookMutation, useGetABookQuery, useDeleteABookMutation, useBorrowABookMutation, useBorrowSummaryQuery } = baseApi