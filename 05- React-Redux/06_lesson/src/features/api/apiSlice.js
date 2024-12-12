import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  // Tags to update cache
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    // Query for get requests and mutation for others
    // query returns [data] => here data = todos
    getTodos: builder.query({
      // query = endpoint '/todos'
      query: () => '/todos',
      // Transform => sort
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      // When tag is invalid = update cached request
      providesTags: ['Todos'],
    }),
    // mutation returns [addTodo] => function to add todo
    addTodo: builder.mutation({
      // query here => url + method + body
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      // Invalidate cached todos
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
