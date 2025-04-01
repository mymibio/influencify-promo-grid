
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  categories?: string[];
  createdAt: string;
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  whatsapp?: string;
  email?: string;
  tiktok?: string;
  threads?: string;
  linkedin?: string;
  pinterest?: string;
  snapchat?: string;
  telegram?: string;
  discord?: string;
  reddit?: string;
}

export interface PromotionalItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
  type: 'product' | 'coupon';
  aspectRatio: '1:1' | '9:16';
  couponCode?: string;
  discount?: string;
  category?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalVisits: number;
  totalClicks: number;
  clickRate: number;
  topPerformingItem?: PromotionalItem;
}
