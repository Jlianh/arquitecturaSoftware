import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const bookSlice = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5085',
    }), // Hace las veces de Axios
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/',
            providesTags: ['Books'], // Me permite ejecutar un llamado
            transformResponse: response => response.sort((a, b) => 
             (a.name[0].toUpperCase() < b.name[0].toUpperCase()) ? -1 
            : (a.name[0].toUpperCase() > b.name[0].toUpperCase())  ? 1 : 0)
        }),
        getBookById: builder.query({
            query: (id) => '/Books/' + id,
            providesTags: ['Book']
        }),
        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/Books',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ["Books"] // Se ejecuta cuando hay un cambio en la BD
        }),
        updateBook: builder.mutation({
            query: (Book) => ({
                url: `/Books/${Book.id}`,
                method: 'PUT',
                body: Book
            }),
            invalidatesTags: ["Books", "Book"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/Books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"]
        }),       
    })    
})

/** Segun la nomenclatura de la libreria se usa use al principio 
 * y Query o Mutation al final segun corresponda */
export const { useGetBooksQuery, 
                useGetBookByIdQuery, 
                useCreateBookMutation, 
                useUpdateBookMutation,
                useDeleteBookMutation,
        } = bookSlice
