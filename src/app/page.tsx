import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NossaHistoria } from "@/components/NossaHistoria";
import { ReceitasDestaque } from "@/components/ReceitasDestaque";
import { ComoLevar } from "@/components/ComoLevar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NossaHistoria />
        <ReceitasDestaque />
        <ComoLevar />
      </main>
      <Footer />
    </>
  );
}
