import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const studentsSlice = createApi({
    reducerPath: "StudentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5085',
    }), // Hace las veces de Axios
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => '/Students',
            providesTags: ['Students'], // Me permite ejecutar un llamado
            transformResponse: response => response.sort((a, b) => 
             (a.name[0].toUpperCase() < b.name[0].toUpperCase()) ? -1 
            : (a.name[0].toUpperCase() > b.name[0].toUpperCase())  ? 1 : 0)
        }),
        getStudentById: builder.query({
            query: (id) => '/Students/' + id,
            providesTags: ['Student']
        }),
        createStudent: builder.mutation({
            query: (newStudent) => ({
                url: '/Students',
                method: 'POST',
                body: newStudent
            }),
            invalidatesTags: ["Students"] // Se ejecuta cuando hay un cambio en la BD
        }),
        updateStudent: builder.mutation({
            query: (student) => ({
                url: `/Students/${student.id}`,
                method: 'PUT',
                body: student
            }),
            invalidatesTags: ["Students", "Student"]
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/Students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Students"]
        }),       
    })    
})

/** Segun la nomenclatura de la libreria se usa use al principio 
 * y Query o Mutation al final segun corresponda */
export const { useGetStudentsQuery, 
                useGetStudentByIdQuery, 
                useCreateStudentMutation, 
                useUpdateStudentMutation,
                useDeleteStudentMutation,
        } = studentsSlice
