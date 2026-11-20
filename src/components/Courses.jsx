
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Full-Stack Web Engineering",
    description:
      "Master React, Node.js, and databases. Build real-world applications and prepare for a career as a modern software engineer.",
    image:
      "https://placehold.co/600x400/2563eb/ffffff?text=Web+Development",
    duration: "12 Weeks",
    level: "Beginner",
    price: "$499",
    levelColor: "text-green-500",
    bestseller: true,
  },
  {
    title: "UI/UX Design Masterclass",
    description:
      "Learn Figma, user research, wireframing, and prototyping. Create stunning digital experiences that users love.",
    image:
      "https://placehold.co/600x400/0ea5e9/ffffff?text=UI/UX+Design",
    duration: "8 Weeks",
    level: "Intermediate",
    price: "$399",
    levelColor: "text-yellow-500",
    bestseller: false,
  },
  {
    title: "Data Science & AI Applied",
    description:
      "Dive deep into Python, Machine Learning, neural networks, and data visualization tools to extract insights from complex data.",
    image:
      "https://placehold.co/600x400/8b5cf6/ffffff?text=Data+Science",
    duration: "16 Weeks",
    level: "Advanced",
    price: "$599",
    levelColor: "text-red-500",
    bestseller: false,
  },
];

// Animation variants
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Courses = () => {
  return (
    <section id="courses" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
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

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-600"
          >
            Industry-aligned curriculums designed to make you job-ready
            from day one. Choose your path to success.
          </motion.p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.title}
              variants={fadeUp}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {course.bestseller && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-900 shadow backdrop-blur"
                  >
                    Bestseller
                  </motion.div>
                )}
              </div>

              {/* Course Details */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <span>
                    <i className="far fa-clock mr-1"></i>
                    {course.duration}
                  </span>

                  <span>•</span>

                  <span className={course.levelColor}>
                    <i className="fas fa-signal mr-1"></i>
                    {course.level}
                  </span>
                </div>

                <h4 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-900">
                  {course.title}
                </h4>

                <p className="mb-6 flex-1 text-sm text-gray-600">
                  {course.description}
                </p>

                {/* Price and Syllabus */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-lg font-bold text-blue-900">
                    {course.price}
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1 font-medium text-blue-900 transition hover:text-blue-800"
                  >
                    <ArrowRight />
                    <motion.i
                      className="fas fa-arrow-right text-xs"
                      whileHover={{ x: 5 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Courses */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-full border-2 border-blue-900 bg-white px-8 py-3 font-semibold text-blue-900 transition-colors duration-300 hover:bg-blue-900 hover:text-white"
          >
            View All Courses
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default Courses;
