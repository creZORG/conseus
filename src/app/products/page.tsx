import { products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CatalogGenerator } from "@/components/catalog-generator";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Products & Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We provide a diverse range of high-quality products to meet the needs of various industries. Explore our categories to find what you're looking for.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <CatalogGenerator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.name} className="overflow-hidden flex flex-col">
            <div className="relative h-48 w-full">
              {product.image && (
                <Image
                  src={product.image.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  data-ai-hint={product.image.imageHint}
                />
              )}
            </div>
            <CardHeader className="flex-row items-center gap-4">
              <product.icon className="h-8 w-8 text-primary" />
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
