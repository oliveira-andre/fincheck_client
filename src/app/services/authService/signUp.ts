import { httpClient } from "../httpClient";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

async function signUp(params: SignUpParams) {
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', params);
  return data;
}

export { signUp, type SignUpParams, type SignUpResponse };