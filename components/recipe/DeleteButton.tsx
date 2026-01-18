'use client';

import { deleteRecipeAction } from '@/domain/recipe/actions';
import { useRouter } from '@/i18n/routing'; // Your localized router
import { useState } from 'react';

interface DeleteButtonProps {
  slug: string;
}

export default function DeleteRecipeButton({ slug }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm('Jeste li sigurni da želite obrisati ovaj recept?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteRecipeAction(slug);

      if (result.success) {
        router.push('/recipes');
      } else {
        alert(result.message);
        setIsDeleting(false);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`bg-red-100 text-red-600 px-4 py-2 rounded transition font-medium ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-200'
      }`}
    >
      {isDeleting ? 'Brisanje...' : 'Obriši'}
    </button>
  );
}