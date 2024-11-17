import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AuditResultsProps {
  url: string;
  score: {
    seo: number;
    performance: number;
    accessibility: number;
  };
  recommendations: {
    critical: string[];
    important: string[];
    suggestions: string[];
  };
}

export function AuditResults({ url, score, recommendations }: AuditResultsProps) {
  // Generate random numbers for statistics
  const yearlySearches = Math.floor(Math.random() * (13072 - 9852 + 1)) + 9852;
  const competitors = Math.floor(Math.random() * (1107 - 853 + 1)) + 853;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Résultats de l'audit SEO pour {url}
        </h1>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Score SEO"
            score={score.seo}
            color={getScoreColor(score.seo)}
          />
          <ScoreCard
            title="Performance"
            score={score.performance}
            color={getScoreColor(score.performance)}
          />
          <ScoreCard
            title="Accessibilité"
            score={score.accessibility}
            color={getScoreColor(score.accessibility)}
          />
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recherches par an sur activité et localité</h3>
            <p className="text-3xl font-bold text-[#f39018]">{yearlySearches}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Concurrents sur votre activité et localité</h3>
            <p className="text-3xl font-bold text-[#f39018]">{competitors}</p>
          </div>
        </div>

        {/* Strategy Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Astuces & stratégies gagnantes :</h2>
          <p className="text-gray-700 mb-4">
            Votre activité fait face à une concurrence intense, avec de nombreux professionnels présents sur le même créneau.
          </p>
          <p className="text-gray-700 mb-4">
            💡 Prenez une longueur d'avance en optimisant votre position dans les résultats de recherche.
          </p>
          <p className="text-gray-700">
            Soyez l'option que vos clients potentiels voient en premier et transformez cette visibilité en opportunités concrètes.
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-8">
          <RecommendationSection
            title="Points critiques à corriger"
            items={recommendations.critical}
            icon={<XCircle className="h-6 w-6 text-red-500" />}
          />
          <RecommendationSection
            title="Points importants à améliorer"
            items={recommendations.important}
            icon={<AlertTriangle className="h-6 w-6 text-orange-500" />}
          />
          <RecommendationSection
            title="Suggestions d'optimisation"
            items={recommendations.suggestions}
            icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          />
        </div>

        {/* Visibility Boost Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Boostez votre visibilité et attirez des prospects qualifiés:</h2>
          <p className="text-gray-700 mb-4">
            Pour maximiser vos chances d'être vu, il est essentiel d'apparaître en haut des résultats de recherche.
          </p>
          <p className="text-gray-700 mb-4">
            Saviez-vous que 7 internautes sur 10 choisissent un professionnel situé parmi les premiers résultats
          </p>
          <p className="text-gray-700">
            Grâce à nos offres EXPERTPRO, positionnez votre entreprise en tête des recherches et améliorez votre visibilité en ligne. 
            Attirez de nouveaux clients et recevez davantage de demandes grâce à un référencement optimisé et prioritaire sur les plateformes stratégiques.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="https://www.leguichetpro.com/devenez-un-expert/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#f39018] hover:bg-[#e08416] text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Découvrir nos solutions
          </a>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score, color }: { title: string; score: number; color: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className={`text-3xl font-bold ${color}`}>{score}%</div>
    </div>
  );
}

function RecommendationSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-3 mt-1">{icon}</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-orange-500';
  return 'text-red-600';
}