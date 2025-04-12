
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'ConcreterQuotes – Instant Concrete Estimates',
  description: 'Get quotes for driveway concreting services across 600+ US cities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
