"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { Form, Button, Input, TextField, Label, Spinner } from "@heroui/react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        role: "user",
      } as never);
      if (authError) {
        setError(authError.message || "Failed to create account.");
        return;
      }

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  const handleDirectDemoLogin = async (role: "user" | "admin") => {
    setError("");
    setIsLoading(true);

    const demoName = role === "user" ? "Tania" : "Tunni";
    const demoEmail =
      role === "user" ? "taniia.webdev1@gmail.com" : "admin@gmail.com";
    const demoPassword =
      role === "user" ? "taniia.webdev1@gmail.com" : "admin@gmail.com";

    setName(demoName);
    setEmail(demoEmail);
    setPassword(demoPassword);
    setConfirmPassword(demoPassword);

    try {
      const { error: authError } = await signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (authError) {
        setError(authError.message || `Failed to login as demo ${role}.`);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Something went wrong during auto-login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen bg-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/ZR0fX6Lt/img-9516.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-white">
          <h1 className="text-4xl text-white font-bold mb-4">
            Begin your transformation journey today
          </h1>
          <p className="text-lg">
            Join over 1,200 clients who trust GlowUp for their beauty and
            wellness needs.
          </p>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create account</h2>
          <p className="text-gray-600 mb-8">
            Start your beauty journey — it’s completely free.
          </p>

          {error && (
            <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
          )}

          <Form onSubmit={handleSignup} className="flex flex-col gap-4">
            <TextField isRequired>
              <Label>Full Name</Label>
              <Input
                placeholder="Sophia Laurent"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TextField>

            <TextField isRequired>
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="sophia@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField>

            <TextField isRequired>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextField>

            <TextField isRequired>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-pink-600 text-white mt-4"
              isDisabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner color="accent" size="sm" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-gray-500 my-2">Or</div>

            <Button
              type="button"
              className="flex gap-2 items-center w-full"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> Sign up with Google
            </Button>

            {/* --- Instant Demo Login Buttons for Examiner --- */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs font-semibold text-center text-gray-400 uppercase tracking-wider">
                Instant Demo Login (Bypass Register)
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  isDisabled={isLoading}
                  className="bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl"
                  onClick={() => handleDirectDemoLogin("user")}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Login as User
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  isDisabled={isLoading}
                  className="bg-gray-800 text-white font-bold text-xs rounded-xl hover:bg-gray-900"
                  onClick={() => handleDirectDemoLogin("admin")}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Login as Admin
                </Button>
              </div>
            </div>
          </Form>

          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
