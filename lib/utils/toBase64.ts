export default function toBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result && (reader.result as string));
    reader.onerror = (error) => reject(error);
  });
}
