import { supabase } from "../lib/supabase";
import { v4 as uuid } from "uuid";

export async function uploadTokenLogo(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${uuid()}.${extension}`;

  console.log("Uploading:", fileName);

  const response = await supabase.storage
    .from("token-logos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  console.log("FULL RESPONSE:", response);

  if (response.error) {
    console.error("UPLOAD ERROR:", response.error);
    throw response.error;
  }

  const { data } = supabase.storage
    .from("token-logos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}