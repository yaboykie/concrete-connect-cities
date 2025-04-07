
import { supabase } from '@/integrations/supabase/client';

export const createTestContractor = async () => {
  try {
    // Step 1: Create the user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'concretertest@concreterquotes.com',
      password: 'Test1234!',
      email_confirm: true
    });
    
    if (authError) throw authError;
    
    console.log('Auth user created:', authData.user);
    const userId = authData.user.id;
    
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
