export interface User {
  id: number;
  role: 'CUSTOMER' | 'ADMIN';
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional so we can delete it from state for security
  phone: string;
  city: string;
}
