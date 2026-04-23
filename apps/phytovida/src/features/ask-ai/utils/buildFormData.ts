function buildFormData(file: File): FormData {
  const formData = new FormData();
  formData.append("images", file);
  formData.append("organs", "auto"); // let PlantNet detect the organ type
  return formData;
}

export default buildFormData;
