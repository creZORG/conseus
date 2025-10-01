import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { missionVisionValues, timelineEvents, whyChooseUsPoints, aboutFeatures } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(img => img.id === 'about-hero');
  const teamImage = PlaceHolderImages.find(img => img.id === 'team-photo');

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold">About Conquistar</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">
              Discover our journey, our mission, and the values that drive us.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`mb-8 flex justify-between items-center w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="order-1 w-5/12 hidden md:block"></div>
                <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                  <span className="mx-auto font-semibold text-lg text-primary-foreground">{index + 1}</span>
                </div>
                <div className="order-1 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 bg-card">
                  <p className="mb-2 text-sm text-muted-foreground">{event.date}</p>
                  <h3 className="mb-3 font-bold text-lg">{event.title}</h3>
                  <p className="text-sm leading-snug tracking-wide text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values Section */}
      <section className="bg-secondary/50 py-16 sm:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Mission</h3>
                        <p className="text-muted-foreground">{missionVisionValues.mission}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Vision</h3>
                        <p className="text-muted-foreground">{missionVisionValues.vision}</p>
                    </div>
                </div>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Our Core Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {missionVisionValues.values.map(value => (
                                <li key={value} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent"/>
                                    <span className="font-medium">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              {teamImage && (
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={teamImage.imageHint}
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Meet Our Expert Team</h2>
              <p className="text-muted-foreground mb-6">
                Behind Conquistar Enterprises is a dedicated team of professionals passionate about delivering excellence. Our collective experience and commitment to our clients are the cornerstones of our success.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/contact">Get in Touch with Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
