import axios from "axios";

export async function postImage(file: File): Promise<string | undefined> {
  if (!file) return;

  try {
    const buffer = await readFileAsArrayBuffer(file); // ✅ file -> ArrayBuffer

    const response = await axios.post<{ fileUrl: string }>("/admin/api/uploadImg", {
      fileBuffer: Buffer.from(buffer),
      fileName: file.name,
      fileType: file.type
    });

    return response.data.fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return undefined;
  }
}

// ✅ Yardımcı fonksiyon: FileReader işlemini Promise'e çevir
function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as ArrayBuffer"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsArrayBuffer(file);
  });
}
