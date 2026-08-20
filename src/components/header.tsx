import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { CartSheet } from "./cart-sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: "home", label: "Início" },
  { id: "projects", label: "Projetos" },
  { id: "about", label: "Sobre" },
  { id: "services", label: "Serviços" },
  { id: "contact", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <Logo />
            <span className="sr-only">MecaAutomace Início</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link to="/loja" className="font-medium text-foreground/80 hover:text-primary transition-colors">
              Loja
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <CartSheet />
            <Button asChild variant="ghost">
              <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>Solicitar Orçamento</a>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <CartSheet />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <SheetDescription className="sr-only">
                  Links de navegação do site Meca Automace
                </SheetDescription>
                {/* <div className="p-4"> */}
                  <div className="flex justify-between items-center mb-8">
                    <Logo />
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Fechar menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <Link
                      to="/loja"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                    >
                      Loja
                    </Link>
                    <Button asChild variant="default" className="mt-4">
                      <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>Solicitar Orçamento</a>
                    </Button>
                  </nav>
                {/* </div> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}