import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          borderRadius: "999px",
          color: "#fbbf24",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    size,
  );
}
