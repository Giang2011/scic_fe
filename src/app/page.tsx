import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Rules from '@/components/Rules';
import Timeline from '@/components/Timeline';
import Awards from '@/components/Awards';
import Judges from '@/components/Judges';
import News from '@/components/News';
import FAQ from '@/components/FAQ';
import Sponsors from '@/components/Sponsors';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Rules Section */}
      <Rules />

      {/* Timeline Section */}
      <Timeline />

      {/* Awards Section */}
      <Awards />

      {/* Judges Section */}
      <Judges />

      {/* News Section */}
      <News />

      {/* FAQ Section */}
      <FAQ />

      {/* Sponsors Section */}
      <Sponsors />

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
}
