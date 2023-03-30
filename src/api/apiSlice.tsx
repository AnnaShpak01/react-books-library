import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Books", "Bingo", "Filters"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/books/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
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
    getFilters: builder.query({
      query: () => "/filters",
      providesTags: ["Filters"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBingoQuery,
  useCreateBingoMutation,
  useDeleteBingoMutation,
  useUpdateBingoMutation,
  useGetFiltersQuery,
} = apiSlice;
