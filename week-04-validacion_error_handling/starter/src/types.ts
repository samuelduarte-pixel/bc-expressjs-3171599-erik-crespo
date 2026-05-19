export interface Patient {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;       // ISO date string, ej: "1990-05-15"
  diagnosis: string;
  isActive: boolean;
  createdAt: Date;
}

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}