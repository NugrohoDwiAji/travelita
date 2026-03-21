import HeroSection        from "@/app/components/templates/HeroSection/HeroSection";
import ServicesSection    from "@/app/components/templates/ServicesSection/ServicesSection";
import WhyChooseUsSection from "@/app/components/templates/WhyChooseUsSection/WhyChooseUsSection";
import DestinationsSection from "@/app/components/templates/DestinationsSection/DestinationsSection";
import ReviewsSection     from "@/app/components/templates/ReviewsSection/ReviewsSection";
import CtaFooterSection   from "@/app/components/templates/CtaFooterSection/CtaFooterSection";

export const metadata = {
  title: "Travelita – Travel & Adventure",
  description:
    "Layanan shuttle service, private car, ticketing, spear fishing, dan paket travel terbaik di Indonesia.",
};

export default function LandingPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--brand-navy-950)" }}
    >
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <DestinationsSection />
      <ReviewsSection />
      <CtaFooterSection />
    </main>
  );
}
