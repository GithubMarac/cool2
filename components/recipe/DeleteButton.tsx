'use client';

import { deleteRecipeAction } from '@/domain/recipe/actions';

interface DeleteButtonProps {
  slug: string;
}

export default function DeleteRecipeButton({ slug }: DeleteButtonProps) {
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('Jeste li sigurni da želite obrisati ovaj recept?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={() => deleteRecipeAction(slug)} onSubmit={handleDelete}>
      <button 
        type="submit" 
        className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition font-medium"
      >
        Obriši
      </button>
    </form>
  );
}