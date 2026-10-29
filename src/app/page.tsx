import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { Workflow } from "@/components/sections/Workflow";
import { IdeAccess } from "@/components/sections/IdeAccess";
import { Chain } from "@/components/sections/Chain";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Affiliate } from "@/components/sections/Affiliate";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div aria-hidden="true" className="container-x">
          <div className="divider-soft" />
        </div>
        <ProductExplorer />
        <div aria-hidden="true" className="container-x">
          <div className="divider-soft" />
        </div>
        <Workflow />
        <IdeAccess />
        <Chain />
        <div aria-hidden="true" className="container-x">
          <div className="divider-soft" />
        </div>
        <About />
        <Team />
        <Affiliate />
        <div aria-hidden="true" className="container-x">
          <div className="divider-soft" />
        </div>
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
