import { FileTypeResult } from "file-type/browser";

import { FilesWithType } from "../hooks/_useDndFile";

export type SupportedFileType = string;

export default function getFileType(file: FilesWithType): SupportedFileType {
  const { type } = file;
  return (type as FileTypeResult).mime.split("/")[0];
}
