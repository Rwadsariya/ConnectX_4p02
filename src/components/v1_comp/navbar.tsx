"use client"
import Link from "next/link"
import { X, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b]">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">
                <Image 
                    src={"/logo.png"}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full object-cover shadow-md"
                />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/features" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link href="/about-us" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">About Us</div>
                      <div className="text-sm text-muted-foreground">Learn more about our innovative solutions</div>
                    </Link>
                    <Link href="/blog" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">Blog Posts</div>
                      <div className="text-sm text-muted-foreground">Read our latest insights and updates</div>
                    </Link>
                    <Link href="/case-studies" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">Case Studies</div>
                      <div className="text-sm text-muted-foreground">Explore our impactful case studies</div>
                    </Link>
                    <Link href="/guides" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">Guides</div>
                      <div className="text-sm text-muted-foreground">Access comprehensive guides and resources</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button variant="outline">
              <Link href={"/dashboard"}>Login</Link>
            </Button>
            <Button>
              <Link href={"/dashboard"}>Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Logo</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Features
                </Link>
                <Link href="/pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link href="/resources" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Resources
                </Link>
                <div className="pt-4">
                  <p className="mb-4 text-sm font-medium">Explore Our Pages</p>
                  <div className="grid gap-3">
                    <Link href="/about-us" className="text-sm" onClick={() => setIsOpen(false)}>
                      About Us
                    </Link>
                    <Link href="/contact" className="text-sm" onClick={() => setIsOpen(false)}>
                      Contact Us
                    </Link>
                    <Link href="/blog" className="text-sm" onClick={() => setIsOpen(false)}>
                      Blog Posts
                    </Link>
                    <Link href="/faqs" className="text-sm" onClick={() => setIsOpen(false)}>
                      FAQs
                    </Link>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="mb-4 text-sm font-medium">From Our Blog</p>
                  <div className="grid gap-3">
                    <Link href="/latest-trends" className="text-sm" onClick={() => setIsOpen(false)}>
                      Latest Trends
                    </Link>
                    <Link href="/success-stories" className="text-sm" onClick={() => setIsOpen(false)}>
                      Success Stories
                    </Link>
                    <Link href="/case-studies" className="text-sm" onClick={() => setIsOpen(false)}>
                      Case Studies
                    </Link>
                    <Link href="/guides" className="text-sm" onClick={() => setIsOpen(false)}>
                      Guides
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button onClick={() => setIsOpen(false)} className="w-full">
                    Sign up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
