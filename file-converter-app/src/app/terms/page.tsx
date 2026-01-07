import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Quick Convert. Read our terms and conditions for using our free file converter service.',
  openGraph: {
    title: 'Terms of Service - Quick Convert',
    description: 'Terms of Service for Quick Convert file converter',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quickconvert.com'}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4 text-slate-300">
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By using Quick Convert, you agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p>
              Quick Convert is a free, local file conversion service that processes files on your device or our server. 
              We support conversion between various file formats including PDF, Word, Excel, and images.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <p>
              You are responsible for ensuring that you have the right to convert the files you upload. You must not use 
              this service for illegal purposes or to convert copyrighted material without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. File Limits</h2>
            <p>
              Maximum file size is 150MB per file. Files are automatically deleted after processing (default: 10 minutes). 
              We are not responsible for data loss.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Service Availability</h2>
            <p>
              We strive to provide reliable service but do not guarantee 100% uptime. The service is provided "as is" 
              without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p>
              Quick Convert is not liable for any damages resulting from the use or inability to use the service, 
              including data loss or file corruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service constitutes 
              acceptance of the modified terms.
            </p>
          </section>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="/" className="hover:text-slate-200 underline">Home</a>
            <a href="/privacy" className="hover:text-slate-200 underline">Privacy Policy</a>
            <a href="/cookies" className="hover:text-slate-200 underline">Cookie Policy</a>
            <a href="/security" className="hover:text-slate-200 underline">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}

