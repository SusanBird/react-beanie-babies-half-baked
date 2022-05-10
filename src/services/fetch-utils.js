import { client, checkError } from './client';

export async function getBeanieBabies(page) {
  const numPerPage = 30;

  const start = (page - 1) * numPerPage;

  const response = await client
    .from('beanie_babies')
    .select('*', { count: 'exact' })
    .range(start, start + numPerPage - 1);

  const lastPage = Math.ceil(response.count / numPerPage);

  return { ...response, lastPage };
}

export async function getSingleBeanie(id) {
  const response = await client
    .from('beanie_babies')
    .select()
    .match({ id })
    .single();

  return checkError(response);

}