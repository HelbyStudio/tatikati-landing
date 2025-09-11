export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sophie M.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b098?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    quote: 'Tatikati a révolutionné nos trajets en voiture ! Ma fille de 6 ans adore les histoires et je suis ravie qu\'elle puisse les écouter sans écran.'
  },
  {
    id: '2',
    name: 'Marc D.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    quote: 'Le mode enfant est parfait ! Mon fils de 4 ans utilise l\'app en toute autonomie. La qualité des contenus est exceptionnelle.'
  },
  {
    id: '3',
    name: 'Julie L.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 4,
    quote: 'Enfin une alternative aux écrans ! Les playlists thématiques sont bien pensées et mes jumeaux de 5 ans se disputent moins pour choisir.'
  },
  {
    id: '4',
    name: 'Thomas R.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    quote: 'La fonction de reprise automatique est géniale pour les longs épisodes. Ma fille peut reprendre son histoire exactement où elle s\'était arrêtée.'
  }
];