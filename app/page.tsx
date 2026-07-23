import Header from "./components/Header";
import AudienceModules from "./components/landing/AudienceModules";
import CareerJourney from "./components/landing/CareerJourney";
import ClosingCTA from "./components/landing/ClosingCTA";
import ContentsNav from "./components/landing/ContentsNav";
import Footer from "./components/landing/Footer";
import ForCandidates from "./components/landing/ForCandidates";
import ForEmployers from "./components/landing/ForEmployers";
import Hero from "./components/landing/Hero";
import ScrollProgress from "./components/landing/ScrollProgress";
import TrustInfrastructure from "./components/landing/TrustInfrastructure";
import VisionPillars from "./components/landing/VisionPillars";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustInfrastructure />
        <ContentsNav />
        <VisionPillars />
        <CareerJourney />
        <ForCandidates />
        <ForEmployers />
        <AudienceModules />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
