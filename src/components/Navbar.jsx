
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors" },
    { name: "Reviews", href: "#reviews" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-[10px] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex cursor-pointer items-center"
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-xl font-bold text-white shadow-lg shadow-blue-900/30">
              JTA
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Jameel Tech
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-gray-600 transition-colors hover:text-blue-900"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#courses"
              className="transform rounded-full bg-blue-900 hover:bg-white hover:text-blue-900 hover:border border-blue-900 font-bold px-6 py-2.5 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:text-blue-900 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
                <div className="w-6 h-5 flex flex-col justify-between items-center">
                    <span
                    className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                    />
                    <span
                    className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "opacity-0" : ""
                    }`}
                    />
                    <span
                    className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                    />
                </div>
            </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute w-full border-t border-gray-100 bg-white shadow-xl md:hidden">
          <div className="space-y-2 px-4 pb-6 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-md px-3 py-3 text-base font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-900"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#courses"
              onClick={closeMenu}
              className="mt-4 block rounded-md bg-blue-900 px-3 py-3 text-center text-base font-medium text-white transition hover:bg-blue-800"
            >
              Enroll Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
