import Image from "next/image";
import { AboutUsSection, HeroSection, WhyChooseSection, HowItWorksSection, BenefitsSection } from "./components";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Benefits Section */}
      <BenefitsSection />
    </>
  );
}

