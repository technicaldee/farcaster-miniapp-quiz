import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🧠 Farcaster Quiz Challenge",
  description: "Test your Farcaster and Celo knowledge while earning NFT and token rewards!",
  openGraph: {
    title: "🧠 Farcaster Quiz Challenge",
    description: "Test your Farcaster and Celo knowledge while earning NFT and token rewards!",
    images: ["/quiz-og.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="fc:frame"
          content='{"version":"next","imageUrl":"/quiz-preview.png","button":{"title":"🧠 Start Quiz","action":{"type":"launch_frame","name":"Farcaster Quiz Challenge","splashImageUrl":"/quiz-logo.png","splashBackgroundColor":"#8B5CF6"}}}'
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
