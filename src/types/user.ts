
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  createdAt: string;
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
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
  createdAt: string;
}

export interface DashboardStats {
  totalVisits: number;
  totalClicks: number;
  clickRate: number;
  topPerformingItem?: PromotionalItem;
}
