import { Icon } from '@phosphor-icons/react';

export interface Auth {
  user: User;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  sidebarOpen: boolean;

  [key: string]: unknown;
}

export interface NavbarItem {
  name: string;
  href: string;
  icon?: Icon;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  two_factor_enabled?: boolean;
  created_at: string;
  updated_at: string;

  [key: string]: unknown; // This allows for additional properties...
}
