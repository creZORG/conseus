import Image from "next/image";
import { whyChooseUsPoints } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";

export function WhyChooseUs() {
    const whyChooseUsImage = PlaceHolderImages.find(p => p.id === 'why-choose-us');

  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video w-full h-full rounded-lg overflow-hidden shadow-lg">
            {whyChooseUsImage && (
                <Image
                    src={whyChooseUsImage.imageUrl}
                    alt={whyChooseUsImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={whyChooseUsImage.imageHint}
                />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">Why Partner with Conquistar?</h2>
            <p className="text-muted-foreground mb-8">
                Choosing the right supplier is critical for your success. We are more than just a vendor; we are a partner invested in your growth. Here's what sets us apart:
            </p>
            <ul className="space-y-4">
                {whyChooseUsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
