import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { contactMethods, companyInfo } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-location');

  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                We're here to help. Whether you have a question about our products, need a quote, or want to discuss a partnership, we'd love to hear from you.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-card p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-card p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                    {contactMethods.map(method => (
                        <div key={method.label} className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full">
                                <method.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{method.label}</h3>
                                {method.href ? (
                                    <Link href={method.href} className="text-muted-foreground hover:text-primary transition-colors block">
                                        {method.value}
                                    </Link>
                                ) : (
                                    <p className="text-muted-foreground">{method.value}</p>
                                )}
                                {method.label === "Email" && (
                                     <Link href={`mailto:${companyInfo.altEmail}`} className="text-muted-foreground hover:text-primary transition-colors block">
                                         {companyInfo.altEmail}
                                     </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-secondary mt-12">
        {mapImage && (
            <Image 
                src={mapImage.imageUrl}
                alt="Map showing office location"
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-2xl">
                <h3 className="text-2xl font-bold">Our Office</h3>
                <p className="text-muted-foreground mt-2">{companyInfo.poBox}</p>
            </div>
        </div>
      </div>
    </>
  );
}
