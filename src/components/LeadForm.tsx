import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendLeadRequest } from '../services/webhookService';

export interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  societe: string;
  role: string;
  url: string;
}

interface LeadFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  url: string;
}

export function LeadForm({ onSubmit, isLoading, url }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    societe: '',
    role: '',
    url: url
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'telephone') {
      // Only allow numbers and limit to 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      await sendLeadRequest(formData);
      await onSubmit(formData);
      toast.success('Votre demande a été envoyée avec succès');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue';
      toast.error(message);
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom *
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
            minLength={2}
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
            minLength={2}
            maxLength={50}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de téléphone *
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
          placeholder="0612345678"
          inputMode="numeric"
        />
        <p className="text-xs text-gray-500 mt-1">Format: 10 chiffres (ex: 0612345678)</p>
      </div>

      <div>
        <label htmlFor="societe" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la société *
        </label>
        <input
          type="text"
          id="societe"
          name="societe"
          value={formData.societe}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Rôle *
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39018] focus:border-transparent disabled:bg-gray-100"
        >
          <option value="">Sélectionnez votre rôle</option>
          <option value="CEO">PDG / CEO</option>
          <option value="Marketing">Responsable Marketing</option>
          <option value="Digital">Responsable Digital</option>
          <option value="Commercial">Commercial</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f39018] hover:bg-[#e08416] text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Analyse en cours...
          </div>
        ) : (
          "Lancer l'audit SEO"
        )}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        * Champs obligatoires
        <br /><br />
        En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre politique de confidentialité.
      </p>
    </form>
  );
}