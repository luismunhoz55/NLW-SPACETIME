import { Copyright } from './components/Copyright'
import { EmptyMemories } from './components/EmptyMemories'
import { Hero } from './components/Hero'
import { Signin } from './components/Signin'

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg=[url(../assets/bg-stars.svg)] bg-cover">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute right-1 top-0 bottom-0 w-2 bg-stripes" />

        <Signin />

        <Hero />

        <Copyright />
        

      </div>

      {/* Right */}
      <div className="flex flex-col p-16 bg=[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}
