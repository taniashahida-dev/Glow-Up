export interface Service {
  _id?: string;
  title: string;
  category: "Facial" | "Hair" | "Nails" | "Makeup" | "Wellness";
  shortDescription: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  image: string;
  createdAt: string;
}

export interface ServicesApiResponse {
  services: Service[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface ServicePageParams {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: string;
}