import { Copyright } from './components/Copyright'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import { EmptyMemories } from './components/EmptyMemories'
import { Hero } from './components/Hero'
import { Profile } from './components/Profile'
import { Signin } from './components/Signin'
import { cookies } from 'next/headers'

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

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  const isAuthenticaded = cookies().has('token');

  return (
    <html lang="en">
      <body
        className={`font-sans text-gray-100 bg-gray-900 ${roboto.variable} ${baijamjuree.variable}`}
      >

        <main className="grid grid-cols-2 min-h-screen">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg=[url(../assets/bg-stars.svg)] bg-cover">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute right-1 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticaded ? <Profile /> : <Signin />}

            <Hero />

            <Copyright />


          </div>

          {/* Right */}
          <div className="overflow-y-scroll max-h-screen flex flex-col bg=[url(../assets/bg-stars.svg)] bg-cover">
            {/* Aqui é onde vai aparecer o conteúdo da página */}
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}