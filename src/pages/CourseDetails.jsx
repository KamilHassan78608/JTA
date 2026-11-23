
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  GraduationCap,
  FolderKanban,
  Globe,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { courses } from "../data/courses";

const CourseDetails = () => {
  const { slug } = useParams();

  const course = courses.find((item) => item.slug === slug);

  const [activeModule, setActiveModule] = useState(0);

  if (!course) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Course Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          The course you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50">

      {/* Course Hero */}
      <section className="relative overflow-hidden bg-blue-950 py-20 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-800/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/#courses"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-200">
                {course.category}
              </span>

              {course.bestseller && (
                <span className="ml-2 inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-blue-950">
                  Bestseller
                </span>
              )}

              <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {course.duration}
                </span>

                <span className="flex items-center gap-2">
                  <GraduationCap size={18} />
                  {course.level}
                </span>

                <span className="flex items-center gap-2">
                  <BookOpen size={18} />
                  {course.lessons} Lessons
                </span>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/sign-up"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-bold text-blue-950 shadow-lg transition hover:bg-blue-50"
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </Link>

                <span className="text-2xl font-bold">
                  {course.price}
                </span>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">

            {/* Overview */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Course Overview
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-600">
                {course.overview}
              </p>
            </section>

            {/* Learning Outcomes */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                What You Will Learn
              </h2>

              <p className="mt-2 text-gray-600">
                By completing this course, you will be able to:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-blue-900"
                    />

                    <p className="text-sm leading-7 text-gray-600">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Course Curriculum
              </h2>

              <p className="mt-2 text-gray-600">
                Explore the modules included in this course.
              </p>

              <div className="mt-6 space-y-3">
                {course.curriculum.map((module, index) => {
                  const isOpen = activeModule === index;

                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border border-gray-200"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModule(isOpen ? -1 : index)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 bg-gray-50 p-5 text-left transition hover:bg-blue-50"
                      >
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
                            Module {index + 1}
                          </span>

                          <h3 className="mt-1 font-bold text-gray-900">
                            {module.title}
                          </h3>
                        </div>

                        {isOpen ? (
                          <ChevronUp className="shrink-0 text-blue-900" />
                        ) : (
                          <ChevronDown className="shrink-0 text-gray-500" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="space-y-3 p-5">
                          {module.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-center gap-3 text-sm text-gray-600"
                            >
                              <BookOpen
                                size={16}
                                className="text-blue-900"
                              />
                              {topic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Requirements
              </h2>

              <div className="mt-5 space-y-4">
                {course.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-1 shrink-0 text-blue-900"
                    />

                    <p className="text-sm leading-7 text-gray-600">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Article Section - Add Article Later */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-900">
                  <BookOpen size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    About This Field
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore more about {course.category}
                  </p>
                </div>
              </div>

              {course.article ? (
                <div className="prose max-w-none text-gray-600">
                  {course.article}
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 p-6 text-center">
                  <p className="font-semibold text-gray-800">
                    Course article coming soon
                  </p>

                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    An informative article about {course.title} will be
                    published here.
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Right Sidebar */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Course Information
              </h2>

              <div className="mt-6 space-y-6">

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <Clock size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {course.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <GraduationCap size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Skill Level</p>
                    <p className="font-semibold text-gray-900">
                      {course.level}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <BookOpen size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total Lessons</p>
                    <p className="font-semibold text-gray-900">
                      {course.lessons}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <FolderKanban size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Projects</p>
                    <p className="font-semibold text-gray-900">
                      {course.projects}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <Globe size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Language</p>
                    <p className="font-semibold text-gray-900">
                      {course.language}
                    </p>
                  </div>
                </div>

              </div>

              <div className="my-7 border-t border-gray-100" />

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">
                  Course Fee
                </span>

                <span className="text-2xl font-extrabold text-blue-900">
                  {course.price}
                </span>
              </div>

              <Link
                to="/sign-up"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3.5 font-bold text-white transition hover:bg-blue-800"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Create an account to get started with your learning journey.
              </p>

            </div>
          </aside>

        </div>
      </section>

    </main>
  );
};

export default CourseDetails;