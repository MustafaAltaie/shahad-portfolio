import { api } from "../api/apiSlice";
import { Exp } from "../../types/Experiences";

export const experienceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createExp: builder.mutation<Exp, Partial<Exp>>({
            query: (data) => ({ url: '/api/experiences', method: 'POST', body: data }),
            invalidatesTags: ['experiences']
        }),
        readExps: builder.query<Exp[], void>({
            query: () => '/api/experiences',
            providesTags: ['experiences']
        }),
        updateExp: builder.mutation<Exp, { id: string, data: Partial<Exp> }>({
            query: ({ id, data }) => ({ url: `/api/experiences/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['experiences']
        }),
        deleteExp: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/experiences/${id}`, method: 'DELETE' }),
            invalidatesTags: ['experiences']
        }),
    }),
    overrideExisting: true
});

export const {
    useCreateExpMutation,
    useReadExpsQuery,
    useUpdateExpMutation,
    useDeleteExpMutation,
} = experienceApi;