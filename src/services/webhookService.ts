import axios, { AxiosError } from 'axios';
import type { WebhookResponse } from '../types/webhook';

const CALLBACK_WEBHOOK_URL = 'https://hook.eu2.make.com/mfmvn2pq2cd4ur17h2ebsg5g96npgoh9';
const LEAD_WEBHOOK_URL = 'https://hook.eu2.make.com/w1v5bdcmhch6r5necozx6kvxqmdf84f6';

export interface CallbackData {
  name: string;
  phone: string;
}

export interface LeadData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  societe: string;
  role: string;
  url: string;
}

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export async function sendCallbackRequest(data: CallbackData): Promise<void> {
  if (!data.name?.trim()) {
    throw new Error('Le nom est requis');
  }

  const cleanPhone = data.phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    throw new Error('Le numéro de téléphone doit contenir 10 chiffres');
  }

  try {
    const payload = {
      "NOM": data.name.trim(),
      "NUMERO DE TELEPHONE": cleanPhone,
      "SOURCE": "LeGuichetPro Website",
      "TYPE": "callback",
      "DATE": new Date().toISOString()
    };

    const response = await axiosInstance.post<WebhookResponse>(CALLBACK_WEBHOOK_URL, payload);

    if (response.status !== 200) {
      throw new Error('Erreur lors de l\'envoi du formulaire');
    }
  } catch (error) {
    handleWebhookError(error);
  }
}

export async function sendLeadRequest(data: LeadData): Promise<void> {
  if (!data.url?.trim()) {
    throw new Error('L\'URL est requise');
  }

  const cleanPhone = data.telephone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    throw new Error('Le numéro de téléphone doit contenir 10 chiffres');
  }

  try {
    const payload = {
      "NOM": data.nom.trim(),
      "PRENOM": data.prenom.trim(),
      "NUMERO DE TELEPHONE": cleanPhone,
      "EMAIL": data.email.trim(),
      "SOCIETE": data.societe.trim(),
      "ROLE": data.role,
      "URL": data.url.trim(),
      "SOURCE": "LeGuichetPro Website",
      "TYPE": "lead",
      "DATE": new Date().toISOString()
    };

    const response = await axiosInstance.post<WebhookResponse>(LEAD_WEBHOOK_URL, payload);

    if (response.status !== 200) {
      throw new Error('Erreur lors de l\'envoi du formulaire');
    }
  } catch (error) {
    handleWebhookError(error);
  }
}

function handleWebhookError(error: unknown): never {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error('Impossible de contacter le serveur. Veuillez réessayer.');
    }

    console.error('Webhook error:', {
      status: error.response.status,
      data: error.response.data
    });

    switch (error.response.status) {
      case 400:
        throw new Error('Format de données invalide. Veuillez réessayer.');
      case 401:
      case 403:
        throw new Error('Erreur d\'authentification avec le service.');
      case 404:
        throw new Error('Service temporairement indisponible.');
      case 429:
        throw new Error('Trop de requêtes. Veuillez patienter quelques minutes.');
      case 500:
      case 502:
      case 503:
      case 504:
        throw new Error('Service temporairement indisponible. Veuillez réessayer plus tard.');
      default:
        throw new Error(error.response.data?.message || 'Une erreur est survenue');
    }
  }
  
  throw new Error('Une erreur inattendue est survenue. Veuillez réessayer.');
}