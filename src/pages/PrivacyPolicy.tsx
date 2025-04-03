
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Privacy Policy | ConcreterQuotes.com" 
        description="Read our privacy policy to understand how we collect, use, and protect your personal information when using our concrete contractor matching service."
        canonicalUrl="/privacy-policy"
      />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Effective Date: April 3, 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <p>ConcreterQuotes.com ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our site and use our services.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect personal information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>ZIP code</li>
              <li>Project details</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Match you with relevant local concreters</li>
              <li>Share your contact details with up to 3 qualified local pros who may reach out to provide a quote</li>
              <li>Improve our platform</li>
              <li>Send service-related communications</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Sharing</h2>
            <p>We only share your information with local concreters for quoting purposes. We do not sell or rent your data to third parties for marketing.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Storage & Retention</h2>
            <p>We store your data securely (via Supabase) for as long as needed to provide services, or as required by law. You can request deletion at any time.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your data</li>
              <li>Correct errors</li>
              <li>Request deletion</li>
              <li>Withdraw consent</li>
            </ul>
            <p>Contact us via the website form to exercise these rights.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
            <p>We use cookies to improve site experience and analyze usage. You can disable cookies in your browser settings.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Remarketing & Ads</h2>
            <p>We may use third-party tools (e.g., Google Ads, Facebook Pixel) for retargeting and marketing purposes. These tools may use cookies to serve relevant ads.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer</h2>
            <p>We do not guarantee the quality of work provided by any contractor we refer. We act only as a lead referral service and are not liable for project outcomes.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Updates</h2>
            <p>We may revise this policy. Updates will be posted here with a new effective date.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
