import Link from "next/link";
import { companyInfo, navLinks } from "@/lib/data";
import { Logo } from "@/components/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 w-fit">
                <Logo className="h-10 w-auto" height={40} width={40} />
                <span className="font-bold text-xl font-headline">{companyInfo.name}</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">{companyInfo.slogan}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-headline">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>{companyInfo.poBox}</li>
              <li className="pt-2">
                <a href={`tel:${companyInfo.phone}`} className="hover:text-primary transition-colors">{companyInfo.phone}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {year} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
