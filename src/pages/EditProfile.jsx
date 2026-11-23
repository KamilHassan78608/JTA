
import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";

const EditProfile = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitInProgress = useRef(false);

  // Load existing user information
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // Loading state
  if (!isLoaded) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900/20 border-t-blue-900" />
      </section>
    );
  }

  // Protect profile page
  if (!isSignedIn || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Extract error message
  const getErrorMessage = (error) => {
    return (
      error?.errors?.[0]?.longMessage ||
      error?.errors?.[0]?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    setErrorMessage("");
    setSuccessMessage("");

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Profile image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setProfileImage(file);
  };

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (submitInProgress.current) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First name and last name are required.");
      return;
    }

    submitInProgress.current = true;
    setIsProcessing(true);

    try {
      // Update user information in Clerk
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      // Upload profile image if a new one was selected
      if (profileImage) {
        await user.setProfileImage({
          file: profileImage,
        });

        setProfileImage(null);
      }

      // Refresh user information
      await user.reload();

      setSuccessMessage("Your profile has been updated successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      submitInProgress.current = false;
      setIsProcessing(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page heading */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm font-medium text-blue-900 hover:text-sky-600"
          >
            &larr; Back to Dashboard
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and update your profile.
          </p>
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Card heading */}
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your account details below.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8">

            {/* Error message */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div
                role="status"
                className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-7">

              {/* Profile image */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-gray-100 object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Profile Picture
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Upload a new profile picture. Maximum size: 5MB.
                  </p>

                  <label
                    htmlFor="profileImage"
                    className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Change Picture
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {profileImage && (
                    <p className="mt-2 text-sm text-blue-900">
                      Selected: {profileImage.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* First and last name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                    required
                  />
                </div>

              </div>

              {/* Email address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={
                    user.primaryEmailAddress?.emailAddress || ""
                  }
                  readOnly
                  className="h-12 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Your registered email address is managed through your
                  account security settings.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <Link
                  to="/"
                  className="flex h-12 items-center justify-center rounded-lg border border-gray-300 px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={
                    isProcessing ||
                    (!profileImage &&
                      firstName.trim() === (user.firstName || "") &&
                      lastName.trim() === (user.lastName || ""))
                  }
                  className="flex h-12 items-center justify-center rounded-lg bg-blue-900 px-6 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditProfile;
