import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function WhatsAppFloatButton() {
  return (
    <a
      href="https://wa.me/5527999509227?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Vim%20do%20seu%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
