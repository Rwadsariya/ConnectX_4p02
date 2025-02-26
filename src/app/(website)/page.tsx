import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Hero } from "@/components/v1_comp/hero";
import { Navbar } from "@/components/v1_comp/navbar";


export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <Navbar />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
    </main>
  );
}
