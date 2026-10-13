import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // The wildcard also permits other AI crawlers and keeps CSS/images crawlable.
    // Explicit search agents document access; they do not improve ranking by themselves.
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["Googlebot", "Googlebot-Image", "bingbot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
