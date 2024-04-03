import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const messageSlice = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/message',
    }),
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: () => '/getMessages'
        }),
        createMessage: builder.mutation({
            query: (newMessage) => ({
                url: '/message',
                method: 'POST',
                body: newMessage
            })
        })
    })
})

export const {
    useGetMessageQuery,
    useCreateMessageMutation
} = messageSlice