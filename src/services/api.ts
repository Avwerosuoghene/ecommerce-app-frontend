import {
  IloginPayload,
  IpasswordResetPayload,
  IpostUploadPayload,
  IsignUpPayload,
} from "../models/types";
import axios from "axios";
import { addToCartPayload, addToCartResponse } from "../models/payload";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getAuthToken = (): string | undefined => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    return `Bearer ${authToken}`;
  } else {
    return;
  }
};

export const signUp = async (signUpPayload: IsignUpPayload) => {
  console.log(baseUrl);
  try {
    const response = await axios.put(`${baseUrl}auth/signup`, signUpPayload);
    return { response };
  } catch (error: any) {
    const errorRes = error;
    return errorRes;
  }
};

export const passwordReset = async (
  passwordResetPayload: IpasswordResetPayload
) => {
  try {
    const response = await axios.put(
      `${baseUrl}auth/passwordReset`,
      passwordResetPayload
    );
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const login = async (loginPayload: IloginPayload) => {
  try {
    const response = await axios.post(`${baseUrl}auth/login`, loginPayload);
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const postUpload = async (postUploadPayload: IpostUploadPayload) => {
  try {
    const response = await axios.post(
      `${baseUrl}admin/products`,
      postUploadPayload,
      {
        headers: {
          Authorization: getAuthToken(),
          // 'content-type': 'multipart/form-data'
        },
      }
    );
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const editUpload = async (payload: {formData: string, id: string}) => {
  try {
    const response = await axios.put(
      `${baseUrl}admin/product/${payload.id}`,
      payload.formData,
      {
        headers: {
          Authorization: getAuthToken(),
          // 'content-type': 'multipart/form-data'
        },
      }
    );
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}products`);
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const getUserProducts = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(
      `${baseUrl}productByUserId?userId=${userId}`
    );
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const getProductById = async (productId: any) => {
  try {
    const response = await axios.get(`${baseUrl}products/${productId}`);
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const deleteProductById = async (productId: any) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/admin/product/${productId}`,
      {
        headers: {
          Authorization: getAuthToken(),
          // 'content-type': 'multipart/form-data'
        },
      }
    );
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};

export const addToCart = async (cartItem: addToCartPayload) => {
  try {
    const response:{message: string, isSuccess: boolean, data: any}  = await axios.post(
      `${baseUrl}/cart`,
      cartItem,
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response;
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};
