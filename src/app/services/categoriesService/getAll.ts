import { httpClient } from "../httpClient";

import type { Category } from "../../entities/Category";

type GetAllCategoriesParams = {
  bankAccountId?: string;
};

type CategoriesResponse = Array<Category>;

export async function getAll(params: GetAllCategoriesParams) {
  let route = '/categories';
  if (params.bankAccountId) {
    route += `?bankAccountId=${params.bankAccountId}`;
  }

  const { data } = await httpClient.get<CategoriesResponse>(route);
  return data;
}
