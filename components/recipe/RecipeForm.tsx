'use client';

import { useActionState, useState, useEffect } from 'react';
import { FormState } from '@/domain/recipe/actions';
import { Recipe } from '@/domain/recipe/types';
import { useRouter } from '@/i18n/routing';

interface RecipeFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialData?: Recipe;
  submitLabel?: string;
}

export default function RecipeForm({ action, initialData, submitLabel = 'Spremi' }: RecipeFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: '',
  });

  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || ['']);
  const [steps, setSteps] = useState<string[]>(initialData?.steps || ['']);

  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.success, state.redirectTo, router]);

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const updateField = (index: number, value: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    const updated = [...current];
    updated[index] = value;
    setter(updated);
  };

  const removeField = (index: number, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (current.length > 1) {
      setter(current.filter((_, i) => i !== index));
    }
  };

  return (
    <form action={formAction} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-100">
      
      {/* Global Message */}
      {state.message && (
        <div className={`p-4 border-l-4 ${state.success ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Naslov recepta</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition ${
              state.errors?.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Npr. Bakina sarma"
          />
          {state.errors?.title && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.title[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kategorija</label>
          <select 
            name="category" 
            defaultValue={initialData?.category || 'Glavna jela'}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option>Glavna jela</option>
            <option>Predjela</option>
            <option>Deserti</option>
            <option>Doručak</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Težina</label>
          <select 
            name="difficulty" 
            defaultValue={initialData?.difficulty || 'Srednje zahtjevno'}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option>Jednostavno</option>
            <option>Srednje zahtjevno</option>
            <option>Složeno</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Vrijeme (min)</label>
          <input
            name="prepTime"
            type="number"
            defaultValue={initialData?.prepTime}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          />
          {state.errors?.prepTime && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.prepTime[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Broj osoba</label>
          <input
            name="servings"
            type="number"
            defaultValue={initialData?.servings}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Kratki opis (Lead)</label>
        <textarea
          name="lead"
          rows={3}
          defaultValue={initialData?.lead}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />
        {state.errors?.lead && <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.lead[0]}</p>}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">🍎 Sastojci</h3>
        {ingredients.map((ing, index) => (
          <div key={`ing-${index}`} className="flex gap-2">
            <input
              name="ingredients"
              value={ing}
              onChange={(e) => updateField(index, e.target.value, ingredients, setIngredients)}
              placeholder={`Npr. 200g brašna`}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button 
              type="button" 
              onClick={() => removeField(index, ingredients, setIngredients)}
              className="text-gray-400 hover:text-red-500 px-2"
            >✕</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(setIngredients)} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          + Dodaj sastojak
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">👨‍🍳 Koraci pripreme</h3>
        {steps.map((step, index) => (
          <div key={`step-${index}`} className="flex gap-2 items-start">
            <span className="bg-orange-100 text-orange-700 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mt-3 shrink-0">{index + 1}</span>
            <textarea
              name="steps"
              value={step}
              rows={2}
              onChange={(e) => updateField(index, e.target.value, steps, setSteps)}
              placeholder="Opišite korak..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button type="button" onClick={() => removeField(index, steps, setSteps)} className="text-gray-400 hover:text-red-500 px-2 mt-3">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(setSteps)} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          + Dodaj korak
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Slika recepta</label>
        <input name="image" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-700" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all disabled:bg-gray-300"
      >
        {isPending ? 'Spremanje...' : submitLabel}
      </button>
    </form>
  );
}