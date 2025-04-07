
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; userId?: string; error?: any } | null>(null);

  const createTestContractor = async () => {
    try {
      // Step 1: Create the user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'concretertest@concreterquotes.com',
        password: 'Test1234!'
      });
      
      if (authError) throw authError;
      
      console.log('Auth user created:', authData.user);
      const userId = authData.user?.id;
      
      if (!userId) {
        throw new Error('User ID not returned from auth signup');
      }
      
      // Step 2: Update the placeholder UUID in contractor_signups
      const { error: contractorUpdateError } = await supabase
        .from('contractor_signups')
        .update({ id: userId })
        .eq('email', 'concretertest@concreterquotes.com');
      
      if (contractorUpdateError) throw contractorUpdateError;
      console.log('Updated contractor_signups with actual UUID');
      
      // Step 3: Update the placeholder UUID in campaigns
      const { error: campaignUpdateError } = await supabase
        .from('campaigns')
        .update({ contractor_id: userId })
        .eq('contractor_id', '00000000-0000-0000-0000-000000000000');
      
      if (campaignUpdateError) throw campaignUpdateError;
      console.log('Updated campaigns with actual UUID');
      
      return { success: true, userId };
    } catch (error) {
      console.error('Error creating test contractor:', error);
      return { success: false, error };
    }
  };

  const handleCreateTestContractor = async () => {
    setLoading(true);
    try {
      const result = await createTestContractor();
      setResult(result);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Test contractor account created successfully. You may need to check your email for verification.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create test contractor account",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      setResult({ success: false, error });
      toast({
        title: "Error",
        description: "Failed to create test contractor account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Setup | ConcreterQuotes.com</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-10 min-h-[70vh]">
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Setup</CardTitle>
              <CardDescription>Create a test contractor account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h3 className="text-amber-800 font-semibold">Warning</h3>
                <p className="text-amber-700">This utility is for testing purposes only. It will create a test contractor account:</p>
                <ul className="list-disc pl-5 mt-2 text-amber-700">
                  <li>Email: concretertest@concreterquotes.com</li>
                  <li>Password: Test1234!</li>
                  <li>Name: Concreter Test</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleCreateTestContractor} 
                disabled={loading} 
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Test Account...
                  </>
                ) : (
                  'Create Test Contractor Account'
                )}
              </Button>
              
              {result && (
                <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <h3 className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.success ? 'Success!' : 'Error'}
                  </h3>
                  {result.success ? (
                    <p className="text-green-700">
                      Test contractor account created with ID: {result.userId}
                    </p>
                  ) : (
                    <p className="text-red-700">
                      Failed to create test contractor account: {JSON.stringify(result.error)}
                    </p>
                  )}
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-blue-800 font-semibold">Note</h3>
                <p className="text-blue-700">
                  If email confirmation is enabled in your Supabase project, you'll need to:
                </p>
                <ol className="list-decimal pl-5 mt-2 text-blue-700 space-y-1">
                  <li>Check the inbox for concretertest@concreterquotes.com</li>
                  <li>Click the confirmation link</li>
                  <li>Or disable email confirmation in Supabase Authentication settings</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminSetup;
