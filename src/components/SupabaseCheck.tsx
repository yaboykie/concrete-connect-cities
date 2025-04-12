
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function SupabaseCheck() {
  const [status, setStatus] = useState('Checking...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log("Testing Supabase connection...");
        console.log("Supabase client config:", {
          url: import.meta.env.VITE_SUPABASE_URL ? "Configured" : "Missing",
          key: import.meta.env.VITE_SUPABASE_ANON_KEY ? "Configured (hidden)" : "Missing"
        });
        
        const { data, error } = await supabase
          .from('concrete_estimates')
          .select('*')
          .limit(5);

        if (error) {
          console.error('Supabase query error:', error);
          setStatus(`❌ Supabase Error: ${error.message}`);
          setError(error.message);
        } else if (data && data.length > 0) {
          setStatus('✅ Supabase connected and data is available!');
          setData(data);
          console.log('Data retrieved:', data);
        } else {
          setStatus('⚠️ Supabase connected, but no data found in concrete_estimates table.');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setStatus(`❌ Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
        setError(err instanceof Error ? err.message : String(err));
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white border rounded-md shadow-md max-w-3xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Supabase Health Check</h2>
      <p className={`text-md mb-4 ${status.includes('✅') ? 'text-green-600 font-semibold' : status.includes('❌') ? 'text-red-600' : 'text-yellow-600'}`}>{status}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-md font-semibold text-red-700 mb-1">Error Details:</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {data && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Sample Data:</h3>
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Connection Details:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>URL: {import.meta.env.VITE_SUPABASE_URL ? '✓ Configured' : '✗ Missing'}</li>
          <li>API Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Configured' : '✗ Missing'}</li>
          <li>Client URL: {import.meta.env.VITE_SUPABASE_URL ? '✓ Configured' : '✗ Missing'}</li>
          <li>Client Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Configured' : '✗ Missing'}</li>
        </ul>
      </div>
    </div>
  );
}
