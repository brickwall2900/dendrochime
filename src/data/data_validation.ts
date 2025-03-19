import { z, ZodError } from "zod";

const IdTypeSchema = z.number();

export const NewsSchema = z.object({
    id: IdTypeSchema.optional(),
    title: z.string(),
    author: z.string(),
    content: z.string()
});

export const CommunitySchema = z.object({
    id: IdTypeSchema.optional(),
    name: z.string(),
    description: z.string(),
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