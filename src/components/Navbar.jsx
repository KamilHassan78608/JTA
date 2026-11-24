import { useAuth, useClerk, useUser } from "@clerk/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
  if (
    !dropdownRef.current?.contains(e.target) &&
    !mobileDropdownRef.current?.contains(e.target)
  ) {
    setProfileDropDown(false);
  }
};

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setProfileDropDown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Courses", href: "courses" },
    { name: "Instructors", href: "instructors" },
    { name: "Reviews", href: "reviews" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  // Smooth scrolling without changing the URL.
  const handleScroll = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const offset = 80;
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  // Navigate to homepage sections from any route.
  const handleNavigation = (id) => {
    closeMenu();

    if (location.pathname === "/") {
      handleScroll(id);
    } else {
      navigate("/", {
        state: { scrollTo: id },
      });
    }
  };

  // Handle scrolling after navigating back to homepage.
  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (location.pathname === "/" && targetId) {
      requestAnimationFrame(() => {
        handleScroll(targetId);

        navigate("/", {
          replace: true,
          state: null,
        });
      });
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-[10px] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigation("home")}
            className="flex cursor-pointer items-center"
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-xl font-bold text-white shadow-lg shadow-blue-900/30">
              JTA
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Jamiat Tech
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => handleNavigation(link.href)}
                className="font-medium text-gray-600 transition-colors hover:text-blue-900"
              >
                {link.name}
              </button>
            ))}

            {isSignedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Original Avatar Trigger */}
                <button
                  type="button"
                  onClick={() =>
                    setProfileDropDown((prev) => !prev)
                  }
                  aria-expanded={profileDropDown}
                  aria-haspopup="menu"
                  className="flex items-center rounded-full ring-2 ring-transparent transition hover:ring-blue-900/30 focus:outline-none focus:ring-blue-900"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt={user?.fullName || "User profile"}
                  />
                </button>

                {/* Original Dropdown Menu */}
                {profileDropDown && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white py-2 shadow-xl ring-1 ring-black/5"
                  >
                    {/* User Info Header */}
                    <div className="border-b border-gray-100 px-4 py-2.5">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user?.fullName || "Student"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>

                    {/* Navigation Links */}
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/edit-profile"
                          onClick={() => setProfileDropDown(false)}
                          className="block px-4 py-2 transition hover:bg-gray-50 hover:text-blue-900"
                        >
                          Edit Profile
                        </Link>
                      </li>
                    </ul>

                    {/* Sign Out */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropDown(false);
                          signOut({ redirectUrl: "/" });
                        }}
                        className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="transform rounded-full border border-blue-900 bg-blue-900 px-6 py-2.5 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-blue-900 hover:shadow-2xl"
              >
                Enroll Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-800 transition-all duration-200 hover:bg-gray-50 hover:text-blue-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className="flex h-5 w-6 flex-col items-center justify-between">
              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
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
        <button
          key={link.name}
          type="button"
          onClick={() => handleNavigation(link.href)}
          className="block w-full rounded-md px-3 py-3 text-left text-base font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-900"
        >
          {link.name}
        </button>
      ))}

      {isSignedIn ? (
        <div
          className="relative mt-4 border-t border-gray-100 pt-4"
          ref={mobileDropdownRef}
        >
          {/* Mobile Profile Icon */}
          <button
            type="button"
            onClick={() =>
              setProfileDropDown((prev) => !prev)
            }
            aria-expanded={profileDropDown}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-full ring-2 ring-transparent transition hover:ring-blue-900/30 focus:outline-none focus:ring-blue-900"
          >
            <img
              src={user?.imageUrl || "/default-avatar.png"}
              alt={user?.fullName || "User profile"}
              className="h-10 w-10 rounded-full object-cover"
            />

            <span className="text-sm font-semibold text-gray-800">
              {user?.fullName || "My Account"}
            </span>
          </button>

          {/* Mobile Profile Dropdown */}
          {profileDropDown && (
            <div
              role="menu"
              className="mt-3 w-full rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
            >
              <div className="border-b border-gray-100 px-4 py-2.5">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {user?.fullName || "Student"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <Link
                    to="/edit-profile"
                    onClick={() => {
                      setProfileDropDown(false);
                      closeMenu();
                    }}
                    className="block px-4 py-2 transition hover:bg-gray-50 hover:text-blue-900"
                  >
                    Edit Profile
                  </Link>
                </li>
              </ul>

              <div className="border-t border-gray-100 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropDown(false);
                    closeMenu();
                    signOut({ redirectUrl: "/" });
                  }}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/sign-in"
          onClick={closeMenu}
          className="mt-4 block rounded-md bg-blue-900 px-3 py-3 text-center text-base font-medium text-white transition hover:bg-blue-800"
        >
          Enroll Now
        </Link>
      )}
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
