import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000/api/v1';

export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query<any, void>({
            query: () => '/books/',
            providesTags: ['books']
        }),

        getBook : builder.query<any, number>({
            query: (id) => `/books/${id}`,
            providesTags: ['books']
        }),

        addBook: builder.mutation({
            query: (book) => ({
              url: '/books/',
              method: 'POST',
              body: book
            }),
            invalidatesTags: ['books'],
          }),

        editBook: builder.mutation<void, {id:number, status:string}>({
            query: (book) => ({
                url: `/books/${book.id}`,
                body: book,
                method: 'PUT', 
            }),
            invalidatesTags: ['books'],
            }),

        deleteBook: builder.mutation({
            query: (id) => (
                {
                url: `/books/${id}`,
                method: 'DELETE',
              
            }),
            invalidatesTags: ['books'],
            }),
    
    })
});

export const {useGetBooksQuery, useAddBookMutation, useEditBookMutation, useDeleteBookMutation} = booksApi