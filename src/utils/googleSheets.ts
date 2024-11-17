import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface SheetData {
  url: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  societe: string;
  role: string;
}

const SPREADSHEET_ID = '1QV_ZLtwgGEIrT7VtbA991wlKnfw7-61uqpU2tePPbT0';
const CREDENTIALS = {
  client_email: '112322674955042743105-compute@developer.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9QFbDPYrP9KhE\n-----END PRIVATE KEY-----\n'
};

export async function saveToGoogleSheets(data: SheetData): Promise<void> {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, new JWT({
      email: CREDENTIALS.client_email,
      key: CREDENTIALS.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    }));

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      throw new Error('Feuille de calcul non trouvée');
    }

    await sheet.addRow({
      Date: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
      URL: data.url,
      Nom: data.nom,
      Prénom: data.prenom,
      Téléphone: data.telephone,
      Email: data.email,
      Société: data.societe,
      Rôle: data.role,
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans Google Sheets:', error);
    throw new Error('Erreur lors de la sauvegarde des données');
  }
}