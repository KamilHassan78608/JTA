
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { SiReact } from "react-icons/si";

const Hero = () => {
  const stats = [
    { number: "500+", label: "Students Enrolled" },
    { number: "12+", label: "Expert Instructors" },
    { number: "95%", label: "Placement Rate" },
  ];

  // Reusable animation settings
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
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-40"
    >
      {/* Background Decorative Elements */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-100 opacity-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">

          {/* Hero Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-900 shadow-sm"
            >
              🚀 Launching Careers in Tech
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Master the Future with{" "}
              <span className="bg-linear-to-r from-blue-900 to-sky-500 bg-clip-text text-transparent">
                Jameel Tech Academy
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 lg:mx-0"
            >
              Empowering the next generation of innovators. Learn highly
              sought-after skills in coding, design, and AI from industry
              experts. Your journey to a successful tech career starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href="#courses"
                className="flex transform items-center justify-center gap-2 rounded-xl bg-blue-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-1 hover:bg-blue-800"
              >
                Explore Courses
                <i className="fas fa-arrow-right text-sm"></i>
              </a>

              <a
                href="#instructors"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                Meet Instructors
              </a>
            </motion.div>

            {/* Statistics */}
            <motion.div
              variants={staggerContainer}
              className="mt-10 flex flex-wrap justify-center gap-8 border-t border-gray-200 pt-10 lg:justify-start"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.number}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative w-full max-w-lg flex-1 lg:max-w-none"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-white bg-linear-to-tr from-blue-50 to-sky-50 p-8 shadow-2xl md:aspect-4/3 lg:aspect-square">

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo985vT5Mknx2oTVgrpmkyZKFjF3WmYD0jQSwJelwkfq-Q3kjrbspnH50&s=10"
                alt="Tech Education"
                className="h-full w-full -rotate-2 rounded-xl object-cover shadow-lg transition duration-500 hover:rotate-0"
              />

              {/* Web Development Badge */}
              <motion.div
                className="absolute left-4 top-8 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <SiReact className="text-2xl" />
                </div>

                <div className="text-sm font-bold">Web Dev</div>
              </motion.div>

              {/* AI Badge */}
              <motion.div
                className="absolute bottom-12 right-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <BrainCircuit size={24} />
                </div>

                <div className="text-sm font-bold">AI & ML</div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
