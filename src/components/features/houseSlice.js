import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const houseSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/house",
        prepareHeaders: (headers, {getState})=>{
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }
        }
    }),
    endpoints: (builder) => ({
        getHouses: builder.query({
            query: () => '/allHouses',
            providesTags: ['Houses']
        }),
        getHouseById: builder.query({
            query: (_id) => '/getHouseById/' + _id,
            providesTags: ['House']
        }),
        addHouse: builder.mutation({
            query: (newHouse) => ({
                url: '/addHouse/',
                method: 'POST',
                body: newHouse
            }),
            invalidatesTags: ['Houses']
        }),
        editHouse: builder.mutation({
            query: (data) => ({
                url: '/editHouse/'+data.id,
                method: 'PATCH',
                body: data.body
            }),
            invalidatesTags: ['Houses']
        }),
        deleteHouse: builder.mutation({
            query: (id) => ({
                url: '/deleteHouse/'+id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Houses']
        }),
        uploadHousePhoto: builder.mutation({
            query: (data) => ({
                url: '/addHousePhoto/houseId/'+data.id,
                method: 'POST',
                body: data.body
            }),
            invalidatesTags: ['Houses']
        }),
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

export const { 
    useGetHousesQuery,
    useGetHouseByIdQuery, 
    useAddHouseMutation, 
    useEditHouseMutation, 
    useDeleteHouseMutation, 
    useUploadHousePhotoMutation } = houseSlice