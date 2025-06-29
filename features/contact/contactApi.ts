import { api } from "../api/apiSlice";
import { Message } from "../../types/Footer";

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendContactEmail: builder.mutation<void, Message>({
            query: (data) => ({ url: 'api/contact', method: 'POST', body: data }),
        })
    }),
    overrideExisting: true
});

export const {
    useSendContactEmailMutation
} = contactApi;