import { Home, Wallet, User } from "lucide-react";
import { useAuth } from "~/contexts/auth";
import { useLocation } from "react-router"; // or your routing solution

export default function MobileNavbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Paths where navbar should be hidden
  const hiddenPaths = ['/login', '/register'];
  const shouldHide = hiddenPaths.includes(location.pathname);

  if (!user || shouldHide) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 md:hidden z-50">
      {/* Dark navbar background */}
      <nav className="h-full bg-gray-900 border-t border-gray-700 flex justify-around items-center px-2 relative">
        {/* Home button */}
        <a
          href="/"
          className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-0.5">Home</span>
        </a>

        {/* Spacer for the middle button */}
        <div className="w-16"></div>

        {/* Profile button */}
        <a
          href="/profile"
          className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-0.5">Profile</span>
        </a>
      </nav>

      {/* Middle Wallet button that overlaps */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <a
          href="/wallet"
          className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full border-4 border-gray-900 hover:bg-blue-500 transition-colors shadow-lg"
        >
          <Wallet className="h-6 w-6 text-white" />
        </a>
      </div>
    </div>
  );
}