import React, { useState, useRef, useEffect } from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowDown, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitEmail, setExitEmail] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Track scroll position to trigger exit intent modal
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(scrollPercentage);
      
      // Show exit intent modal when user scrolls past 50% and hasn't submitted
      if (scrollPercentage > 50 && !localStorage.getItem('exitModalShown')) {
        setShowExitModal(true);
        localStorage.setItem('exitModalShown', 'true');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleExitEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the email to your backend
    setShowExitModal(false);
    // Show success toast
    toast({
      title: "Email Sent",
      description: `We've sent your estimate to ${exitEmail}`,
      variant: "success",
      duration: 5000
    });
    setExitEmail('');
  };

  return (
    <main className="flex-grow">
      {/* ROW 1 – HERO SECTION */}
      <section className="bg-white py-16 px-4 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <ClipboardCheck className="h-12 w-12 text-brand-blue" />
          </div>
          
          <h1 className="text-4xl font-bold text-center mb-4 max-w-3xl mx-auto">
            Check Driveway Concrete Costs in Your Area — Instantly
          </h1>
          
          <p className="text-lg text-center text-gray-600 max-w-xl mx-auto mb-4">
            Use our free tool to see what other homeowners are paying — based on real jobs, finish type, and your location.
            No calls. No chasing tradies. Just clear cost info before you get quotes.
          </p>
          
          <p className="text-sm text-center text-gray-500 mb-6">
            Know what concrete should cost — before speaking to anyone.
          </p>
          
          <Button 
            onClick={scrollToCalculator}
            className="text-lg px-6 py-3 mx-auto block bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            Check My Driveway Cost <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-xs text-center text-gray-400 mt-2">
            Takes 30 seconds. No pressure.
          </p>
        </div>
      </section>
      
      {/* ROW 2 – CALCULATOR SECTION */}
      <section className="bg-gray-50 py-12 px-4" ref={calculatorRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Value framing and trust building */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-2">
                  Wondering What You Should Actually Pay for a Driveway?
                </h2>
                <p className="text-gray-700 mb-4 max-w-md">
                  Use real project data from concreters in your area to estimate your driveway cost — based on your state, finish type, and job size.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>Based on 2025 pricing in Texas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>Not a quote — no calls, no spam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>Takes less than 30 seconds</span>
                  </li>
                </ul>
              </div>

              {/* Benefits Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Why Smart Homeowners Are Upgrading Their Concrete Now — Not Later
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>Cracked, uneven driveways are trip hazards and eyesores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>Water pooling near your slab can cause long-term damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>New concrete adds visual appeal and long-term value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>According to Forbes, a new driveway can increase your home's value by $5,000–$7,000</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Calculator */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                🎯 Your Texas Driveway Estimate
              </h3>
              <StateDrivewayCalculator 
                stateName="tx"
                estimateDisclaimer="These estimates are based on real project data from our network of concrete contractors."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 3 – Belief Injector */}
      <section className="bg-white py-8 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-sm text-gray-700 mt-4">
            Homeowners tell us the hardest part of any concrete job is knowing what's fair.
          </p>

          <p className="text-sm text-gray-700">
            That's why this estimate uses real pricing from concreters we already work with — filtered by your state, job type, and finish.
          </p>

          <p className="text-sm text-gray-700">
            No one's quoting your job here. We're just showing you what homeowners nearby are actually paying — so you're not guessing.
          </p>
        </div>
      </section>
      
      {/* SECTION 4 – Why Concrete Is Worth It */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900">
            Why Smart Homeowners Are Upgrading Their Concrete Now — Not Later
          </h2>

          <ul className="mt-4 space-y-2 text-base text-gray-700">
            <li>✔ Cracked, uneven driveways are trip hazards and eyesores</li>
            <li>✔ Water pooling near your slab can cause long-term damage</li>
            <li>✔ New concrete adds visual appeal and long-term value</li>
            <li>✔ According to Forbes, a new driveway can increase your home's value by $5,000–$7,000</li>
          </ul>
        </div>
      </section>
      
      {/* SECTION 5 – Concreter Trust Layer */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900">
            We Only Partner With the Best Local Concreters
          </h2>

          <p className="mt-3 text-base text-gray-700">
            Every concreter on our platform has been rated at least 4.7 stars on Google — and has completed high-quality work for homeowners in your area.
          </p>

          <p className="mt-2 text-base text-gray-700">
            We vet workmanship, reliability, and clean-up quality before allowing them to receive quote requests.
          </p>
        </div>
      </section>
      
      {/* SECTION 6 – Ease & Speed Layer */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900">
            Don't Waste Hours Calling Around — We Do the Heavy Lifting
          </h2>

          <p className="mt-3 text-base text-gray-700">
            No chasing. No voicemails. No one telling you they're booked until next month.
          </p>

          <p className="mt-2 text-base text-gray-700">
            Once you get your estimate, you can choose to receive quotes from 2–3 top-rated concreters who are actually available — many respond same-day.
          </p>
        </div>
      </section>
      
      {/* SECTION 7 – Emotional Closer */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-gray-700 mt-6 text-center max-w-xl mx-auto">
            Most homeowners don't replace their driveway because they want to — they do it because it's time.
          </p>

          <p className="text-sm text-gray-700 mt-2 text-center max-w-xl mx-auto">
            If you're here, it probably means that moment's come. We'll help you move forward — starting with what a fair price actually looks like.
          </p>
        </div>
      </section>
      
      {/* SECTION 8 – Testimonials */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            Real Homeowners. Real Projects. No Guesswork.
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-800">
                "I was getting quotes from $6,000 to $14,000 for the same driveway. ConcreterQuotes showed me what was actually normal in my area — and matched me with two concreters who didn't play games. We had the job booked in 48 hours."
              </p>
              <p className="mt-2 text-xs text-gray-500 italic">
                — Jennifer M., Austin, TX
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-800">
                "I'd put off replacing our slab for years because I didn't know where to start. Within 15 minutes I had a price range, and by the end of the day I had a quote. No chasing. No voicemails."
              </p>
              <p className="mt-2 text-xs text-gray-500 italic">
                — Daniel R., Charlotte, NC
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-800">
                "Everyone says they'll get back to you. These guys actually did — fast. I picked the concreter who explained everything in detail and showed up when he said he would."
              </p>
              <p className="mt-2 text-xs text-gray-500 italic">
                — Melissa G., Sacramento, CA
              </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-800">
                "I'm not a contractor. I didn't want to guess at the price or get talked down. The estimate made it simple. The contractor did exactly what he said he'd do."
              </p>
              <p className="mt-2 text-xs text-gray-500 italic">
                — Ahmed H., Tampa, FL
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 9 – Final CTA Block */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-black text-white p-6 rounded-xl text-center space-y-3">
            <h2 className="text-2xl font-bold">Ready to See What It'll Cost?</h2>
            <p className="text-sm text-gray-300">
              Start with your instant estimate. If it looks right, we'll connect you to the right concreters — no pressure.
            </p>
            <Button 
              onClick={scrollToCalculator}
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
            >
              Get My Local Estimate
            </Button>
          </div>
        </div>
      </section>
      
      {/* Exit-Intent Modal */}
      <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Want to Keep Your Estimate?</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleExitEmailSubmit} className="space-y-4">
            <p className="mt-2 text-sm text-gray-700">
              If you're not ready to get quotes yet, we can email you your estimate so you have it on hand — no pressure, no spam.
            </p>
            <Input 
              type="email" 
              placeholder="Your email" 
              value={exitEmail}
              onChange={(e) => setExitEmail(e.target.value)}
              className="mt-3 w-full border p-2 rounded-md" 
              required
            />
            <Button type="submit" className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Send My Estimate
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Home;
