import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} MecaAutomace Inc. Todos os direitos reservados.
          </p>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="#" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
