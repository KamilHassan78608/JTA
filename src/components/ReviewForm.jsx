
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setRatingError(true);
      return;
    }

    setRatingError(false);

    // Form validation passed.
    // Connect your backend/API here to save the review.

    setShowSuccess(true);
    e.currentTarget.reset();
  };

  const resetForm = () => {
    setRating(0);
    setRatingError(false);
    setShowSuccess(false);
  };

  return (
    <section className="border-b border-gray-200 bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg sm:rounded-3xl"
        >
          <div className="grid md:grid-cols-5">
            {/* Information Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center bg-linear-to-br from-blue-900 to-blue-800 p-6 text-white sm:p-8 md:col-span-2 lg:p-10"
            >
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-3 text-xl font-bold sm:text-2xl"
              >
                Share Your Experience
              </motion.h3>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mb-6 text-sm leading-relaxed text-blue-100 sm:mb-8"
              >
                Your feedback helps us improve and helps future students make
                the right choice. Let us know how your learning journey at JTA
                went!
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 text-sm text-blue-100"
              >
                {["Takes 2 minutes", "Featured on our site"].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <i className="fas fa-check-circle text-sky-400" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Form Side */}
            <div className="relative p-5 sm:p-8 md:col-span-3 lg:p-10">
              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 p-6 text-center backdrop-blur-sm sm:p-8"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                      }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-500"
                    >
                      <i className="fas fa-check" />
                    </motion.div>

                    <motion.h4
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl"
                    >
                      Review Submitted!
                    </motion.h4>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base"
                    >
                      Thank you for sharing your experience at Jameel Tech
                      Academy.
                    </motion.p>

                    <motion.button
                      type="button"
                      onClick={resetForm}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="min-h-11 rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-800 transition hover:bg-gray-200"
                    >
                      Submit Another
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Review Form */}
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-6"
              >
                {/* Name and Course */}
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 sm:text-base"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Course Completed
                    </label>

                    <select
                      name="course"
                      required
                      defaultValue=""
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 sm:text-base"
                    >
                      <option value="" disabled>
                        Select a course...
                      </option>
                      <option value="web">Web Development</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="data">Data Science & AI</option>
                    </select>
                  </div>
                </motion.div>

                {/* Star Rating */}
                <motion.div variants={fadeUp}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rating
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star);
                          setRatingError(false);
                        }}
                        aria-label={`Rate ${star} out of 5`}
                        aria-pressed={rating === star}
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        whileTap={{ scale: 0.85 }}
                        animate={{
                          scale: rating >= star ? 1.1 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`flex h-10 w-10 items-center justify-center text-xl ${
                          rating >= star
                            ? "text-amber-500"
                            : "text-gray-300 hover:text-amber-500"
                        }`}
                      >
                        <i className="fas fa-star" />
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {ratingError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-2 text-xs text-red-500"
                      >
                        Please select a rating.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Review Text */}
                <motion.div variants={fadeUp}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Review
                  </label>

                  <textarea
                    name="review"
                    required
                    rows="4"
                    placeholder="Tell us what you liked about the course..."
                    className="min-h-36 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 sm:text-base"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={fadeUp}
                  type="submit"
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="min-h-12 w-full transform rounded-lg bg-blue-900 px-4 py-3 font-bold text-white shadow-md transition-colors duration-300 hover:bg-blue-800"
                >
                  Submit Review
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
