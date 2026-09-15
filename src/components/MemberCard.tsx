import React, { forwardRef } from 'react';
import { MemberData } from '@/types';
import { Cpu } from 'lucide-react';

interface MemberCardProps {
  data: MemberData;
}

export const MemberCard = forwardRef<HTMLDivElement, MemberCardProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden bg-white w-full max-w-md aspect-[1.586/1] rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between p-8"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-raidex-cyan/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-raidex-blue/10 rounded-full blur-3xl -ml-10 -mb-10" />

        {/* Watermark Logo Placeholder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none flex flex-col items-center justify-center w-[80%] h-[80%]">
          <img src="/logo.png" alt="RAIDEX Logo" className="w-full h-full object-contain grayscale" crossOrigin="anonymous" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-raidex-blue uppercase tracking-wide">
              {data.firstName || 'Prénom'}
              <br />
              {data.lastName || 'Nom'}
            </h2>
            <p className="text-raidex-gold font-medium text-lg mt-1">
              {data.title || 'Titre Professionnel'}
            </p>
          </div>
          <div className="bg-raidex-blue p-3 rounded-xl shadow-lg border border-raidex-blue/20">
            <Cpu className="text-white w-8 h-8" />
          </div>
        </div>

        {/* AI Bio */}
        <div className="relative z-10 my-4">
          <p className="text-sm text-gray-600 italic border-l-2 border-raidex-cyan pl-3">
            {data.aiBio || 'Générez votre bio IA pour obtenir une phrase d\'accroche percutante.'}
          </p>
        </div>

        {/* Footer: Technologies */}
        <div className="relative z-10 flex gap-2 flex-wrap">
          {data.technologies.length > 0 ? (
            data.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-raidex-bg text-raidex-blue text-xs font-semibold rounded-full border border-raidex-cyan/30"
              >
                {tech}
              </span>
            ))
          ) : (
            <>
              <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-semibold rounded-full border border-gray-100">Tech 1</span>
              <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-semibold rounded-full border border-gray-100">Tech 2</span>
              <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-semibold rounded-full border border-gray-100">Tech 3</span>
            </>
          )}
        </div>
      </div>
    );
  }
);

MemberCard.displayName = 'MemberCard';
