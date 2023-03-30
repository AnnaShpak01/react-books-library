import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bingoSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Bingo"],
  endpoints: (builder) => ({
    getBingo: builder.query({
      query: () => "/bingo",
      providesTags: ["Bingo"],
    }),
    createBingo: builder.mutation({
      query: (bingo) => ({
        url: "/bingo",
        method: "POST",
        body: bingo,
      }),
      invalidatesTags: ["Bingo"],
    }),
    deleteBingo: builder.mutation({
      query: (id) => ({
        url: `/bingo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bingo"],
    }),
    updateBingo: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/bingo/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Bingo"],
    }),
  }),
});

export const {
  useGetBingoQuery,
  useCreateBingoMutation,
  useDeleteBingoMutation,
  useUpdateBingoMutation,
} = bingoSlice;
