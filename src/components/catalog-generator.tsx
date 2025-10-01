"use client";

import { useState } from "react";
import { DownloadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateCatalog } from "@/app/actions";

export function CatalogGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await handleGenerateCatalog();

      if (result.success && result.data) {
        const link = document.createElement("a");
        link.href = result.data;
        link.download = "conquistar-product-catalog.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Success",
          description: "Your product catalog has been generated and downloaded.",
        });
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
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
      {isLoading ? "Generating Catalog..." : "Download Full Catalog (PDF)"}
    </Button>
  );
}
