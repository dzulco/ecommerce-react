const IMGBB_API_KEY = "***";
const ENDPOINT = "https://api.imgbb.com/1/upload";

export const uploadImage = async (file) => {
  if (!file || typeof file.size !== "number" || file.size === 0) {
    throw new Error("El archivo de imagen está vacío. Seleccioná otra imagen.");
  }

  if (!file.type?.startsWith("image/")) {
    throw new Error("El archivo seleccionado no es una imagen válida.");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success || !data.data?.url) {
      const uploadMessage =
        data.error?.message || "El servicio de imágenes rechazó el archivo.";
      throw new Error(`No se pudo subir la imagen: ${uploadMessage}`);
    }

    return data.data.url;
  } catch (error) {
    console.error("ImgBB error:", error);
    throw error;
  }
};