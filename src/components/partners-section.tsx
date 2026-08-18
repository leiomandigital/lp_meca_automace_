interface Partner {
  name: string;
  logo: string;
  /** Compensa arquivos com mais espaço em branco ao redor do desenho. */
  scale?: number;
}

const partners: Partner[] = [
  { name: "Instituto DNZ", logo: "/partners/logo_institutodnz.png", scale: 1.6 },
  { name: "Dr. Luiz", logo: "/partners/logo_drluiz.webp" },
  { name: "Varanda Sem Roldanas", logo: "/partners/logo_varanda_sem_roldanas.webp" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-20 w-56 flex-shrink-0 items-center justify-center px-10">
      <img
        src={partner.logo}
        alt={partner.name}
        style={{ transform: `scale(${partner.scale ?? 1})` }}
        className="max-h-14 w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
      />
    </div>
  );
}

export function PartnersSection() {
  // Repetido bastante para garantir que a trilha seja bem mais larga que
  // a tela, mesmo em monitores grandes e com poucos parceiros cadastrados.
  const track = Array.from({ length: 20 }).flatMap(() => partners);

  return (
    <section id="partners" className="py-24 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Parceiros
          </span>
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Empresas que confiam na Meca Automace
          </h2>
        </div>

        <div
          className="partners-marquee relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="partners-track flex w-max items-center">
            {track.map((partner, i) => (
              <PartnerLogo key={i} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
