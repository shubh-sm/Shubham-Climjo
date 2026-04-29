export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  address?: string;
  isAdmin?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image?: string;
}
