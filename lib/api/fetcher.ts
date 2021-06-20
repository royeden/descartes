import axios from "axios";

export default async function fetcher<T>(url: string): Promise<T> {
  const response = await axios.get(`${process.env.SERVER_URL as string}${url}`);

  const json = await response.data;

  return json;
}
