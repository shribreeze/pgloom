"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form integration here
  };

  const BottomGradient = () => (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );

  return (
    <section
      id="contact"
      className="bg-neutral-950 text-white px-6 py-20 sm:px-10 md:px-20 lg:px-32"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Let’s <span className="text-indigo-600">Connect</span>
        </h2>
        <p className="mt-2 text-neutral-400 max-w-2xl mx-auto">
          Have questions, feedback, or just want to say hello? Drop us a message.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-indigo-500" />
            <div>
              <h4 className="font-semibold text-white">Email</h4>
              <p className="text-neutral-400">support@pgloom.in</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-green-500" />
            <div>
              <h4 className="font-semibold text-white">Phone</h4>
              <p className="text-neutral-400">+91 9876543210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-semibold text-white">Address</h4>
              <p className="text-neutral-400">Gurgaon, Haryana, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="group relative">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>
          <div className="group relative">
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Your Message"
            ></Textarea>
          </div>
          <button
          className="group/btn relative block h-10 w-full rounded-md bg-zinc-800 from-zinc-900 to-zinc-900 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"          
          type="submit"
        >
          Send Message
          <BottomGradient />
        </button>
        </form>
      </div>
    </section>
  );
}
