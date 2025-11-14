import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Sarah Johnson",
    role: "CEO, Innovate Inc.",
    quote: "MecaAutomace transformed our production line. We've seen a 40% increase in efficiency and a significant reduction in errors. It's a game-changer.",
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-1')
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    role: "Operations Manager, Tech Solutions",
    quote: "The implementation was seamless, and their support team is top-notch. Our team was able to adapt to the new system in days, not weeks.",
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-2')
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    role: "Founder, QuickShip Logistics",
    quote: "As a startup, we needed a scalable solution. MecaAutomace provided exactly that. Their Pro plan has grown with us every step of the way.",
    avatar: PlaceHolderImages.find(p => p.id === 'testimonial-3')
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Loved by Businesses Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-start justify-between p-6 h-full">
                      <blockquote className="text-lg italic text-foreground mb-6 border-l-4 border-accent pl-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4 mt-auto">
                        <Avatar>
                          {testimonial.avatar && (
                            <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                          )}
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
