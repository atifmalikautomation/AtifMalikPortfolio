import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Atif Malik — Pakistan's No.1 AI Video Production & Automation Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0A0008 0%, #1A0018 40%, #0A0008 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(224,0,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(224,0,138,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Pink glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(224,0,138,0.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            padding: "0 60px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#E0008A",
            }}
          >
            AI-FIRST AGENCY &middot; PAKISTAN
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#F2F2F0",
              lineHeight: 1.1,
              textAlign: "center",
              marginBottom: 8,
              display: "flex",
            }}
          >
            Atif Malik
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              background: "linear-gradient(90deg, #E0008A, #FF4DA6)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
              marginBottom: 32,
              display: "flex",
            }}
          >
            AI Video Production & Automation Systems
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 48,
              alignItems: "center",
            }}
          >
            {[
              { value: "800+", label: "Projects" },
              { value: "5+", label: "Years" },
              { value: "5-Star", label: "Rated" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#E0008A",
                    display: "flex",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(242,242,240,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    display: "flex",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              marginTop: 32,
              fontSize: 16,
              color: "rgba(242,242,240,0.4)",
              letterSpacing: 1,
              display: "flex",
            }}
          >
            atifmalik.me
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #E0008A, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
