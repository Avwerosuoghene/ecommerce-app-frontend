import { IloginPayload, IpasswordResetPayload, IpostUploadPayload, IsignUpPayload } from "../models/types";
import { BASE_URL } from "../environment";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL ;


export const signUp = async (
  signUpPayload: IsignUpPayload
) => {
  console.log(baseUrl);
  try {
    const response = await axios.put(`${baseUrl}auth/signup`, 
    signUpPayload,
      );
      return { response };
  } catch(error: any) {
    const errorRes = error
    return errorRes

  }
};

export const passwordReset = async (
  passwordResetPayload: IpasswordResetPayload
) => {
  try {
    const response = await axios.put(`${baseUrl}auth/passwordReset`, 
    passwordResetPayload
      );
      return { response };
  } catch(error: any) {
    console.log(error)
    const errorRes = error
    return errorRes
  }
};


export const login = async (
  loginPayload: IloginPayload
) => {
  try {
    const response = await axios.post(`${baseUrl}auth/login`, 
    loginPayload
      );
      return { response };
  } catch(error: any) {
    console.log(error)
    const errorRes = error
    return errorRes
  }
};

export const postUpload = async (
  postUploadPayload: IpostUploadPayload
) => {
  try {
    const response = await axios.post(`${baseUrl}admin/products`, 
    postUploadPayload
      );
      return { response };
  } catch(error: any) {
    console.log(error)
    const errorRes = error
    return errorRes
  }
};
