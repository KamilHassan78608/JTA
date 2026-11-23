
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth, useSignIn } from "@clerk/react";

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent duplicate submissions
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

  // Finalize sign-in and create session
  const finalizeSignIn = async () => {
    try {
      await signIn.finalize({
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
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  // Step 1: Sign in with email and password
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (submitInProgress.current) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (!emailAddress.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    submitInProgress.current = true;
    setIsProcessing(true);

    try {
      const { error } = await signIn.password({
        emailAddress: emailAddress.trim(),
        password,
      });

      if (error) {
        setErrorMessage(getErrorMessage(error));
        return;
      }

      // Sign-in completed without additional verification
      if (signIn.status === "complete") {
        await finalizeSignIn();
        return;
      }

      // Handle device trust verification
      if (signIn.status === "needs_client_trust") {
        const emailFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        );

        if (emailFactor) {
          const { error: codeError } =
            await signIn.mfa.sendEmailCode();

          if (codeError) {
            setErrorMessage(getErrorMessage(codeError));
            return;
          }

          setVerificationMethod("email_code");
          setShowVerification(true);
          setSuccessMessage(
            "A device verification code has been sent to your email."
          );
          return;
        }

        setErrorMessage(
          "Your account requires device verification, but email verification is unavailable."
        );
        return;
      }

      // Handle MFA
      if (signIn.status === "needs_second_factor") {
        const factors = signIn.supportedSecondFactors || [];

        const emailFactor = factors.find(
          (factor) => factor.strategy === "email_code"
        );

        const totpFactor = factors.find(
          (factor) => factor.strategy === "totp"
        );

        if (emailFactor) {
          const { error: codeError } =
            await signIn.mfa.sendEmailCode();

          if (codeError) {
            setErrorMessage(getErrorMessage(codeError));
            return;
          }

          setVerificationMethod("email_code");
          setShowVerification(true);
          setSuccessMessage(
            "A verification code has been sent to your email."
          );
          return;
        }

        if (totpFactor) {
          setVerificationMethod("totp");
          setShowVerification(true);
          setSuccessMessage(
            "Enter the code from your authenticator app."
          );
          return;
        }

        setErrorMessage(
          "No supported verification method is available for your account."
        );
        return;
      }

      setErrorMessage(
        "Sign-in could not be completed. Please try again."
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      submitInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // Step 2: Verify email or authenticator code
  const handleVerify = async (e) => {
    e.preventDefault();

    if (verifyInProgress.current) return;

    if (!code.trim()) {
      setErrorMessage("Please enter your verification code.");
      return;
    }

    verifyInProgress.current = true;
    setIsProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let error;

      if (verificationMethod === "email_code") {
        ({ error } = await signIn.mfa.verifyEmailCode({
          code: code.trim(),
        }));
      } else if (verificationMethod === "totp") {
        ({ error } = await signIn.mfa.verifyTOTPCode({
          code: code.trim(),
        }));
      }

      if (error) {
        setErrorMessage(getErrorMessage(error));
        return;
      }

      if (signIn.status === "complete") {
        await finalizeSignIn();
      } else {
        setErrorMessage(
          "Verification was accepted, but sign-in is not complete. Please follow any remaining account requirements."
        );
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      verifyInProgress.current = false;
      setIsProcessing(false);
    }
  };

  // Resend email verification code
  const handleResendCode = async () => {
    if (isLoading || verificationMethod !== "email_code") return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsProcessing(true);

    try {
      const { error } = await signIn.mfa.sendEmailCode();

      if (error) {
        setErrorMessage(getErrorMessage(error));
      } else {
        setSuccessMessage(
          "A new verification code has been sent to your email."
        );
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  };

  // Return to sign-in form
  const handleStartOver = async () => {
    if (isLoading) return;

    setErrorMessage("");
    setSuccessMessage("");
    setCode("");
    setShowVerification(false);
    setVerificationMethod("");

    try {
      await signIn.reset();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  // Redirect already authenticated users
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
                  Welcome Back!
                </h1>

                <p className="mt-5 max-w-md leading-7 text-blue-100">
                  Continue your learning journey. Sign in to access your
                  courses, track your progress, and keep building your future.
                </p>
              </div>
            </div>

            <p className="text-sm text-blue-200">
              Learn. Build. Grow.
            </p>
          </div>

          {/* Sign-in form panel */}
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
                    ? "Verify your account"
                    : "Sign in"}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {showVerification
                    ? "Complete the verification step to access your account."
                    : "Enter your account details to continue learning."}
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
                /* Main sign-in form */
                <form onSubmit={handleSignIn} className="space-y-5">

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

                    {errors?.fields?.identifier?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fields.identifier.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-blue-900 hover:text-sky-600"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 pr-16 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-blue-900"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {errors?.fields?.password?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fields.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !emailAddress.trim() ||
                      !password
                    }
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-900 px-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              ) : (
                /* Verification form */
                <form onSubmit={handleVerify} className="space-y-5">

                  <div>
                    <label
                      htmlFor="verificationCode"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {verificationMethod === "totp"
                        ? "Authenticator Code"
                        : "Email Verification Code"}
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
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !code.trim()}
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-900 px-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Verifying..." : "Verify and Sign In"}
                  </button>

                  {verificationMethod === "email_code" && (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="w-full text-sm font-medium text-blue-900 hover:text-sky-600 disabled:opacity-50"
                    >
                      Resend verification code
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleStartOver}
                    disabled={isLoading}
                    className="w-full text-sm text-gray-500 hover:text-gray-800 disabled:opacity-50"
                  >
                    Back to sign in
                  </button>
                </form>
              )}

              {/* Sign-up link */}
              {!showVerification && (
                <p className="mt-8 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="font-semibold text-blue-900 hover:text-sky-600"
                  >
                    Create an account
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

export default SignIn;
