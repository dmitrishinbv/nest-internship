export enum BookStatus {
  PUBLISHED = 'PUBLISHED',
  IN_REVIEW = 'IN_REVIEW',
}

export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  status: BookStatus;
}
