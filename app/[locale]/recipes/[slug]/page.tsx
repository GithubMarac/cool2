import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCdnUrl } from '@/lib/cdn';
import { recipeService } from '@/domain/recipe/service';
import { EditRecipeButton } from '@/components/recipe/EditButton';
import DeleteButton from '@/components/recipe/DeleteButton';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const recipe = await recipeService.findBySlug(slug);

  if (!recipe) return {};
  
  return {
    title: `${recipe.title} - Recept`,
    description: recipe.lead,
    openGraph: {
      images: [getCdnUrl(recipe.imagePath)],
    },
  };
}

export default async function RecipeDetail({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const recipe = await recipeService.findBySlug(slug);

  if (!recipe) return notFound();

  const ingredients: string[] = recipe.ingredients;
  const steps: string[] = recipe.steps;

  return (
    <article className="bg-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image 
          src={getCdnUrl(recipe.imagePath)} 
          alt={recipe.title} 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <EditRecipeButton slug={recipe.slug} />
          <DeleteButton slug={recipe.slug} />
         </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <span className="bg-orange-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {recipe.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{recipe.title}</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{recipe.lead}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Ingredients */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Detalji pripreme</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">Težina:</span>
                <span className="font-semibold text-gray-800">{recipe.difficulty}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Vrijeme:</span>
                <span className="font-semibold text-gray-800">{recipe.prepTime} min</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Porcija:</span>
                <span className="font-semibold text-gray-800">za {recipe.servings} osoba</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Sastojci</h3>
            <ul className="space-y-2">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Preparation */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Priprema</h3>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 leading-relaxed text-lg">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}