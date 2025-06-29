import { api } from "../api/apiSlice";

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createProfile: builder.mutation<string, string>({
            query: (data) => ({ url: '/api/profile', method: 'POST', body: { profile: data } }),
            invalidatesTags: ['profile']
        }),
        readProfile: builder.query<{ _id: string, profile: string }, void>({
            query: () => '/api/profile',
            providesTags: ['profile']
        }),
    }),
    overrideExisting: true
});

export const {
    useCreateProfileMutation,
    useReadProfileQuery,
} = profileApi;