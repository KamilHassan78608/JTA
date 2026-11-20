
import { motion } from "framer-motion";

const instructors = [
  {
    name: "Sarah Connor",
    role: "Lead Web Developer",
    description:
      "Ex-Google engineer with 10+ years of experience building scalable web applications. Passionate about teaching modern JS frameworks.",
    image: "https://placehold.co/200x200/cccccc/333333?text=SC",
    socials: [
      { icon: "fab fa-linkedin", hover: "hover:text-blue-700" },
      { icon: "fab fa-github", hover: "hover:text-gray-900" },
      { icon: "fab fa-twitter", hover: "hover:text-sky-500" },
    ],
  },
  {
    name: "John Doe",
    role: "AI & Data Scientist",
    description:
      "Data Science Ph.D. who has built predictive models for Fortune 500 companies. Makes complex math accessible to everyone.",
    image: "https://placehold.co/200x200/cccccc/333333?text=JD",
    topRated: true,
    socials: [
      { icon: "fab fa-linkedin", hover: "hover:text-blue-700" },
      { icon: "fab fa-github", hover: "hover:text-gray-900" },
    ],
  },
  {
    name: "Emily Chen",
    role: "Senior UX Designer",
    description:
      "Award-winning designer focusing on user psychology and accessibility. Helps students build world-class design portfolios.",
    image: "https://placehold.co/200x200/cccccc/333333?text=EC",
    socials: [
      { icon: "fab fa-linkedin", hover: "hover:text-blue-700" },
      { icon: "fab fa-dribbble", hover: "hover:text-pink-600" },
      { icon: "fab fa-behance", hover: "hover:text-blue-600" },
    ],
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

const Instructors = () => {
  return (
    <section id="instructors" className="bg-gray-50 py-20">
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
            Learn from the best
          </motion.h2>

          <motion.h3
            variants={fadeUp}
            className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl"
          >
            Meet Our Instructors
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-600"
          >
            Our faculty consists of industry veterans and tech leaders
            who bring real-world experience directly into the classroom.
          </motion.p>
        </motion.div>

        {/* Instructor Cards */}
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.name}
              variants={fadeUp}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Top Rated Badge */}
              {instructor.topRated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  className="absolute right-4 top-4 rounded bg-amber-500 px-2 py-1 text-xs font-bold text-white"
                >
                  Top Rated
                </motion.div>
              )}

              {/* Profile Image */}
              <motion.div
                className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-50 bg-gray-200"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 150,
                }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={instructor.image}
                  alt={instructor.name}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* Instructor Name */}
              <motion.h4
                variants={fadeUp}
                className="mb-1 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-900"
              >
                {instructor.name}
              </motion.h4>

              {/* Instructor Role */}
              <motion.p
                variants={fadeUp}
                className="mb-4 font-medium text-sky-500"
              >
                {instructor.role}
              </motion.p>

              {/* Instructor Description */}
              <motion.p
                variants={fadeUp}
                className="mb-6 text-sm leading-relaxed text-gray-600"
              >
                {instructor.description}
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-4 text-xl text-gray-400"
                variants={staggerContainer}
              >
                {instructor.socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    aria-label={`${instructor.name} social profile`}
                    className={`transition-colors ${social.hover}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -4,
                      scale: 1.2,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Instructors;
