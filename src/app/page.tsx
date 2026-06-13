// TODO: replace with the public Chrome Web Store listing URL once approved.
export const CHROME_STORE_URL = "https://chrome.google.com/webstore/detail/tokenpilot/TODO";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TransferSection from "@/components/sections/TransferSection";
import BenchmarksSection from "@/components/sections/BenchmarksSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <TransferSection />
        <BenchmarksSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
