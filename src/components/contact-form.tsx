"use client";

import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validação simples
    if (!data.name || data.name.length < 2) {
      toast({
        title: "Erro",
        description: "Nome deve ter pelo menos 2 caracteres.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!data.email || !data.email.includes("@")) {
      toast({
        title: "Erro",
        description: "Digite um e-mail válido.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!data.subject || data.subject.length < 5) {
      toast({
        title: "Erro",
        description: "Assunto deve ter pelo menos 5 caracteres.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!data.message || data.message.length < 10) {
      toast({
        title: "Erro",
        description: "Mensagem deve ter pelo menos 10 caracteres.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simula envio (aqui você conectaria com sua API)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Formulário enviado:", data);

    toast({
      title: "Sucesso!",
      description: "Obrigado pela sua mensagem! Entraremos em contato em breve.",
    });

    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" placeholder="Seu Nome" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Input id="subject" name="subject" placeholder="Em que podemos ajudar?" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" placeholder="Sua mensagem..." rows={5} required />
      </div>
      <div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </div>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
              Vamos Construir Juntos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tem um projeto em mente ou apenas quer saber mais sobre nossos serviços? 
              Escreva para nós. Estamos aqui para responder às suas perguntas e explorar como podemos ajudá-lo a ter sucesso.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}