import { notFound } from 'next/navigation';
import { recipeService } from '@/domain/recipe/service';
import { updateRecipeAction } from '@/domain/recipe/actions';
import RecipeForm from '@/components/RecipeForm';

export async function generateMetadata({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const recipe = await recipeService.findBySlug(slug);
  
  return {
    title: recipe ? `Uredi: ${recipe.title}` : 'Recept nije pronađen',
  };
}

export default async function EditRecipePage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) { 
  const { slug } = await params;
  const recipe = await recipeService.findBySlug(slug);

  if (!recipe) return notFound();

  const updateWithSlug = updateRecipeAction.bind(null, slug);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Uredi Recept: {recipe.title}
      </h1>
      <RecipeForm action={updateWithSlug} initialData={recipe} submitLabel="Spremi Promjene" />
    </div>
  );
}