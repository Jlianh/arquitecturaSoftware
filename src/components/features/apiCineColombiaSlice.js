import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiColombiaSlice = createApi({
    reducerPath: "apiColombia",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-colombia.com/api/v1/Department"
    }),
    endpoints: (builder) => ({
        getDepartaments: builder.query({
            query: () => '/Departament'
        }),
        getCitiesDepartaments: builder.query({
            query: (departamentId) => `/Departament/${departamentId}/cities`
        })
    })
})

export const { useGetDepartamentsQuery, useGetCitiesDepartamentsQuery } = apiColombiaSlice