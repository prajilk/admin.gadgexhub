import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (
  image: string,
  slug: string,
  color: string,
  filename: string,
) => {
  return cloudinary.uploader.upload(image, {
    folder: "products",
    public_id: `${slug}/${
      color.toLowerCase() === "default" ? "" : color
    }/${filename}`,
  });
};

export { cloudinary };
