import { Linkedin, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <p className="text-sm text-primary-foreground/80 text-center">
            Desenvolvido por Meca Automace @2026
          </p>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a
                href="https://www.linkedin.com/in/leiomanaluz-diniz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a
                href="https://www.instagram.com/mecaautomace/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a
                href="https://wa.me/5527999509227?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Vim%20do%20seu%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
