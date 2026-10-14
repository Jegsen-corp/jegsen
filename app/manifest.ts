import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jegsen IA",
    short_name: "Jegsen IA",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f8f8f6",
    theme_color: "#f8f8f6",
    lang: "fr-FR",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
  }
}
