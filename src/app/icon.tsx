import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#2d5a3d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d4623a",
          borderRadius: 8,
          fontWeight: "bold",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
