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
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 11.8 12.8 14 10 14S5 11.8 5 9V7.5L3 7V9C3 12.2 5.3 14.8 8.4 15.7V22H10.6V15.7C13.7 14.8 16 12.2 16 9H21Z"/>
    </svg>`
  },
  {
    id: 'ecran-noir',
    title: 'Écran noir pendant l\'écoute',
    description: 'Mode audio pur sans distraction visuelle pour une immersion totale dans les histoires.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'playlists-thematiques',
    title: 'Playlists thématiques',
    description: 'Collections organisées par âge, thème et durée pour trouver le contenu parfait facilement.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 6H3V8H15V6ZM15 10H3V12H15V10ZM3 16H11V14H3V16ZM17 6V14.18C16.69 14.07 16.35 14 16 14C14.34 14 13 15.34 13 17S14.34 20 16 20 19 18.66 19 17V8H22V6H17Z"/>
    </svg>`
  },
  {
    id: 'reprise-facile',
    title: 'Reprise facile des épisodes',
    description: 'Mémorisation automatique de la position d\'écoute pour reprendre exactement où vous vous êtes arrêtés.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM17 13H11V7H13V11H17V13Z"/>
    </svg>`
  },
  {
    id: 'qualite-editoriale',
    title: 'Qualité éditoriale : pas d\'IA',
    description: 'Contenus soigneusement sélectionnés par des humains, sans algorithme de recommandation intrusif.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
    </svg>`
  },
  {
    id: 'acces-gratuit',
    title: 'Accès gratuit aux podcasts',
    description: 'Large catalogue gratuit avec option playlists premium pour encore plus de contenus exclusifs.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM9.5 16.5V7.5L16 12L9.5 16.5Z"/>
    </svg>`
  }
];