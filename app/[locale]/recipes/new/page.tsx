import RecipeForm from '@/components/recipe/RecipeForm';
import { createRecipeAction } from '@/domain/recipe/actions';

export default function CreateRecipePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Dodaj Novi Recept</h1>
      <RecipeForm action={createRecipeAction} submitLabel="Kreiraj Recept" />
    </div>
  );
}