import { z } from "zod";

export const getFormSchema = z.object({
  formId: z.uuid(),
});

export const createFormSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  slug: z.string().min(1).max(200),
});

export const updateFormSchema = z.object({
  formId: z.uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  slug: z.string().min(1).max(200),
});

export const deleteFormSchema = z.object({
  formId: z.uuid(),
});

export const publishFormSchema = z.object({
  formId: z.uuid(),
});

export type GetFormSchema = z.infer<typeof getFormSchema>;
export type CreateFormSchema = z.infer<typeof createFormSchema>;
export type UpdateFormSchema = z.infer<typeof updateFormSchema>;
export type DeleteFormSchema = z.infer<typeof deleteFormSchema>;
export type PublishFormSchema = z.infer<typeof publishFormSchema>;
