"use client";

import { useState } from "react";
import { DownloadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { companyInfo } from "@/lib/data";

export function CatalogGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    try {
      const doc = new jsPDF();
      const logoUrl = "https://i.postimg.cc/vZ7Y52Mg/image.png";

      // Asynchronously load the logo image
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = logoUrl;
      
      img.onload = () => {
          // Add Logo
          doc.addImage(img, 'PNG', 15, 10, 30, 30);
          
          // Add Company Info
          doc.setFontSize(22);
          doc.setFont("helvetica", "bold");
          doc.text(companyInfo.name, 50, 20);
          
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.text(`P.O BOX ${companyInfo.poBox}`, 50, 28);
          doc.text(companyInfo.email1, 50, 34);
          doc.text(companyInfo.email2, 50, 40);


          // Title
          doc.setFontSize(18);
          doc.setFont("helvetica", "bold");
          doc.text("Product Catalog", 15, 55);

          let y = 65; // vertical position tracker

          const catalogData: Record<string, string[]> = {
            "Foodstuffs": ["Cooking oil", "Rice", "Sugar", "Spices"],
            "Cereals": ["Beans", "Maize", "Almonds", "Peanuts"],
            "Construction materials": ["Stones", "Wood", "Concrete", "Steel", "Bricks", "Glass"],
            "Electronics": ["Laptops", "Computers", "Printers"],
            "Lab equipments": ["Test tubes", "Beakers", "Pipettes", "Fire extinguishers"],
            "Electronic materials": ["Translators", "Conductors", "Insulators"],
            "Stationary": ["Papers", "Pen", "Pencil", "Envelopes", "Notebooks", "Staples"]
          };
          
          doc.setFontSize(12);

          for (const category in catalogData) {
              if (Object.prototype.hasOwnProperty.call(catalogData, category)) {
                  if (y > 250) { // Check before adding category header
                      doc.addPage();
                      y = 20;
                  }

                  doc.setFont("helvetica", "bold");
                  doc.text(category, 15, y);
                  y += 8;

                  doc.setFont("helvetica", "normal");
                  catalogData[category].forEach(item => {
                      if (y > 270) { // Check before adding item
                          doc.addPage();
                          y = 20;
                      }
                      doc.text(`- ${item}`, 20, y);
                      y += 7;
                  });
                  y += 5; // extra spacing
              }
          }
          
          doc.save("Conquistar-Enterprises-Catalog.pdf");
          toast({
              title: "Success",
              description: "Your product catalog has been downloaded.",
          });
          setIsLoading(false);
      };

      img.onerror = () => {
        console.error("Failed to load logo for PDF.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load logo for the catalog. Please try again.",
        });
        setIsLoading(false);
      }

    } catch (error) {
      console.error("Failed to generate catalog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate product catalog. Please try again.",
      });
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
