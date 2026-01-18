import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { recipeSchema } from '@/domain/recipe/schemas'

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, slug: true, lead: true, 
        prepTime: true, difficulty: true, category: true, imagePath: true 
      }
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = recipeSchema.parse(body);

    const slug = validatedData.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

    const recipe = await prisma.recipe.create({
      data: {
        ...validatedData,
        slug,
        ingredients: JSON.stringify(validatedData.ingredients),
        steps: JSON.stringify(validatedData.steps),
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
  }
}