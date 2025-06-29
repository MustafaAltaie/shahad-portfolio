import { api } from "../api/apiSlice";
import { ProjectType } from "../../types/Projects";

export const projectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation<ProjectType, Partial<ProjectType>>({
            query: (data) => ({ url: '/api/projects', method: 'POST', body: data }),
            invalidatesTags: ['projects']
        }),
        readProjects: builder.query<ProjectType[], void>({
            query: () => '/api/projects',
            providesTags: ['projects']
        }),
        updateProject: builder.mutation<ProjectType, { id: string, data: Partial<ProjectType> }>({
            query: ({ id, data }) => ({ url: `/api/projects/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['projects']
        }),
        deleteProject: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/projects/${id}`, method: 'DELETE' }),
            invalidatesTags: ['projects']
        }),
    }),
    overrideExisting: true
});

export const {
    useCreateProjectMutation,
    useReadProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;