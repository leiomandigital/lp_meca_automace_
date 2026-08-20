import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";
import { CartProvider } from "@/context/cart-context";
import { HomePage } from "@/pages/home-page";
import { LojaPage } from "@/pages/loja-page";
import { ProdutoPage } from "@/pages/produto-page";
import { ObrigadoPage } from "@/pages/obrigado-page";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loja" element={<LojaPage />} />
            <Route path="/loja/obrigado" element={<ObrigadoPage />} />
            <Route path="/loja/:slug" element={<ProdutoPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
        <WhatsAppFloatButton />
      </CartProvider>
    </BrowserRouter>
  );
}
