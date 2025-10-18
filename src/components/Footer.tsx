import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle size={20} />
          <p className="text-sm">
            Made for our shared room — frontend-only app. Use the same browser to keep data.
          </p>
        </div>
      </div>
    </footer>
  );
}
