import { useState } from "react";
import { Link } from "react-router-dom";
import { announcements } from "../data/announcements";

const RecentAnnouncements = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleAnnouncements = showAll
    ? announcements.slice(0, 9)
    : announcements.slice(0, 3);

  return (
    <section id="announcements" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-900">
            Stay Updated
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recently Announced
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Stay informed about the latest news, announcements, events,
            and updates from Jamiat Tech Academy.
          </p>
        </div>

        {/* Announcement Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleAnnouncements.map((announcement) => (
            <Link
              key={announcement.id}
              to={`/announcements/${announcement.slug}`}
              className="block h-full"
            >
              <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                {/* Category and Date */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
                    {announcement.category}
                  </span>

                  <span className="text-xs font-medium text-gray-500">
                    {announcement.date}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-bold leading-snug text-gray-900 transition group-hover:text-blue-900">
                    {announcement.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                    {announcement.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-900 transition group-hover:gap-3">
                    Read More
                    <span aria-hidden="true">→</span>
                  </span>
                </div>

              </article>
            </Link>
          ))}
        </div>

        {/* Show More / Show Less */}
        {announcements.length > 3 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-blue-900 bg-white px-8 py-3 font-semibold text-blue-900 transition duration-300 hover:bg-blue-900 hover:text-white"
            >
              {showAll ? "Show Less" : "View All Announcements"}

              <span
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default RecentAnnouncements;