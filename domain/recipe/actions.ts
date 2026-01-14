'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { recipeService } from './service';
import { recipeSchema } from './schemas';

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

async function saveImage(file: File, slug: string) {
  if (!file || file.size === 0 || !(file instanceof File)) {
    return null;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${slug}-${Date.now()}${path.extname(file.name)}`;
  const relativePath = `/recepies/${fileName}`;
  const fullPath = path.join(process.cwd(), 'public/cdn', relativePath);

  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, buffer);
  return relativePath;
}

export async function createRecipeAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    title: formData.get('title'),
    lead: formData.get('lead'),
    prepTime: formData.get('prepTime'),
    servings: formData.get('servings'),
    category: formData.get('category'),
    difficulty: formData.get('difficulty'),
    ingredients: formData.getAll('ingredients'),
    steps: formData.getAll('steps'),
    image: formData.get('image'),
  };

  const validated = recipeSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Provjerite unos podataka.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const data = validated.data;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    
    const imagePath = await saveImage(formData.get('image') as File, slug) || '/recepies/placeholder.jpg';

    await recipeService.create({
      ...data,
      slug,
      imagePath,
    });
  } catch (error) {
    console.error("DETALJNA PRISMA GREŠKA:", error);
    return { success: false, message: "Greška u bazi podataka." };
  }

  revalidatePath('/recepies');
  redirect('/recepies');
}

export async function updateRecipeAction(
  slug: string, 
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  const rawData = {
    title: formData.get('title'),
    lead: formData.get('lead'),
    prepTime: formData.get('prepTime'),
    servings: formData.get('servings'),
    category: formData.get('category'),
    difficulty: formData.get('difficulty'),
    ingredients: formData.getAll('ingredients'),
    steps: formData.getAll('steps'),
  };

  const validated = recipeSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Neuspjela validacija pri ažuriranju.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const newImage = formData.get('image') as File;
    let updateData = { ...validated.data };

    if (newImage && newImage.size > 0) {
      const imagePath = await saveImage(newImage, slug);
      if (imagePath) (updateData as any).imagePath = imagePath;
    }

    await recipeService.update(slug, updateData);
  } catch (error) {
    return { success: false, message: "Spremanje promjena nije uspjelo." };
  }

  revalidatePath('/recepies');
  revalidatePath(`/recepies/${slug}`);
  redirect(`/recepies/${slug}`);
}

export async function deleteRecipeAction(slug: string) {
  try {
    await recipeService.delete(slug);
    revalidatePath('/recepies');
    return { success: true, message: "Obrisano." };
  } catch (error) {
    return { success: false, message: "Brisanje nije uspjelo." };
  }
}