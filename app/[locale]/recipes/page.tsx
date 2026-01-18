import { recipeService } from '@/domain/recipe/service';
import { RecipeCard } from '@/components/recipe/Card';
import { CreateRecipeButton } from '@/components/recipe/CreateButton';

export const metadata = {
  title: 'Svi Recepti | Coolinarika Clone',
  description: 'Pregledajte najbolje recepte na našoj platformi.',
};

export default async function RecipeList() {
  const recipes = await recipeService.findAll();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">Recepti</h1>
        <CreateRecipeButton />
      </div>

      <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-orange-600 pl-4">
        Najnoviji Recepti
      </h2>
      
      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Optional: Empty State */}
      {recipes.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Još nema recepata. Budi prvi koji će ga objaviti!
        </div>
      )}
    </main>
  );
}