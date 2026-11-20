
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ali Mohammed",
    role: "Web Dev Alumnus",
    initials: "AM",
    avatarColor: "bg-blue-100 text-blue-900",
    rating: 5,
    review:
      "Jameel Tech Academy completely transformed my career. I went from zero coding knowledge to landing a Junior Developer role in just 4 months. The instructors genuinely care about your progress.",
  },
  {
    name: "Sara Tariq",
    role: "Product Designer",
    initials: "ST",
    avatarColor: "bg-pink-100 text-pink-600",
    rating: 5,
    review:
      "The UI/UX course was incredibly practical. Instead of just theory, we built actual case studies. My portfolio looked amazing by the end, which directly led to my current job.",
  },
  {
    name: "Omar Khan",
    role: "Data Analyst",
    initials: "OK",
    avatarColor: "bg-green-100 text-green-600",
    rating: 4.5,
    review:
      "Intense, challenging, but completely worth it. The Data Science curriculum is up-to-date with current industry standards. The community support is also fantastic.",
  },
];

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
      staggerChildren: 0.2,
    },
  },
};

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-blue-900 py-20"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            className="mb-2 text-sm font-bold uppercase tracking-wide text-sky-300"
          >
            Success Stories
          </motion.h2>

          <motion.h3
            variants={fadeUp}
            className="mb-4 text-3xl font-extrabold text-white md:text-4xl"
          >
            What Our Students Say
          </motion.h3>
        </motion.div>

        {/* Review Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className={`group rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl ${
                review.name === "Omar Khan" ? "hidden md:block" : ""
              }`}
            >
              {/* Stars */}
              <motion.div
                className="mb-4 flex text-amber-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.i
                    key={star}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, rotate: -30 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: { duration: 0.35 },
                      },
                    }}
                    className={
                      review.rating >= star
                        ? "fas fa-star"
                        : review.rating >= star - 0.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                ))}
              </motion.div>

              {/* Review Text */}
              <p className="mb-6 italic text-gray-700">
                "{review.review}"
              </p>

              {/* Student Information */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 150,
                  }}
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${review.avatarColor}`}
                >
                  {review.initials}
                </motion.div>

                <div>
                  <h5 className="font-bold text-gray-900">
                    {review.name}
                  </h5>

                  <p className="text-xs text-gray-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
