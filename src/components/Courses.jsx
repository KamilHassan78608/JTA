import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";

const INITIAL_COUNT = 3;

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const CourseCard = ({ course }) => (
  <Link to={`/courses/${course.slug}`} className="block h-full">
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <motion.img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {course.bestseller && (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-900 shadow backdrop-blur">
            Bestseller
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span>
            <i className="far fa-clock mr-1" />
            {course.duration}
          </span>
          <span>•</span>
          <span className={course.levelColor}>
            <i className="fas fa-signal mr-1" />
            {course.level}
          </span>
        </div>

        <h4 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-900">
          {course.title}
        </h4>

        <p className="mb-6 flex-1 text-sm text-gray-600">{course.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-lg font-bold text-blue-900">{course.price}</span>
          <span className="flex items-center gap-1 font-medium text-blue-900 transition group-hover:text-blue-800">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
);

const Courses = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCourses = showAll ? courses : courses.slice(0, INITIAL_COUNT);
  const canToggle = courses.length > INITIAL_COUNT;

  return (
    <section id="courses" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-900"
          >
            Our Programs
          </motion.h2>
          <motion.h3
            variants={fadeUp}
            className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl"
          >
            Featured Courses
          </motion.h3>
          <motion.p variants={fadeUp} className="text-lg text-gray-600">
            Industry-aligned curriculums designed to make you job-ready from day
            one. Choose your path to success.
          </motion.p>
        </motion.div>

        {/* Course Grid — key forces re-mount so cards re-animate on toggle */}
        <motion.div
          key={showAll ? "all" : "preview"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>

        {/* Toggle Button */}
        {canToggle && (
          <div className="mt-12 text-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={showAll}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-blue-900 bg-white px-8 py-3 font-semibold text-blue-900 transition-colors duration-300 hover:bg-blue-900 hover:text-white"
            >
              {showAll ? "Show Less" : "View All Courses"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;