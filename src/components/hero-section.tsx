import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-background.jpg"
          alt="Automação inteligente"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-background/70" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 pt-24 text-center sm:pt-0 max-w-full">

          <h1 className="hero-animate hero-delay-1 font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Da Ideia à Automação.
          </h1>

          <p className="hero-animate hero-delay-2 mt-6 max-w-2xl mx-auto text-lg text-white/90 sm:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Soluções Low-Code, IA e desenvolvimento Full Stack para negócios
            que precisam crescer sem travar.
          </p>

          <div className="hero-animate hero-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-x-6">
            <Button
              size="lg"
              className="btn-pulse w-full sm:w-auto px-8 text-base font-semibold"
              asChild
            >
              <a href="#contact">Contratar Serviço</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 text-white backdrop-blur-sm border-white/20 hover:bg-white/20 w-full sm:w-auto px-8 text-base"
            >
              <a href="#projects">Ver Projetos</a>
            </Button>
          </div>


</div>
      </div>
    </section>
  );
}
