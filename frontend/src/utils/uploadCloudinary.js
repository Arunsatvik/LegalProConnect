const uploadImageToCloudinary = async file => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", "legalproconnect");
  uploadData.append("cloud_name", "dqepl07qm");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dqepl07qm/image/upload",
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();
  return data;
};

export default uploadImageToCloudinary;
