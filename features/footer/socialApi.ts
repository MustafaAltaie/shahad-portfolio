import { api } from "../api/apiSlice";
import { SocialObj } from "../../types/Footer";

export const socialApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateSocial: builder.mutation<SocialObj, Partial<SocialObj>>({
            query: (data) => ({ url: '/api/footer/social', method: 'PATCH', body: data }),
            invalidatesTags: ['social']
        }),
        readSocial: builder.query<SocialObj, void>({
            query: () => '/api/footer/social',
            providesTags: ['social']
        }),
    }),
    overrideExisting: true
});

export const {
    useUpdateSocialMutation,
    useReadSocialQuery,
} = socialApi;