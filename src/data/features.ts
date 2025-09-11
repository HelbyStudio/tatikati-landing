export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG string
}

export const features: Feature[] = [
  {
    id: 'mode-enfant',
    title: 'Mode enfant avec navigation audio',
    description: 'Interface sécurisée avec commandes vocales et navigation simplifiée pour l\'autonomie des enfants.',
    icon: `<i class="fa-solid fa-child-reaching"></i>`
  },
  {
    id: 'ecran-noir',
    title: 'Écran noir pendant l\'écoute',
    description: 'Mode audio pur sans distraction visuelle pour une immersion totale dans les histoires.',
    icon: `<i class="fa-solid fa-moon"></i>`
  },
  {
    id: 'playlists-thematiques',
    title: 'Playlists thématiques',
    description: 'Collections organisées par âge, thème et durée pour trouver le contenu parfait facilement.',
    icon: `<i class="fa-solid fa-bars"></i>`
  },
  {
    id: 'reprise-facile',
    title: 'Reprise facile des épisodes',
    description: 'Mémorisation automatique de la position d\'écoute pour reprendre exactement où vous vous êtes arrêtés.',
    icon: `<i class="fa-solid fa-clock-rotate-left"></i>`
  },
  {
    id: 'qualite-editoriale',
    title: 'Qualité éditoriale : pas d\'IA',
    description: 'Contenus soigneusement sélectionnés par des humains, sans algorithme de recommandation intrusif.',
    icon: `<i class="fa-solid fa-heart"></i>`
  },
  {
    id: 'acces-gratuit',
    title: 'Accès gratuit aux podcasts',
    description: 'Large catalogue gratuit avec option playlists premium pour encore plus de contenus exclusifs.',
    icon: `<i class="fa-solid fa-play-circle"></i>`
  }
];