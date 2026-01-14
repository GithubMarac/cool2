import { z } from 'zod';

export const recipeSchema = z.object({
  title: z.string().min(3, "Naslov mora imati barem 3 znaka").max(100),
  lead: z.string().min(10, "Opis mora imati barem 10 znakova"),
  prepTime: z.coerce.number().positive("Vrijeme mora biti pozitivan broj"),
  servings: z.coerce.number().positive("Broj porcija mora biti pozitivan broj"),
  category: z.string().min(1, "Kategorija je obavezna"),
  difficulty: z.enum(['Jednostavno', 'Srednje zahtjevno', 'Složeno']),
  ingredients: z.array(z.string()).min(1, "Morate dodati barem jedan sastojak"),
  steps: z.array(z.string()).min(1, "Morate dodati barem jedan korak"),
  image: z.any().optional()
});

export type RecipeSchemaType = z.infer<typeof recipeSchema>;