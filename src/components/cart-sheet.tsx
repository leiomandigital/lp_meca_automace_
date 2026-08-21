import { useState } from "react";
import { ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cart-context";
import { formatarPreco } from "@/types/produto";
import { criarPedido, CheckoutError } from "@/services/checkout-service";
import { useToast } from "@/hooks/use-toast";

const paisesDDI = [
  { ddi: "+55", nome: "Brasil" },
  { ddi: "+1", nome: "Estados Unidos" },
  { ddi: "+351", nome: "Portugal" },
] as const;

const checkoutSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Digite um e-mail válido."),
  ddi: z.string().min(1, "Selecione o país."),
  telefone: z
    .string()
    .min(8, "Informe um telefone válido.")
    .regex(/^\d+$/, "Use apenas números, sem espaços ou traços."),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CartSheet() {
  const { itens, totalCentavos, removerItem } = useCart();
  const [open, setOpen] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { nome: "", email: "", ddi: "+55", telefone: "" },
  });

  const finalizarCompra = async (values: CheckoutFormValues) => {
    setEnviando(true);
    try {
      const url = await criarPedido(
        { nome: values.nome, email: values.email, telefone: { ddi: values.ddi, numero: values.telefone } },
        itens
      );
      window.location.href = url;
    } catch (error) {
      const mensagem =
        error instanceof CheckoutError
          ? error.message
          : "Erro inesperado ao finalizar a compra. Tente novamente.";
      toast({ variant: "destructive", title: "Não foi possível continuar", description: mensagem });
      setEnviando(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setMostrarFormulario(false);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itens.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
              {itens.length}
            </span>
          )}
          <span className="sr-only">Abrir carrinho</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[420px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
          <SheetDescription>
            {itens.length === 0
              ? "Nenhum fluxo adicionado ainda."
              : `${itens.length} ${itens.length === 1 ? "fluxo" : "fluxos"} no carrinho`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {itens.map((item) => (
            <div key={item.slug} className="flex items-center gap-3 border-b border-border pb-4">
              {item.imagem && (
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="h-14 w-14 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.titulo}</p>
                <p className="text-sm text-muted-foreground">{formatarPreco(item.precoCentavos)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removerItem(item.slug)}
                aria-label={`Remover ${item.titulo} do carrinho`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {itens.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatarPreco(totalCentavos)}</span>
            </div>

            {!mostrarFormulario ? (
              <Button className="w-full" onClick={() => setMostrarFormulario(true)}>
                Finalizar Compra
              </Button>
            ) : (
              <form onSubmit={form.handleSubmit(finalizarCompra)} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="checkout-nome">Nome</Label>
                  <Input id="checkout-nome" placeholder="Seu nome" {...form.register("nome")} />
                  {form.formState.errors.nome && (
                    <p className="text-xs text-destructive">{form.formState.errors.nome.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkout-email">E-mail</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    placeholder="seu@email.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkout-telefone">Telefone</Label>
                  <div className="flex gap-2">
                    <Select
                      defaultValue={form.getValues("ddi")}
                      onValueChange={(valor) => form.setValue("ddi", valor, { shouldValidate: true })}
                    >
                      <SelectTrigger className="w-[110px] flex-shrink-0">
                        <SelectValue placeholder="País" />
                      </SelectTrigger>
                      <SelectContent>
                        {paisesDDI.map((pais) => (
                          <SelectItem key={pais.ddi} value={pais.ddi}>
                            {pais.ddi} {pais.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="checkout-telefone"
                      type="tel"
                      placeholder="DDD + número"
                      {...form.register("telefone")}
                    />
                  </div>
                  {(form.formState.errors.telefone || form.formState.errors.ddi) && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.telefone?.message ?? form.formState.errors.ddi?.message}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  É para este e-mail que enviaremos o(s) fluxo(s) após a confirmação do pagamento.
                </p>
                <Button type="submit" className="w-full" disabled={enviando}>
                  {enviando ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecionando...
                    </>
                  ) : (
                    "Ir para pagamento"
                  )}
                </Button>
              </form>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
