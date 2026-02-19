import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Quick Convert. Learn how we protect your data and handle file conversions securely.',
  openGraph: {
    title: 'Privacy Policy - Quick Convert',
    description: 'Privacy Policy for Quick Convert file converter',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quickconvert.com'}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-slate-300">
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p>
              Quick Convert processes files locally on your device. We do not collect, store, or transmit your files to external servers. 
              All file conversions happen entirely on your local machine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Local Processing</h2>
            <p>
              All file conversions are performed locally using LibreOffice, Ghostscript, and other local tools. 
              Your files never leave your device or our server during processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Temporary Storage</h2>
            <p>
              Files are temporarily stored on our server for processing purposes only. All files are automatically deleted 
              after a configurable time period (default: 10 minutes). You can adjust this in the settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies and Local Storage</h2>
            <p>
              We use localStorage to remember your language preference. We do not use tracking cookies or collect 
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies and collect data according to 
              their privacy policy. You can opt out of personalized ads through Google&apos;s ad settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. GDPR Rights</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have certain data protection rights:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>The right to access, update, or delete your personal information</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through the application.
            </p>
          </section>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-200 underline">Home</Link>
            <Link href="/terms" className="hover:text-slate-200 underline">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-200 underline">Cookie Policy</Link>
            <Link href="/security" className="hover:text-slate-200 underline">Security</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
