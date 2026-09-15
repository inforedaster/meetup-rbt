import React, { useState } from 'react';
import { MemberData } from '@/types';
import { Sparkles, Download, Copy, Loader2 } from 'lucide-react';

interface MemberFormProps {
  data: MemberData;
  setData: React.Dispatch<React.SetStateAction<MemberData>>;
  onGenerateBio: () => Promise<void>;
  onExport: () => void;
  isGeneratingBio: boolean;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  data,
  setData,
  onGenerateBio,
  onExport,
  isGeneratingBio,
}) => {
  const [techInput, setTechInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (techInput.trim() && data.technologies.length < 3) {
        setData((prev) => ({
          ...prev,
          technologies: [...prev.technologies, techInput.trim()],
        }));
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (index: number) => {
    setData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleCopyLink = () => {
    // In a real app, this would generate a unique shareable link
    // For this demo, we'll just copy the current URL
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié dans le presse-papier !');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-raidex-blue mb-6">Créez votre Pass VIP</h2>
      
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              placeholder="Ada"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-raidex-cyan focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Lovelace"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-raidex-cyan focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Titre Professionnel</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="ex. Cloud Architect"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-raidex-cyan focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Technologies Clés (max 3)</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {data.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-raidex-bg text-raidex-blue text-sm rounded-full flex items-center gap-2 border border-gray-200"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="text-gray-500 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleAddTech}
            disabled={data.technologies.length >= 3}
            placeholder={data.technologies.length >= 3 ? "Limite atteinte" : "Appuyez sur Entrée pour ajouter"}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-raidex-cyan focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
          <button
            type="button"
            onClick={onGenerateBio}
            disabled={isGeneratingBio || !data.title || data.technologies.length === 0}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-raidex-blue text-white rounded-xl font-medium hover:bg-raidex-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingBio ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-raidex-gold" />
            )}
            Générer ma bio IA
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onExport}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copier le lien
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
