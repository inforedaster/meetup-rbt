"use client";

import React, { useState, useRef } from 'react';
import { MemberForm } from '@/components/MemberForm';
import { MemberCard } from '@/components/MemberCard';
import { MemberData } from '@/types';
import { generateBio } from '@/actions/generateBio';
import html2canvas from 'html2canvas';

export default function Home() {
  const [data, setData] = useState<MemberData>({
    firstName: '',
    lastName: '',
    title: '',
    technologies: [],
    aiBio: '',
  });
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    try {
      const bio = await generateBio(data.title, data.technologies);
      setData((prev) => ({ ...prev, aiBio: bio }));
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de la génération de la bio.");
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `Pass-VIP-RAIDEX-${data.firstName || 'Membre'}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'exportation de l'image.");
    }
  };

  return (
    <main className="min-h-screen bg-raidex-bg text-raidex-blue selection:bg-raidex-cyan selection:text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Header */}
      <div className="max-w-7xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Générateur de Carte Membre <span className="text-raidex-cyan">RAIDEX</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Créez votre Pass VIP pour le prochain événement Rabat Tech Hub. Remplissez le formulaire et laissez notre IA générer votre accroche personnalisée.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
          <MemberForm
            data={data}
            setData={setData}
            onGenerateBio={handleGenerateBio}
            onExport={handleExport}
            isGeneratingBio={isGeneratingBio}
          />
        </div>

        <div className="w-full flex justify-center lg:justify-start lg:sticky lg:top-12">
          <MemberCard data={data} ref={cardRef} />
        </div>
      </div>
    </main>
  );
}
