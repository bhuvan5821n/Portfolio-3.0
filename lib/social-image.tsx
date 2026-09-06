import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

type SocialImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
};

export function createSocialImage({
  eyebrow,
  title,
  description,
}: SocialImageOptions): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#101a20",
        color: "#eef0e9",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(21,23,25,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(21,23,25,0.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: 20,
          fontWeight: 700,
          justifyContent: "space-between",
          letterSpacing: "0.08em",
          position: "relative",
          textTransform: "uppercase",
        }}
      >
        <span>{eyebrow}</span>
        <span style={{ color: "#b2bfc4" }}>Bhuvan Gowda P</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 860,
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#acd3df",
            display: "flex",
            height: 12,
            marginBottom: 28,
            width: 108,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: title.length > 32 ? 68 : 82,
            fontWeight: 800,
            letterSpacing: "-0.055em",
            lineHeight: 0.94,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#b2bfc4",
            display: "flex",
            fontSize: 27,
            lineHeight: 1.35,
            marginTop: 28,
            maxWidth: 780,
          }}
        >
          {description}
        </div>
      </div>

      <svg
        aria-hidden="true"
        height="630"
        style={{ display: "flex", position: "absolute", right: 0, top: 0 }}
        viewBox="0 0 1200 630"
        width="1200"
      >
        <path
          d="M1110 600 Q1080 420 1040 330 L970 240 M1068 410 Q1160 320 1170 220 M1040 330 Q1015 260 1050 160"
          fill="none"
          stroke="#acd3df"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: 18,
          fontWeight: 700,
          justifyContent: "space-between",
          letterSpacing: "0.04em",
          position: "relative",
        }}
      >
        <span>Question · Prototype · Observe · Rebuild</span>
        <span style={{ color: "#b2bfc4" }}>
          {siteConfig.origin.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </div>,
    socialImageSize,
  );
}
