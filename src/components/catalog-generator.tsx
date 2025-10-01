"use client";

import { useState } from "react";
import { DownloadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

export function CatalogGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(22);
      doc.text("Product Catalog", 20, 20);

      doc.setFontSize(16);
      let y = 40; // vertical position tracker

      // Catalog Data
      const catalog: Record<string, string[]> = {
        "Foodstuffs": ["Cooking oil", "Rice", "Sugar", "Spices"],
        "Cereals": ["Beans", "Maize", "Almonds", "Peanuts"],
        "Construction materials": ["Stones", "Wood", "Concrete", "Steel", "Bricks", "Glass"],
        "Electronics": ["Laptops", "Computers", "Printers"],
        "Lab equipments": ["Test tubes", "Beakers", "Pipettes", "Fire extinguishers"],
        "Electronic materials": ["Translators", "Conductors", "Insulators"],
        "Stationary": ["Papers", "Pen", "Pencil", "Envelopes", "Notebooks", "Staples"]
      };

      // Loop through each category
      for (const category in catalog) {
        if (Object.prototype.hasOwnProperty.call(catalog, category)) {
            doc.setFont("helvetica", "bold");
            doc.text(category + ":", 20, y);
            y += 10;

            doc.setFont("helvetica", "normal");
            catalog[category].forEach(item => {
                // If page overflows, create a new page
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                    doc.setFont("helvetica", "bold");
                    doc.text(category + ": (continued)", 20, y);
                    y += 10;
                    doc.setFont("helvetica", "normal");
                }
                doc.text("- " + item, 30, y);
                y += 8;
            });

            y += 6; // extra spacing between categories
        }
      }

      // Download the PDF
      doc.save("catalog.pdf");
      toast({
          title: "Success",
          description: "Your product catalog has been downloaded.",
      });

    } catch (error) {
      console.error("Failed to generate catalog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate product catalog. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={onGenerate} disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <DownloadCloud className="mr-2 h-5 w-5" />
      )}
      {isLoading ? "Generating Catalog..." : "Download Catalog PDF"}
    </Button>
  );
}
