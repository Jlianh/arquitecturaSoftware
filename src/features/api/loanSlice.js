import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const loanSlice = createApi({
    reducerPath: "LoanApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5085',
    }), // Hace las veces de Axios
    endpoints: (builder) => ({
        getLoans: builder.query({
            query: () => '/Loans',
            providesTags: ['Loan'], // Me permite ejecutar un llamado
            transformResponse: response => response.sort((a, b) => 
             (a.name[0].toUpperCase() < b.name[0].toUpperCase()) ? -1 
            : (a.name[0].toUpperCase() > b.name[0].toUpperCase())  ? 1 : 0)
        }),
        getLoanById: builder.query({
            query: (id) => '/Loans/' + id,
            providesTags: ['Loan']
        }),
        createLoan: builder.mutation({
            query: (newLoan) => ({
                url: '/Loans',
                method: 'POST',
                body: newLoan
            }),
            invalidatesTags: ["Loan"] // Se ejecuta cuando hay un cambio en la BD
        }),
        updateLoan: builder.mutation({
            query: (Loan) => ({
                url: `/Loan/${Loan._id}`,
                method: 'PATCH',
                body: Loan
            }),
            invalidatesTags: ["Loan", "Loan"]
        }),
        deleteLoan: builder.mutation({
            query: (_id) => ({
                url: `/Loan/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Loan"]
        }),
    })    
})

/** Segun la nomenclatura de la libreria se usa use al principio 
 * y Query o Mutation al final segun corresponda */
export const { useGetLoansQuery, 
                useGetLoanByIdQuery, 
                useCreateLoanMutation, 
                useUpdateLoanMutation,
                useDeleteLoanMutation,
                useUploadAvatarMutation,
                useLoginMutation
        } = loanSlice
