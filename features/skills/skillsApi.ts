import { api } from "../api/apiSlice";
import { FSkill } from "../../types/Skills";

export const skillsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOtherSkill: builder.mutation<FSkill, Partial<FSkill>>({
            query: (data) => ({ url: '/api/skills/other', method: 'POST', body: data }),
            invalidatesTags: ['skills']
        }),
        readOtherSkills: builder.query<FSkill[], void>({
            query: () => '/api/skills/other',
            providesTags: ['skills']
        }),
        updateOtherSkill: builder.mutation<FSkill, { id: string, data: Partial<FSkill> }>({
            query: ({ id, data }) => ({ url: `/api/skills/other/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['skills']
        }),
        deleteOtherSkill: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/skills/other/${id}`, method: 'DELETE' }),
            invalidatesTags: ['skills']
        }),
    }),
    overrideExisting: true
});

export const {
    useCreateOtherSkillMutation,
    useReadOtherSkillsQuery,
    useUpdateOtherSkillMutation,
    useDeleteOtherSkillMutation,
} = skillsApi;