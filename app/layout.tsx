import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { MotionProvider } from "@/components/motion/motion-provider"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { JsonLd, organizationLd } from "@/components/site/json-ld"
import { site } from "@/lib/site"
import "./globals.css"

const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
})

const interTight = localFont({
  src: "./fonts/inter-tight-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Jegsen IA",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "fr_FR",
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#f8f8f6",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <a
          href="#contenu"
          className="absolute -top-15 left-3 z-[100] rounded-[10px] bg-ink px-4 py-2.5 text-bg focus:top-3"
        >
          Aller au contenu
        </a>
        <JsonLd data={organizationLd} />
        <MotionProvider>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
