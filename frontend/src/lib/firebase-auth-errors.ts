import { FirebaseError } from "firebase/app";

const firebaseAuthErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/network-request-failed":
    "Firebase Auth could not reach the network. Check your connection and try again.",
  "auth/popup-blocked":
    "The Google sign-in popup was blocked. Allow popups for this site and try again.",
  "auth/popup-closed-by-user":
    "The Google sign-in popup was closed before login finished.",
  "auth/too-many-requests":
    "Too many login attempts. Wait a moment, then try again.",
  "auth/unauthorized-domain":
    "This domain is not authorized in Firebase Authentication. Add shei-it.com and www.shei-it.com in Firebase Console > Authentication > Settings > Authorized domains.",
  "auth/user-disabled": "This admin account has been disabled.",
};

export function getFirebaseAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return (
      firebaseAuthErrorMessages[error.code] ??
      error.message ??
      "Firebase authentication failed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Firebase authentication failed.";
}
