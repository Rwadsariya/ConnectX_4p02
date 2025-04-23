import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Instagram, Twitter, Facebook } from 'lucide-react'
import Footer from "@/components/global/footer"

export default function PricingPage() {
  const plans = [
    {
      name: "Free Plan",
      description: "Perfect for getting started",
      price: "$0",
      features: [
        "Boost engagement with target responses",
        "Automate comment replies to enhance audience interaction",
        "Turn followers into customers with targeted messaging",
      ],
      cta: "Get Started",
    },
    {
      name: "Smart AI Plan",
      description: "Advanced features for power users",
      price: "$99",
      features: [
        "All features from Free Plan",
        "AI-powered response generation",
        "Advanced analytics and insights",
        "Priority customer support",
        "Custom branding options",
      ],
      cta: "Upgrade Now",
    },
  ]

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
        <h1 className="text-5xl font-bold mb-8 text-center">Choose Your Plan</h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Select the perfect plan to boost your Instagram engagement.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="text-4xl font-bold text-white">
                {plan.price}
                <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-green-500 hover:bg-green-600">{plan.cta}</Button>
            </div>
          ))}
        </div>
      </section>
      <Footer className="absolute bottom-0" />
    </main>
  )
}
