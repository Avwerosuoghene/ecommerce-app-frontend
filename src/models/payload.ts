import { IpostUploadPayload } from "./types";

export type getProductByIdResponse = Omit<IpostUploadPayload,"userId" > & {
    rating: number;
    reviews: number;
}