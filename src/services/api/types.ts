export interface ApiResponse<T> {
  data: T;
  status: number;
  meta?: any;
  title: string;
}

export interface ApiError {
  status: number;
  message: string;
}