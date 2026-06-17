'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#113af1] text-white flex items-center justify-center px-6 py-16 relative overflow-hidden selection:bg-[#E1FF00] selection:text-[#113af1]">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#E1FF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full text-center border border-white/15 bg-white/8 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20">
          <p className="text-[#E1FF00] text-sm font-semibold uppercase tracking-[0.35em]">Error</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">Something went wrong</h1>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-7 max-w-xl mx-auto">
            An unexpected error occurred. You can try again or return to the homepage.
          </p>

          <div className="mt-6 rounded-2xl border border-white/15 bg-black/10 px-4 py-3 text-left text-sm text-white/70 overflow-x-auto">
            {error.message || 'Unexpected application error'}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-[#E1FF00] px-6 py-3 font-semibold text-[#113af1] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
