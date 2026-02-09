// 공통 API 타입 정의

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
