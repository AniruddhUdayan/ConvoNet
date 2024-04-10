import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const server = process.env.NEXT_PUBLIC_SERVER;

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/` }),
    tagTypes: ['Chat'],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url : 'chat/my',
                credentials: 'include'
            }),
            providesTags: ['Chat'],
        }),
    }),
});

export default api;
export const { useMyChatsQuery } = api;