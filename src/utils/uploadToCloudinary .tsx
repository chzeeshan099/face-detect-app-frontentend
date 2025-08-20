export const uploadToCloudinary = async (file: File): Promise<string> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "my_fyp");
  data.append("cloud_name", "ddwq8rhde");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ddwq8rhde/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = (await res.json()) as { secure_url: string };
  return json.secure_url;
};
