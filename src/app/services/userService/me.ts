import { httpClient } from "../httpClient";
import type { User } from "../../entities/User";

type MeResponse = User;

async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');
  return data;
}

export { me, type MeResponse };