import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Transform Your Instagram Engagement with Connectx
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Connectx revolutionizes how businesses interact with their audience on Instagram. Automate responses and
              engage effortlessly, ensuring no message goes unanswered.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-black text-white hover:bg-black/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-2">
              Learn More
            </Button>
          </div>
          <div className="w-full">
            <Image
              src="/hero-image.jpg"
              alt="Hero"
              width={1200}
              height={600}
              className="mx-auto rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}