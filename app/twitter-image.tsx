import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Bhuvan Gowda P portfolio artwork";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage({
    eyebrow: "CHRONO//ROOTS",
    title: "Curiosity, with roots.",
    description:
      "AI, automation, business, music and stories. The personal archive of Bhuvan Gowda P.",
  });
}
