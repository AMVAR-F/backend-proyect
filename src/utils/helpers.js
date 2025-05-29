
export const bufferToBase64 = (buffer) => {
  if (!buffer) return null;
  if (typeof buffer === "string") return buffer; // Si ya es string (base64 o URL)
  if (Buffer.isBuffer(buffer)) {
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }
  return null;
};