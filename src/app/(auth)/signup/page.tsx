"use client";
import { Form, Button, Input, Label } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://i.ibb.co.com/ZR0fX6Lt/img-9516.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-white">
          <h1 className="text-4xl text-white font-bold mb-4">Begin your transformation journey today</h1>
          <p className="text-lg">Join over 1,200 clients who trust GlowUp for their beauty and wellness needs.</p>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create account</h2>
          <p className="text-gray-600 mb-8">Start your beauty journey — it’s completely free.</p>
          
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Sophia Laurent" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="sophia@example.com" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Minimum 8 characters" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Repeat your password" />
            </div>

            <Button type="submit" className="w-full bg-pink-600 text-white mt-4">Create Account</Button>
            
            <div className="text-center text-gray-500 my-2">Or</div>

            <Button type="button" className='flex gap-2 items-center w-full'><FcGoogle /> Sign up with Google</Button>
          </Form>

          <p className="mt-6 text-center">Already have an account? <Link href="/login" className="text-pink-600 font-semibold">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}