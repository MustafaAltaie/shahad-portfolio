import { api } from "../api/apiSlice";
import { EducationType } from "../../types/Educations";

export const educationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // create
        createEducation: builder.mutation<EducationType, Partial<EducationType>>({
            query: (data) => ({ url: '/api/educations', method: 'POST', body: data }),
            invalidatesTags: ['educations']
        }),
        uploadEducationLogo: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/educations/images/logo', method: 'POST', body: formData }),
            invalidatesTags: ['educations']
        }),
        uploadEducationDoc: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/educations/images/doc', method: 'POST', body: formData }),
            invalidatesTags: ['educations']
        }),
        // read
        readEducations: builder.query<EducationType[], void>({
            query: () => '/api/educations',
            providesTags: ['educations']
        }),
        // update
        updateEducation: builder.mutation<EducationType, { id: string, data: Partial<EducationType> }>({
            query: ({ id, data }) => ({ url: `/api/educations/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['educations']
        }),
        changeEducationLogo: builder.mutation<void, { formData: FormData, oldImage: string | undefined }>({
            query: ({ formData, oldImage }) => ({ url: `/api/educations/updateImage/logo/${oldImage}`, method: 'POST', body: formData }),
            invalidatesTags: ['educations']
        }),
        changeEducationDoc: builder.mutation<void, { formData: FormData, oldImage: string | undefined }>({
            query: ({ formData, oldImage }) => ({ url: `/api/educations/updateImage/doc/${oldImage}`, method: 'POST', body: formData }),
            invalidatesTags: ['educations']
        }),
        // delete
        deleteEducation: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/educations/${id}`, method: 'DELETE' }),
            invalidatesTags: ['educations']
        }),
        deleteEducationLogo: builder.mutation<void, string>({
            query: (filename) => ({ url: `/api/educations/deleteImages/logo/${filename}`, method: 'DELETE' }),
            invalidatesTags: ['educations']
        }),
        deleteEducationDoc: builder.mutation<void, string>({
            query: (filename) => ({ url: `/api/educations/deleteImages/doc/${filename}`, method: 'DELETE' }),
            invalidatesTags: ['educations']
        }),
    }),
    overrideExisting: true
});

export const {
    useCreateEducationMutation,
    useUploadEducationLogoMutation,
    useUploadEducationDocMutation,
    useReadEducationsQuery,
    useUpdateEducationMutation,
    useChangeEducationLogoMutation,
    useChangeEducationDocMutation,
    useDeleteEducationMutation,
    useDeleteEducationLogoMutation,
    useDeleteEducationDocMutation,
} = educationApi;