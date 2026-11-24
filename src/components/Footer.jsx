const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "All Courses", href: "#courses" },
    { name: "Our Faculty", href: "#instructors" },
    { name: "Student Stories", href: "#reviews" },
  ];

  const socials = [
    {
      icon: "fab fa-facebook-f",
      hover: "hover:bg-blue-600",
      label: "Facebook",
    },
    {
      icon: "fab fa-twitter",
      hover: "hover:bg-sky-500",
      label: "Twitter",
    },
    {
      icon: "fab fa-instagram",
      hover: "hover:bg-pink-600",
      label: "Instagram",
    },
    {
      icon: "fab fa-linkedin-in",
      hover: "hover:bg-blue-700",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8 grid grid-cols-1 gap-8 border-b border-gray-800 pb-8 md:grid-cols-4">

          {/* Academy Information */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-blue-900 text-sm font-bold text-white">
                JTA
              </div>

              <span className="text-xl font-bold text-white">
                Jameel Tech Academy
              </span>
            </div>

            <p className="mb-6 max-w-sm text-sm text-gray-400">
              Building the tech leaders of tomorrow through practical,
              intensive, and industry-led educational programs.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition-colors ${social.hover}`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-bold text-white">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4 font-bold text-white">
              Contact
            </h4>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <i className="fas fa-map-marker-alt mr-2 w-4 text-center"></i>
                UET Peshawar
              </li>

              <li>
                <i className="fas fa-envelope mr-2 w-4 text-center"></i>
                yahyakhanwardag12@gmail.com
              </li>

              <li>
                <i className="fas fa-phone mr-2 w-4 text-center"></i>
                +92 340 9478627
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          © 2026 Jamiat Tech Academy. All rights reserved. Concept Design.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
