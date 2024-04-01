import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const users = [
    {
        "_id": "65cebb9b6cbd9ecbdc79a8a9",
        "identification": 123231,
        "name": "Juan",
        "lastname": "Gomez",
        "email": "juan@email.com",
        "password": "$2b$10$syfCYXakQ0WmjDrso4CS9O8uUBQpN5u5cjR4LxKAHvxmeBaBYeQSG"
    }
]

export const userSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders: (headers, {getState})=>{
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/user/allUsers',
            providesTags: ['Users'],
            transformResponse: response => response.sort((a, b) =>
                (a.name.toUpperCase() < b.name.toUpperCase()) ? -1
                    : (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : 0)
        }),
        getUserById: builder.query({
            query: (_id) => '/user/findById/' + _id,
            providesTags: ['User']
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: '/user/addUser/',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: '/user/editUser/'+data.id,
                method: 'PATCH',
                body: data.body
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: '/user/deleteUser/'+id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users']
        }),
        uploadPhoto: builder.mutation({
            query: (data) => ({
                url: '/user/uploadUserPhoto/user/'+data.id,
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Users']
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body: body
            })
        })
    })
})

// export const userSlice = createSlice({
//     name: 'users',
//     initialState: users,
//     reducers: {
//         addUser: (state, action) => {
//             state.push(action.payload)
//         }
//     }
// })

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useEditUserMutation, useDeleteUserMutation, useUploadPhotoMutation, useLoginMutation } = userSlice