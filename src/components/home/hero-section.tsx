import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      <Image
        src="https://i.postimg.cc/XYxvT1hF/image.png"
        alt="A large cargo ship on the ocean at sunset, representing global shipments."
        fill
        className="object-cover"
        priority
        data-ai-hint="cargo ship"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
            {companyInfo.slogan}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
            Your trusted partner in sourcing and supplying quality goods across various industries.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
