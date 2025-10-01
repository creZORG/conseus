import Image from "next/image";
import { certifications } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CertificationsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Certifications</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are committed to the highest standards of quality and compliance. Our certifications are a testament to our dedication to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {certifications.map((cert) => (
          <Card key={cert.name} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative aspect-[5/7] bg-secondary/50">
                {cert.image && (
                  <Image
                    src={cert.image.imageUrl}
                    alt={cert.name}
                    fill
                    className="object-contain p-4 sm:p-8 transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={cert.image.imageHint}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start p-6 bg-secondary/20">
              <h3 className="font-semibold text-lg">{cert.name}</h3>
              <p className="text-muted-foreground mt-2">{cert.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
