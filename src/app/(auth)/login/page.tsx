"use client";
import { Form, Button, Input, Label, Checkbox } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://i.ibb.co.com/cXpj0JcY/images-q-tbn-ANd9-Gc-SUh2fr-UMka-RBQ6-Hg-R4-Z8-Dg-IDus0l-L2-NUe-R8-T7kx99-Q4-Pq-EJ4-Mt-GVX2qtc-s-10.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-white">
          <h1 className="text-4xl text-white font-bold mb-4">Welcome back to your beauty journey</h1>
          <p className="text-lg">Access your appointments, favorite services, and personalized beauty recommendations.</p>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Sign in</h2>
          <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>
          
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            
            <div className="flex justify-between items-center">
              <Checkbox>Remember me</Checkbox>
              <Link href="/forgot-password" className="text-sm text-pink-600 font-semibold">Forgot password?</Link>
            </div>

            <Button type="submit" className="w-full bg-pink-600 text-white">Sign In</Button>
            
            <div className="text-center text-gray-500 my-2">Or continue with</div>

            <Button type="button" className='flex gap-2 items-center w-full' ><FcGoogle /> Google Sign In</Button>
          </Form>

          <p className="mt-6 text-center">Don`t have an account? <Link href="/signup" className="text-pink-600 font-semibold">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}