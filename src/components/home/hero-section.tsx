"use client";

import Image from "next/image";
import Link from "next/link";
import { heroSlides, companyInfo } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      <Carousel
        className="w-full h-full"
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full">
                {slide.image && (
                  <Image
                    src={slide.image.imageUrl}
                    alt={slide.image.description}
                    fill
                    className="object-cover"
                    priority={slide.id === "slide1"}
                    data-ai-hint={slide.image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>

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
