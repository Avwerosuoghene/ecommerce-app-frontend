import { IsignUpPayload } from "../models/types";
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
      // console.log(response)
      // console.log('inside response')
      return { response };
  } catch(error: any) {
    const errorRes = error.response.data
    // console.log(error.response.data)
    return errorRes
  
    // return throwError(() => {
    //   console.log('inside thrown ');
    //   return errorRes;
    // });
  }

};
