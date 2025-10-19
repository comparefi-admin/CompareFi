"use client";
import React, { useRef, useState } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SpotlightCard from "../components/SpotlightCard.jsx";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const handleAnimationComplete = () => console.log("Animation completed!");

export default function ContactPage() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    product: "",
    message: "",
  });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0fdf4] via-[#ffffff] to-[#e6fff9] text-gray-900 overflow-x-hidden">
        
        {/* Navbar */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow pt-[100px]">

          {/* HERO SECTION */}
          <section className="relative flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-10">
            <SpotlightCard
              className="relative z-10 w-[90%] max-w-6xl rounded-3xl min-h-[50vh] bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] backdrop-blur-xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center justify-center hover:scale-105 transition-all duration-700"
              spotlightColor="rgba(255,255,255,0.25)"
            >
              <div className="flex-1 text-center md:text-left space-y-5">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                >
                  <BlurText text="Get in Touch" delay={80} animateBy="words" direction="top" onAnimationComplete={handleAnimationComplete}/>
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl text-white/90 max-w-md mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  <BlurText text="Have questions or want to collaborate? Fill the form and we'll reach out to you promptly." delay={10} animateBy="words" direction="top" onAnimationComplete={handleAnimationComplete}/>
                </motion.p>
              </div>

              {/* Right: Contact Info */}
              <div className="flex-1 flex flex-col justify-center items-start space-y-4 p-6 bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg max-w-md w-full">
                <h3 className="text-2xl font-bold text-[#10B981]">Contact Information</h3>
                <p className="text-lg text-gray-900"><strong>Name:</strong> Het Doshi</p>
                <p className="text-lg text-gray-900"><strong>Email:</strong> comparefi@gmail.com</p>
                <p className="text-lg text-gray-900"><strong>Phone:</strong> +91 99999 99999</p>
                <p className="text-lg text-gray-900"><strong>Address:</strong> 123, Mumbai, India</p>
              </div>
            </SpotlightCard>
          </section>

          {/* CONTACT FORM SECTION */}
          <section className="w-full flex justify-center items-center my-20 px-4 sm:px-6 lg:px-10">
            <SpotlightCard
              className="relative z-10 w-[90%] max-w-4xl rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl p-10 flex flex-col gap-8"
              spotlightColor="rgba(255,255,255,0.2)"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10B981] text-center mb-6">Contact Us</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 text-[#047857]">
                {["name","mobile","email"].map((field) => (
                  <input
                    key={field}
                    type={field==="email"?"email":"text"}
                    name={field}
                    placeholder={field==="name"?"Your Name":field==="mobile"?"Mobile Number":"Email Address"}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-[#10B981]/40 focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder-[#10B981]/70 text-[#065F46] transition"
                    required
                  />
                ))}
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border border-[#10B981]/40 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-[#065F46] transition"
                  required
                >
                  <option value="">Select Product to Enquire</option>
                  <option value="Product A">Product A</option>
                  <option value="Product B">Product B</option>
                  <option value="Product C">Product C</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border border-[#10B981]/40 focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder-[#10B981]/70 text-[#065F46] transition resize-none h-40"
                  required
                />
                <Button type="submit" size="lg" className="bg-gradient-to-r from-[#10B981] to-[#047857] text-white rounded-2xl px-6 py-4 text-lg transition hover:scale-105">
                  Send Message
                </Button>
              </form>
            </SpotlightCard>
          </section>

          {/* MAP SECTION */}
          <section className="w-full flex justify-center items-center my-20 px-4 sm:px-6 lg:px-10 relative">
            <SpotlightCard
              className="relative z-10 w-[90%] max-w-6xl rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl p-6 flex justify-center"
              spotlightColor="rgba(255, 255, 255, 0.2)"
            >
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019221819469!2d-122.42067928468116!3d37.77928077975716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2fbd6c3b%3A0x5d53b45c4ed3b0!2sCity%20Hall%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sin!4v1697750000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="rounded-3xl border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Floating Map Info Card */}
              <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-72 flex flex-col gap-3">
                <h3 className="font-bold text-lg text-[#065F46]">Our Office</h3>
                <p className="text-sm text-gray-800">123, Mumbai, India</p>
                <a href="mailto:comparefi@gmail.com" className="text-green-700 font-semibold hover:underline">comparefi@gmail.com</a>
                <a href="tel:+919999999999" className="text-green-700 font-semibold hover:underline">+91 99999 99999</a>
              </div>
            </SpotlightCard>
          </section>

        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
