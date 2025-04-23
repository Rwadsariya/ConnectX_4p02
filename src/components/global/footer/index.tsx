import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"
import { cn } from "@/lib/utils"

const Footer = ({
  className,
}: {
  className?: string
}) => {
  return (
    <footer className={cn("w-full bg-black text-gray-400 absolute bottom-0 left-0 right-0", className)}>
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-semibold text-white hover:text-gray-300 transition">
              ConnectX
            </Link>
            <p className="text-sm mt-2">Transform your Instagram engagement with AI-powered responses.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-green-500 transition">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-green-500 transition">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-green-500 transition">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} ConnectX. All rights reserved.</p>
          <Link href="mailto:support@connectx.com" className="text-sm hover:text-green-500 transition mt-2 md:mt-0">
            support@connectx.com
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer