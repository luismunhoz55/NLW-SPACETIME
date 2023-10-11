import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })
const baijamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijamjuree'
})

export const metadata: Metadata = {
  title: 'NLW SPACETIME',
  description: 'Uma cápsula do tempo construída com React, NextJS, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans text-gray-100 bg-gray-900 ${roboto.variable} ${baijamjuree.variable}`}>{children}</body>
    </html>
  )
}