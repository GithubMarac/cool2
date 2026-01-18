import { Link } from '@/i18n/routing';

interface CreateRecipeButtonProps {
  className?: string;
}

export function CreateRecipeButton({ className }: CreateRecipeButtonProps) {
  return (
    <Link 
      href="/recepies/new" 
      className={`bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition shadow-lg ${className}`}
    >
      + Kreiraj novi recept
    </Link>
  );
}