import { AboutSnapshot } from '@/components/home/about-snapshot';
import { HeroSection } from '@/components/home/hero-section';
import { ProductShowcase } from '@/components/home/product-showcase';
import { Testimonials } from '@/components/home/testimonials';
import { WhyChooseUs } from '@/components/home/why-choose-us';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSnapshot />
      <ProductShowcase />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
