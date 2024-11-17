interface FormData {
  url: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  societe: string;
  role: string;
}

export async function saveFormData(data: FormData): Promise<void> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log the data that would be sent to the API
  console.log('Form data to be saved:', data);
  
  // For demo purposes, we'll just simulate a successful save
  return Promise.resolve();
}