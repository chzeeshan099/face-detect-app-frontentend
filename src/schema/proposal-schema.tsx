// schemas/proposalSchema.ts
import { z } from 'zod';
import Messages from '@/constants/messages';
export const proposalSchema = z.object({
    title: z.string().min(2, Messages.REQUIRED_FIELD("Title")),
    description: z.string().min(2, Messages.REQUIRED_FIELD("Description")),
    category: z.object({
        label: z.string(),
        value: z.string(),
    }, {
        required_error: Messages.REQUIRED_FIELD("Category")
    }),
    date: z.string().min(1, Messages.REQUIRED_FIELD("Date")),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;
