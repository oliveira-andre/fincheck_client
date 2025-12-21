import { httpClient } from "../httpClient";

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

async function signIn(params: SignInParams) {
  const { data } = await httpClient.post<SignInResponse>('/auth/signin', params);
  return data;
}

export { signIn, type SignInParams, type SignInResponse };