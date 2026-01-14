import { Recipe as PrismaRecipe } from '@prisma/client';
import { Recipe } from './types';

export const RecipeMapper = {
  toDomain(raw: PrismaRecipe): Recipe {
    return {
      ...raw,
      difficulty: raw.difficulty as Recipe['difficulty'],
      ingredients: typeof raw.ingredients === 'string' ? JSON.parse(raw.ingredients) : [],
      steps: typeof raw.steps === 'string' ? JSON.parse(raw.steps) : [],
    };
  },
  
  toPersistence(data: Partial<Recipe>) {
    return {
      ...data,
      ingredients: data.ingredients ? JSON.stringify(data.ingredients) : undefined,
      steps: data.steps ? JSON.stringify(data.steps) : undefined,
    };
  }
};