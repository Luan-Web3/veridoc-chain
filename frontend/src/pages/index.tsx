import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <div>
      <Header />
      <CallToAction />
      <HowItWorks />
      <Footer />
    </div>
  );
}