import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.title;
  const description = searchParams.get("description") ?? siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fff8ee",
          color: "#1f1a14",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* warm vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.18) 0%, transparent 55%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            fontWeight: 600,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50% 60% 55% 50% / 60% 50% 55% 50%",
              background: "linear-gradient(135deg, #ff6b35 0%, #f7c948 100%)",
              border: "1.5px solid #1f1a14",
              transform: "rotate(-6deg)",
              display: "flex",
            }}
          />
          <span>asher</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 1,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#4a3f2e",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#8b7c61",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>built with care · shanghai · 2026</span>
          <span style={{ color: "#ff6b35" }}>— see you around ✿</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
