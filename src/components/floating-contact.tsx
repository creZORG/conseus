import { Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { companyInfo } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FloatingContact() {
  const contactLinks = [
    {
      href: `https://wa.me/${companyInfo.whatsapp}`,
      icon: MessageSquare,
      label: "WhatsApp",
      target: "_blank",
    },
    {
      href: `tel:${companyInfo.phone}`,
      icon: Phone,
      label: "Call Us",
      target: "_self",
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {contactLinks.map((link) => (
          <Tooltip key={link.label}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                target={link.target}
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <link.icon className="h-6 w-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
