import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/global/footer"

export default function AboutPage() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-300 hover:text-gray-400 transition">
          ConnectX
        </Link>
        <nav className="hidden space-x-6 text-sm text-gray-400 md:block">
          <Link href="/feature">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/aboutus">About</Link>
        </nav>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          <Link href="/dashboard">Login</Link>
        </Button>
      </header>

      <section className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">About ConnectX</h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Learn how ConnectX is transforming Instagram engagement with AI-driven automation.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 mb-4">
              ConnectX was founded in 2025 with a mission to revolutionize how businesses interact with their audience
              on Instagram. Our AI-powered platform enables effortless engagement, ensuring no message goes unanswered.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              With a team of dedicated professionals and cutting-edge technology, we&lsquo;re committed to helping businesses
              grow their online presence and build meaningful connections with their followers.
            </p>
            <Link href="/careers" passHref>
              <Button className="bg-green-500 text-white hover:bg-green-600">Join Our Team</Button>
            </Link>
          </div>

          {/* Team Image Section (Updated) */}
          <div className="relative h-[400px] w-full flex justify-center">
            <Image
              src="/team.png" // Ensure this file exists inside `public/`
              alt="Our Team"
              width={600} 
              height={400} 
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      <Footer className="absolute bottom-0"/>
    </main>
  )
}