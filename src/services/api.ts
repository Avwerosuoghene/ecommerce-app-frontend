import {
  IloginPayload,
  IpasswordResetPayload,
  IpostUploadPayload,
  IsignUpPayload,
} from "../models/types";
import axios from "axios";

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

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}admin/products`);
    return { response };
  } catch (error: any) {
    console.log(error);
    const errorRes = error;
    return errorRes;
  }
};
