
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth, useSignUp } from "@clerk/react";

const SignUp = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent duplicate requests
  const submitInProgress = useRef(false);
  const verifyInProgress = useRef(false);

  const isLoading = fetchStatus === "fetching" || isProcessing;

  // Extract Clerk errors
  const getErrorMessage = (error) => {
    return (
      error?.errors?.[0]?.longMessage ||
      error?.errors?.[0]?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  // Finalize registration and create session
  const finalizeSignUp = async () => {
    const { error } = await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          setErrorMessage(
            "Your account requires an additional step before you can continue."
          );
          return;
        }

        const url = decorateUrl("/");

        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          navigate(url, { replace: true });
        }
      },
    });

    if (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  // Step 1: Create account and send verification code
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (submitInProgress.current) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !emailAddress.trim() ||
      !password
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    submitInProgress.current = true;
    setIsProcessing(true);

    try {
      // Create Clerk sign-up
      const { error } = await signUp.password({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailAddress: emailAddress.trim(),
        password,
      });

      if (error) {
        setErrorMessage(getErrorMessage(error));
        return;
      }

      // Send email verification code
      const { error: verificationError } =
        await signUp.verifications.sendEmailCode();

      if (verificationError) {
        setErrorMessage(getErrorMessage(verificationError));
        return;
      }

      setShowVerification(true);
      setSuccessMessage(
        `A verification code has been sent to ${emailAddress.trim()}.`
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      submitInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // Step 2: Verify email code
  const handleVerify = async (e) => {
  e.preventDefault();

  if (verifyInProgress.current) return;

  setErrorMessage("");
  setSuccessMessage("");

  verifyInProgress.current = true;
  setIsProcessing(true);

  try {
    // 1. If already complete from a previous attempt, skip straight to finalize
    if (signUp.status === "complete") {
      await finalizeSignUp();
      return;
    }

    if (!code.trim()) {
      setErrorMessage("Please enter your verification code.");
      return;
    }

    // 2. Only verify if email isn't already verified
    const { error } = await signUp.verifications.verifyEmailCode({
      code: code.trim(),
    });

    if (error) {
      // If Clerk says it's already verified and the sign-up is complete, finalize it
      if (signUp.status === "complete") {
        await finalizeSignUp();
        return;
      }
      setErrorMessage(getErrorMessage(error));
      return;
    }

    if (signUp.status === "complete") {
      await finalizeSignUp();
    } else {
      console.log("Incomplete signUp:", {
        status: signUp.status,
        missingFields: signUp.missingFields,
        unverifiedFields: signUp.unverifiedFields,
      });
      setErrorMessage(
        `Registration incomplete. Missing: ${signUp.missingFields?.join(", ") || "unknown requirement"}`
      );
    }
  } catch (error) {
    setErrorMessage(getErrorMessage(error));
  } finally {
    verifyInProgress.current = false;
    setIsProcessing(false);
  }
};

  // Resend verification code
  const handleResendCode = async () => {
    if (isLoading) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsProcessing(true);

    try {
      const { error } = await signUp.verifications.sendEmailCode();

      if (error) {
        setErrorMessage(getErrorMessage(error));
      } else {
        setSuccessMessage("A new verification code has been sent.");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  };

  // Return to registration form
  const handleStartOver = async () => {
    if (isLoading) return;

    setErrorMessage("");
    setSuccessMessage("");
    setCode("");
    setShowVerification(false);

    try {
      await signUp.reset();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  // Already authenticated
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

          {/* Left information panel */}
          <div className="hidden flex-col justify-between bg-blue-900 p-10 text-white md:flex lg:p-12">
            <div>
              <Link to="/" className="text-2xl font-bold tracking-tight">
                Jamiat Tech Academy
              </Link>

              <div className="mt-20">
                <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                  Start Your Journey!
                </h1>

                <p className="mt-5 max-w-md leading-7 text-blue-100">
                  Join Jamiat Tech Academy and take the next step toward
                  your future. Learn new skills, explore technology, and
                  build something amazing.
                </p>
              </div>
            </div>

            <p className="text-sm text-blue-200">
              Learn. Build. Grow.
            </p>
          </div>

          {/* Right form panel */}
          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-md">

              {/* Mobile logo */}
              <Link
                to="/"
                className="text-xl font-bold text-blue-900 md:hidden"
              >
                Jamiat Tech Academy
              </Link>

              <div className="mb-8 mt-8 md:mt-0">
                <h2 className="text-3xl font-bold text-gray-900">
                  {showVerification
                    ? "Verify your email"
                    : "Create an account"}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {showVerification
                    ? "Enter the verification code sent to your email address."
                    : "Create your account and start your learning journey."}
                </p>
              </div>

              {/* Error message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              {/* Success message */}
              {successMessage && (
                <div
                  role="status"
                  className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {successMessage}
                </div>
              )}

              {!showVerification ? (
                /* Registration form */
                <form onSubmit={handleSignUp} className="space-y-5">

                  {/* First and last name */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="emailAddress"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                      required
                    />

                    {errors?.fields?.emailAddress?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fields.emailAddress.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 pr-16 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-blue-900"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Use at least 8 characters.
                    </p>

                    {errors?.fields?.password?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fields.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !firstName.trim() ||
                      !lastName.trim() ||
                      !emailAddress.trim() ||
                      !password
                    }
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-900 px-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              ) : (
                /* Email verification form */
                <form onSubmit={handleVerify} className="space-y-5">

                  <div>
                    <label
                      htmlFor="verificationCode"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Verification Code
                    </label>

                    <input
                      id="verificationCode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter verification code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm tracking-widest outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                      required
                    />

                    {errors?.fields?.code?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fields.code.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !code.trim()}
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-900 px-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="w-full text-sm font-medium text-blue-900 hover:text-sky-600 disabled:opacity-50"
                  >
                    Resend verification code
                  </button>

                  <button
                    type="button"
                    onClick={handleStartOver}
                    disabled={isLoading}
                    className="w-full text-sm text-gray-500 hover:text-gray-800 disabled:opacity-50"
                  >
                    Back to registration
                  </button>
                </form>
              )}

              {/* Sign in link */}
              {!showVerification && (
                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="font-semibold text-blue-900 hover:text-sky-600"
                  >
                    Sign in
                  </Link>
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
