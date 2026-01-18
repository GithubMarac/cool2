import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getCdnUrl } from '@/lib/cdn';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  imagePath: string;
  category: string;
  lead: string;
  prepTime: number;
  difficulty: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link 
      href={{
        pathname: '/recepies/[slug]',
        params: { slug: recipe.slug }
      }} 
      className="group"
    >
      <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image 
            src={getCdnUrl(recipe.imagePath)}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs font-semibold text-orange-500 uppercase mb-1">
            {recipe.category}
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600">
            {recipe.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
            {recipe.lead}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3 mt-auto">
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
  );
}