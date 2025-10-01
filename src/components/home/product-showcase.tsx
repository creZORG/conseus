import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ProductShowcase() {
  const showcasedProducts = products.slice(0, 6); // Show first 6 categories on homepage

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Product Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From food supplies to construction materials, we offer a comprehensive range of products to meet your business needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcasedProducts.map((product) => (
            <Card key={product.name} className="overflow-hidden group flex flex-col">
              <div className="relative h-48 w-full">
                {product.image && (
                  <Image
                    src={product.image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={product.image.imageHint}
                  />
                )}
              </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href="/products">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/products">Explore All Products</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
