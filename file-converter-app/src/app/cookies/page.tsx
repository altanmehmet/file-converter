import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Quick Convert. Learn about how we use cookies and manage your cookie preferences.',
  openGraph: {
    title: 'Cookie Policy - Quick Convert',
    description: 'Cookie Policy for Quick Convert file converter',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quickconvert.com'}/cookies`,
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <div className="space-y-4 text-slate-300">
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used 
              to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
            <p>
              Quick Convert uses minimal cookies and local storage for essential functionality:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Language Preference:</strong> Stored in localStorage to remember your language selection</li>
              <li><strong>Analytics:</strong> Google Analytics cookies to understand how visitors use our site (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Essential Cookies</h3>
                <p className="text-sm">
                  These cookies are necessary for the website to function properly. They cannot be disabled.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Analytics Cookies</h3>
                <p className="text-sm">
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. You can opt out of these cookies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies 
              can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <p className="mt-2">
              Most browsers automatically accept cookies, but you can modify your browser settings to decline cookies 
              if you prefer. You can also delete cookies that have already been set.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Cookies</h2>
            <p>
              We use Google Analytics to analyze website traffic. Google Analytics uses cookies to collect information 
              about how visitors use our site. This information is used to compile reports and help us improve the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us through the application.
            </p>
          </section>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="/" className="hover:text-slate-200 underline">Home</a>
            <a href="/privacy" className="hover:text-slate-200 underline">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-200 underline">Terms of Service</a>
            <a href="/security" className="hover:text-slate-200 underline">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}

