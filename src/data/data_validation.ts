import { z, ZodError } from "zod";

const IdTypeSchema = z.number();

export const NewsSchema = z.object({
    id: IdTypeSchema.optional(),
    title: z.string(),
    author: z.string(),
    content: z.string(),
    dateCreated: z.number(),
    dateModified: z.number()
});

export const NewsPatchSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export interface ValidationResult {
    success: boolean,
    error?: ZodError
}

export function validate(something: unknown, against: any): ValidationResult {
    const parsed = against.safeParse(something);
    return {
        success: parsed.success,
        error: parsed.error
    }
}