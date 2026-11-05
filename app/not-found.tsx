import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] px-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-aura pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-md text-center">
        {/* Error Code */}
        <div className="text-8xl font-semibold gradient-text mb-4 font-display">404</div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Suggestions */}
        <div className="space-y-3 mb-8">
          <p className="text-sm text-muted-foreground">Try one of these instead:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="btn-secondary !py-2 !px-4"
            >
              Home
            </Link>
            <Link
              href="https://docs.deepfabric.dev"
              className="btn-secondary !py-2 !px-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="btn-secondary !py-2 !px-4"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          className="btn-primary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
