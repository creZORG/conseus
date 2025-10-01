import { aboutFeatures, companyInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSnapshot() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Welcome to {companyInfo.name}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Founded in 2024, we are a premier supply company dedicated to providing top-quality products across various sectors. Our mission is to be your most reliable partner, ensuring excellence in every shipment.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutFeatures.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
