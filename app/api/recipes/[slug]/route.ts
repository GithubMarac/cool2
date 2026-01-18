import { NextRequest, NextResponse } from 'next/server';
import { recipeService } from '@/domain/recipe/service';
import { z } from 'zod';
import { recipeSchema } from '@/domain/recipe/schemas'

interface Params {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const recipe = await recipeService.findBySlug(params.slug);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    
    const validatedData = recipeSchema.parse(body);

    const existing = await recipeService.findBySlug(params.slug);
    if (!existing) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const updatedRecipe = await recipeService.update(params.slug, validatedData);

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const existing = await recipeService.findBySlug(params.slug);
    if (!existing) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    await recipeService.delete(params.slug);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}