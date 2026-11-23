
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { announcements } from "../data/announcements";

const AnnouncementDetails = () => {
  const { slug } = useParams();

  const announcement = announcements.find(
    (item) => item.slug === slug
  );

  if (!announcement) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Announcement Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The announcement you're looking for doesn't exist.
          </p>

          <Link
            to="/#announcements"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-900 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Announcements
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link
          to="/#announcements"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-blue-900 transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Announcements
        </Link>

        {/* Article */}
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Article Header */}
          <div className="border-b border-gray-100 p-6 sm:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-900">
                {announcement.category}
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={16} />
                {announcement.date}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {announcement.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {announcement.description}
            </p>
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-10">
            <div className="space-y-6 text-base leading-8 text-gray-700">
              {announcement.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <div className="border-t border-gray-100 bg-gray-50 p-6 sm:px-10">
            <p className="font-semibold text-gray-900">
              Jamiat Tech Academy
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Empowering students through technology and education.
            </p>
          </div>

        </article>
      </div>
    </section>
  );
};

export default AnnouncementDetails;
