import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;

//`use${Login}Mutation

//'use'  -> for all endpoints either query or mutaion

// endpoint -> login ( Login camel case)

// mutation -> at last mutation (any chnages you are gonna make in the data)
