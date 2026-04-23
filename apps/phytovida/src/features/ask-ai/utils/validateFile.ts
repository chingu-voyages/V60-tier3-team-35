function validateFile(file: File): void {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPEG and PNG images are supported");
  }

  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    throw new Error("Image size must be under 50MB");
  }
}

export default validateFile;
