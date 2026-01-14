export interface Recipe {
  id: string;
  slug: string;
  title: string;
  lead: string;
  imagePath: string;
  prepTime: number;
  difficulty: 'Jednostavno' | 'Srednje zahtjevno' | 'Složeno';
  category: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  image?: any;
}

export type CreateRecipeInput = Omit<Recipe, 'id'>;
export type UpdateRecipeInput = Partial<CreateRecipeInput>;