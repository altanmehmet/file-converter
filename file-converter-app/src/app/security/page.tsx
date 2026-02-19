import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security & Data Protection',
  description: 'Security and Data Protection information for Quick Convert. Learn about our GDPR compliance and data security measures.',
  openGraph: {
    title: 'Security & Data Protection - Quick Convert',
    description: 'Security and Data Protection information for Quick Convert',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quickconvert.com'}/security`,
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Security & Data Protection</h1>
        <div className="space-y-4 text-slate-300">
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Data Security</h2>
            <p>
              Quick Convert is committed to protecting your data. All file processing happens locally on our secure servers. 
              Files are encrypted during transmission and stored in isolated temporary directories.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Local Processing</h2>
            <p>
              Your files are processed entirely on our servers using LibreOffice, Ghostscript, and other secure tools. 
              Files never leave our secure environment during processing and are automatically deleted after completion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Automatic Deletion</h2>
            <p>
              All uploaded files and converted outputs are automatically deleted after a configurable time period 
              (default: 10 minutes). This ensures your data is not stored longer than necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. GDPR Compliance</h2>
            <p>
              We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws. 
              We do not collect personal information beyond what is necessary for the service to function.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Right to access your data</li>
              <li>Right to deletion</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p>
              Files are retained only for the duration of processing and the configured TTL period. No files are stored 
              permanently. All data is automatically purged from our systems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Security Measures</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Secure file uploads with validation</li>
              <li>Isolated processing environments</li>
              <li>Automatic cleanup of temporary files</li>
              <li>No permanent storage of user data</li>
              <li>HTTPS encryption for all communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p>
              Under GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
            <p>
              For security concerns or data protection inquiries, please contact us through the application.
            </p>
          </section>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-200 underline">Home</Link>
            <Link href="/privacy" className="hover:text-slate-200 underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-200 underline">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-200 underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
