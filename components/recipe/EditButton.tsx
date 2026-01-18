import { Link } from '@/i18n/routing';

interface EditRecipeButtonProps {
  slug: string;
}

export function EditRecipeButton({ slug }: EditRecipeButtonProps) {
  return (
    <Link 
      href={{
        pathname: '/recepies/[slug]/edit',
        params: { slug: slug }
      }} 
      className="bg-white/90 text-gray-800 px-4 py-2 rounded hover:bg-white transition font-medium shadow-sm backdrop-blur-sm"
    >
      Uredi
    </Link>
  );
}