import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Le nom doit comporter au moins 2 caractères.' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères.' }),
  email: z
    .string()
    .email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        // Simple regex checking phone formats (FR & International)
        return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(val);
      },
      { message: 'Veuillez saisir un numéro de téléphone valide.' }
    ),
  agreed: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Vous devez accepter la politique de confidentialité.',
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
