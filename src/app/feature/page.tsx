import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/global/footer"

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen pb-[300px] bg-gray-900 text-white">
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
        <h1 className="text-5xl font-bold mb-8 text-center">Our Features</h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Discover how ConnectX enhances your Instagram engagement with cutting-edge AI tools.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
  <FeatureCard
    title="AI-Powered Responses"
    description="Leverage advanced AI to automatically respond to messages and comments, ensuring timely and relevant interactions. 
    Our AI-driven system learns from past interactions, crafting human-like replies that boost engagement and save you valuable time."
    href="/features/ai-responses"
  />
  <FeatureCard
    title="Analytics Dashboard"
    description="Gain deep insights into your Instagram engagement with real-time analytics. Track response rates, follower growth, 
    and engagement metrics all in one centralized dashboard, helping you optimize your strategy effectively."
    href="/features/analytics"
  />
  <FeatureCard
    title="Multi-Account Management"
    description="Easily manage multiple Instagram accounts from a single dashboard. Whether you're handling personal branding, 
    multiple business pages, or client accounts, streamline workflows and switch between profiles effortlessly."
    href="/features/multi-account"
  />
  <FeatureCard
    title="Customizable Workflows"
    description="Create custom automation workflows tailored to your engagement needs. Define triggers, set up personalized response 
    sequences, and automate repetitive tasks to enhance efficiency while maintaining a personal touch with your audience."
    href="/features/workflows"
  />
</div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={href} passHref>
        <Button variant="outline" className="group border-gray-600 text-gray-300 hover:bg-gray-700">
          Learn more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  )
}

