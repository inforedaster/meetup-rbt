"use server";

import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

export async function generateBio(title: string, technologies: string[]) {
  if (!title) {
    throw new Error("Le titre est requis pour générer la bio.");
  }

  const prompt = `Tu es un expert en branding personnel pour les professionnels de la tech.
  Rédige une phrase d'accroche (bio) très courte, percutante et professionnelle (maximum 15 mots) pour une personne ayant le rôle de "${title}" et maîtrisant les technologies suivantes : ${technologies.join(', ')}. 
  La phrase doit être en français, sans guillemets, sans hashtags et prête à être affichée sur un badge de conférence (Pass VIP).`;

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = chatResponse.choices?.[0]?.message?.content;
    const bio = typeof content === 'string' ? content.trim() : "Expert(e) passionné(e) par l'innovation technologique et la création de solutions d'avenir.";
    return bio;
  } catch (error) {
    console.error("Erreur lors de la génération de la bio :", error);
    return "Passionné(e) par la tech, prêt(e) à relever de nouveaux défis.";
  }
}
