import { ImageResponse } from "next/og";

type IconSize = {
  width: number;
  height: number;
};

export function createIconImage(size: IconSize): ImageResponse {
  const scale = size.width / 512;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#101a20",
        color: "#eef0e9",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 220 * scale,
        fontWeight: 900,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.12em",
        paddingRight: 24 * scale,
        position: "relative",
        width: "100%",
      }}
    >
      BG
      <div
        style={{
          background: "#acd3df",
          borderRadius: 999,
          bottom: 54 * scale,
          display: "flex",
          height: 28 * scale,
          left: 56 * scale,
          position: "absolute",
          width: 400 * scale,
        }}
      />
    </div>,
    size,
  );
}
