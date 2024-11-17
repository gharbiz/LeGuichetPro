import React, { useState } from 'react';
import { Search, ArrowRight, Phone } from 'lucide-react';
import { LeadForm } from './components/LeadForm';
import { CallbackModal } from './components/CallbackModal';
import { AuditResults } from './components/AuditResults';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadForm(true);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();
    value = value.replace(/^(https?:\/\/)?(www\.)?/, '');
    setUrl(value);
  };

  const handleLeadSubmit = async (data: FormData) => {
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 10000));
      setShowResults(true);
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCallbackSubmit = async (data: { name: string; phone: string }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Votre demande a été enregistrée. Nous vous recontacterons rapidement.');
      setShowCallbackModal(false);
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a 
                href="https://www.leguichetpro.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img 
                  src="https://www.leguichetpro.com/wp-content/uploads/2024/10/MAIN-Logo-Leguichepro-no-background.jpg"
                  alt="LeGuichetPro Logo" 
                  className="h-12"
                  width="180"
                  height="48"
                />
              </a>
            </div>
            <nav className="flex items-center space-x-8">
              <button
                onClick={() => setShowCallbackModal(true)}
                className="text-white bg-[#f39018] hover:bg-[#e08416] px-4 py-2 rounded-lg flex items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Être rappelé
              </button>
              <a 
                href="https://www.leguichetpro.com/devenez-un-expert/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-[#f39018]"
              >
                Offres ExpertPro
              </a>
              <a 
                href="https://www.leguichetpro.com/contact/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-[#f39018]"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!showResults ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              <span className="block">Audit SEO Gratuit</span>
              <span className="block text-[#f39018] text-3xl sm:text-4xl md:text-5xl">
                Analysez votre présence en ligne
              </span>
            </h1>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl text-gray-700 mb-8">
                Optimisez votre visibilité en ligne et attirez plus de clients !
                <br />
                Saviez-vous que 93% des expériences en ligne commencent par un moteur de recherche ?
              </p>

              {!showLeadForm && (
                <form onSubmit={handleUrlSubmit} className="mb-8">
                  <div className="flex shadow-lg rounded-lg bg-white">
                    <input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="exemple.com"
                      pattern="^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$"
                      className="flex-1 px-6 py-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#f39018]"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#f39018] hover:bg-[#e08416] text-white px-8 py-4 rounded-r-lg flex items-center transition-colors duration-200"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Exemple: monsite.fr</p>
                </form>
              )}

              {showLeadForm && (
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Dernière étape avant votre audit
                  </h2>
                  <LeadForm 
                    onSubmit={handleLeadSubmit} 
                    isLoading={isAnalyzing}
                    url={url} 
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <p className="text-gray-700 mb-4">
                ✔️ 48% des recherches locales aboutissent à une action concrète, comme un appel ou une visite.
              </p>
              <p className="text-gray-700 mb-4">
                ✔️ Les entreprises qui investissent dans une stratégie SEO bien structurée voient souvent une augmentation significative de leurs conversions.
              </p>
              <p className="text-gray-700 mb-4">
                💡 Un audit SEO est la première étape pour maximiser votre potentiel digital. Identifiez les freins à votre visibilité et débloquez des opportunités pour surpasser vos concurrents.
              </p>
              <p className="text-gray-700">
                👉 Passez à l'action dès maintenant et donnez à votre site l'avantage qu'il mérite.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-[#f39018]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyse Technique</h3>
                <p className="text-gray-600">Évaluation complète des aspects techniques de votre site web</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-[#f39018]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance SEO</h3>
                <p className="text-gray-600">Analyse détaillée de votre optimisation pour les moteurs de recherche</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-[#f39018]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Recommandations</h3>
                <p className="text-gray-600">Suggestions personnalisées pour améliorer votre visibilité</p>
              </div>
            </div>
          </div>
        ) : (
          <AuditResults
            url={url}
            score={{
              seo: Math.floor(Math.random() * 30) + 40,
              performance: Math.floor(Math.random() * 30) + 40,
              accessibility: Math.floor(Math.random() * 30) + 40,
            }}
            recommendations={{
              critical: [
                "Optimisation des balises meta manquante",
                "Temps de chargement trop long",
                "Contenu en double détecté"
              ],
              important: [
                "Structure des URLs à améliorer",
                "Densité de mots-clés insuffisante",
                "Balises alt manquantes sur les images"
              ],
              suggestions: [
                "Ajouter plus de contenu original",
                "Améliorer la structure des titres",
                "Optimiser les images"
              ]
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <a 
                href="https://www.leguichetpro.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img 
                  src="https://www.leguichetpro.com/wp-content/uploads/2024/10/MAIN-Logo-Leguichepro-no-background.jpg"
                  alt="LeGuichetPro Logo" 
                  className="h-8 mb-4"
                  width="120"
                  height="32"
                />
              </a>
              <p className="text-gray-600">Solutions digitales pour professionnels</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Email: newsletter@leguichetpro.com</li>
                <li>Téléphone: 01 83 79 08 55</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Informations Générales</h4>
              <a 
                href="https://www.leguichetpro.com/conditions-generales-utilisation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#f39018]"
              >
                Conditions générales d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>

      <CallbackModal
        isOpen={showCallbackModal}
        onClose={() => setShowCallbackModal(false)}
        onSubmit={handleCallbackSubmit}
      />
    </div>
  );
}

export default App;