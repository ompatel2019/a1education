// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="responsivePad text-center py-32">
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">Page not found.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-hover transition"
      >
        Go Home
      </Link>
    </div>
  );
}
