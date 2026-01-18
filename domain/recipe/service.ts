import { prisma } from '@/lib/prisma';
import { RecipeMapper } from './mapper';
import { CreateRecipeInput, UpdateRecipeInput, Recipe } from './types';
import { Prisma } from '@prisma/client';

export const recipeService = {
  async findAll(): Promise<Recipe[]> {
    const data = await prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } });
    return data.map(RecipeMapper.toDomain);
  },

  async findBySlug(slug: string): Promise<Recipe | null> {
    const data = await prisma.recipe.findUnique({ where: { slug } });
    return data ? RecipeMapper.toDomain(data) : null;
  },

  async create(input: CreateRecipeInput): Promise<Recipe> {
    const prismaData = RecipeMapper.toPersistence(input);

    const data = await prisma.recipe.create({
      data: prismaData as Prisma.RecipeCreateInput
    });
    return RecipeMapper.toDomain(data);
  },

  async update(slug: string, input: UpdateRecipeInput): Promise<Recipe> {
    const prismaData = RecipeMapper.toPersistence(input);
    
    const data = await prisma.recipe.update({
      where: { slug },
      data: prismaData as Prisma.RecipeUpdateInput
    });
    return RecipeMapper.toDomain(data);
  },

  async delete(slug: string): Promise<void> {
    await prisma.recipe.delete({ where: { slug } });
  }
};