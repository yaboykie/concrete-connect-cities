
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConcreterSignupThankYou() {
  const navigate = useNavigate();
  const [leadCount, setLeadCount] = useState<number>(10);
  
  useEffect(() => {
    // Check if we came from the confirmation page
    const count = sessionStorage.getItem('selected_lead_count');
    if (!count) {
      // Redirect if not from confirmation
      navigate('/concretersignup');
      return;
    }
    
    setLeadCount(parseInt(count, 10));
    
    // Clean up session storage after successful sign-up flow
    return () => {
      sessionStorage.removeItem('contractor_signup_data');
      sessionStorage.removeItem('selected_lead_count');
    };
  }, [navigate]);
  
  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">🎉 You're In — Welcome to ConcreterQuotes</h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Thanks for joining the Early Bird Lead Plan.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>You'll get your first 3 homeowner leads for $3 total</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>After your 3rd lead, you'll have 24 hours to cancel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>Don't want to continue? Cancel via your dashboard or email us</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>If you cancel, any leads received during the 24-hour window will be free</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>If you stay, your selected plan ({leadCount} leads/month) will continue at $20/lead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>You can pause or cancel anytime in the future</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-3">📬 Need more help?</h2>
              <p className="text-gray-700 mb-4">
                Want an exclusive lead partnership where you get every lead in your area?
                Email us at <a href="mailto:info@concreterquotes.com" className="text-blue-600 hover:underline">info@concreterquotes.com</a> to learn more.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
