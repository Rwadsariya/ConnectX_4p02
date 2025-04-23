import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/global/footer"

export default function Home() {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Lifestyle Influencer",
      image: "/sarah.png", // Ensure image is in /public folder
      quote:
        "ConnectX has completely transformed how I engage with my followers. My response rate has increased by 78% and I've seen a significant boost in conversions.",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Brand Owner",
      image: "/michael.png",
      quote:
        "The automated responses are incredibly natural. My customers can't tell they're AI-generated, and my team saves hours every day on customer service.",
    },
    {
      name: "Jessica Williams",
      role: "Travel Content Creator",
      image: "/jessica.png",
      quote:
        "Since using ConnectX, I've been able to maintain meaningful connections with my audience even while traveling. It's been a game-changer for my brand.",
    },
  ]

  return (
    <>
      <main>
        {/* Header Section */}
        <section className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="relative">
            <div className="container px-4 py-8">
              <div className="flex items-center justify-between">
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
              </div>

              <div className="mx-auto mt-16 max-w-3xl text-center">
                <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Transform Your Instagram Engagement with ConnectX
                </h1>

                <p className="mt-6 text-lg text-gray-300">
                  ConnectX transforms the way you interact with your Instagram followers. Easily increase engagement and automate responses to transform experiences into successful company prospects.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                  <Button size="lg" className="bg-green-500 text-white hover:bg-green-600">Get Started</Button>
                  <Button size="lg" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-40 md:h-80 w-full mt-10">
                <Image src="/Ig-creators.png" alt="Community member" fill className="object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Choose Your Plan</h2>
              <p className="max-w-[900px] text-gray-400">Select the perfect plan to boost your Instagram engagement</p>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className="flex flex-col justify-between bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-500 hover:bg-green-600">{plan.cta}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-5xl">What Our Users Say</h2>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden mx-auto">
                      <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="object-cover rounded-full" />
                    </div>
                    <p className="text-gray-300 italic mt-4">{testimonial.quote}</p>
                    <h4 className="font-semibold text-white mt-2">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
      
    </>
  )
}