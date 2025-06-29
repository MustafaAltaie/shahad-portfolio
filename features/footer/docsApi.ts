import { api } from "../api/apiSlice";

export const socialApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadFooterDoc: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/footer/docs', method: 'POST', body: formData }),
            invalidatesTags: ['documents']
        }),
        readFooterDocs: builder.query<string[], void>({
            query: () => '/api/footer/docs',
            providesTags: ['documents']
        }),
        deleteFooterDoc: builder.mutation<void, string>({
            query: (filename) => ({ url: `/api/footer/docs/deleteDoc/${filename}`, method: 'DELETE' }),
            invalidatesTags: ['documents']
        }),
    }),
    overrideExisting: true
});

export const {
    useUploadFooterDocMutation,
    useReadFooterDocsQuery,
    useDeleteFooterDocMutation,
} = socialApi;