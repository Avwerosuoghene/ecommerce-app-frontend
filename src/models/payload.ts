import { IpostUploadPayload } from "./types";

export enum cartType {
    single = 1,
    bulk = 2
}

export type getProductByIdResponse = Omit<IpostUploadPayload, "userId"> & {
  rating: number;
  reviews: number;
};

export interface addToCartPayload {
  product: string;
  quantity: number;
  type: cartType
}

export interface addToCartResponse {
  message: string;
  isSuccess: boolean;
  data: any;
}
