import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
      baseUrl: '/api',
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
      getTasks: builder.query({
        query: () => '/tasks',
        providesTags: ['Task'],
      }),
      addTask: builder.mutation({
        query: (text) => ({
          url: '/tasks',
          method: 'POST',
          body: { text },
        }),
        invalidatesTags: ['Task'],
      }),
      deleteTask: builder.mutation({
        query: (id) => ({
          url: `/tasks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Task'],
      }),
    }),
  });
  
  export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
  } = tasksApi;
// END
