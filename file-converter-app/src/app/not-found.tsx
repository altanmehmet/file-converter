import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-300 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-500"
          >
            Go to Homepage
          </Link>
          <Link
            href="/privacy"
            className="rounded-lg border border-slate-600/60 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition-all"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 justify-center">
            <Link href="/" className="hover:text-slate-200 underline">Home</Link>
            <Link href="/privacy" className="hover:text-slate-200 underline">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-200 underline">Terms</Link>
            <Link href="/cookies" className="hover:text-slate-200 underline">Cookies</Link>
            <Link href="/security" className="hover:text-slate-200 underline">Security</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

