import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { recipeService } from '@/domain/recipe/service';
import { getCdnUrl } from '@/lib/cdn';

export const metadata = {
  title: 'Svi Recepti | Coolinarika Clone',
  description: 'Pregledajte najbolje recepte na našoj platformi.',
};

export default async function RecipeList() {
  const recipes = await recipeService.findAll();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">Recepti</h1>
        <Link 
          href="/recepies/new" 
          className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition shadow-lg"
        >
          + Kreiraj novi recept
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Najnoviji Recepti</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link 
            href={{
              pathname: '/recepies/[slug]',
              params: { slug: recipe.slug }
            }} 
            key={recipe.id} 
            className="group"
          >
            <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
              {/* Image Container */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image 
                  src={getCdnUrl(recipe.imagePath)}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <div className="text-xs font-semibold text-orange-500 uppercase mb-1">
                  {recipe.category}
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{recipe.lead}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <span className="flex items-center gap-1">
                    🕒 {recipe.prepTime} min
                  </span>
                  <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}