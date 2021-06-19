import axios, { AxiosRequestConfig } from "axios";

type UploadProgress = (progress: number) => any;

const config = (onUploadProgress?: UploadProgress): AxiosRequestConfig => ({
  headers: { "content-type": "multipart/form-data" },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  onUploadProgress: (event: ProgressEvent) =>
    onUploadProgress &&
    onUploadProgress(Math.round((event.loaded * 100) / event.total)),
});

export default async function upload(
  url: string,
  formData: any,
  onUploadProgress?: UploadProgress
) {
  return axios.post(url, formData, config(onUploadProgress));
}
