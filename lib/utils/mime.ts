export const DISCRETE_TYPES = {
  application: "application",
  audio: "audio",
  font: "font",
  image: "image",
  model: "model",
  text: "text",
  video: "video",
};

export function getMimeType(mimeType: string): [string, string] {
  const [type, subtype] = mimeType.split("/");
  return [type, subtype];
}

export function isGenericMimeType(mimeType: string): boolean {
  const [type, subtype] = getMimeType(mimeType);
  return Object.keys(DISCRETE_TYPES).includes(type) && subtype === "*";
}
