import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#113af1] text-white flex items-center justify-center px-6 py-16 relative overflow-hidden selection:bg-[#E1FF00] selection:text-[#113af1]">
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#E1FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center border border-white/15 bg-white/8 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20">
        <p className="text-[#E1FF00] text-4xl md:text-6xl font-bold uppercase tracking-[0.35em]">404</p>
        <h1 className="mt-4 text-4xl md:text-4xl font-black tracking-tight uppercase">Page not found</h1>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-7 max-w-xl mx-auto">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#E1FF00] px-6 py-3 font-semibold text-[#113af1] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            Contact me
          </Link>
        </div>
      </div>
    </main>
  );
}
