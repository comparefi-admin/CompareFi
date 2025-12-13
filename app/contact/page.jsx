"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SpotlightCard from "../components/SpotlightCard.jsx";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    product: "",
    pan: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleAnimationComplete = () => console.log("Animation completed!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim().toLowerCase(),
        product: formData.product,
        pan: formData.pan.trim() || null,
        message: formData.message.trim(),
        source: "contact-page",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Failed to send message");
      }

      alert("✅ Your message has been sent successfully!");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        product: "",
        pan: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Contact form error:", err);
      alert("❌ Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EFF3F6] text-gray-900 relative overflow-x-hidden">

      {/* SAFE BACKGROUND BLOBS */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] bg-[#1F5E3C]/20 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[300px] h-[300px] bg-[#124434]/20 blur-[90px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <div className="fixed top-2 w-full flex justify-center z-[9999] px-4">
        <div className="w-full max-w-screen-xl">
          <Navbar />
        </div>
      </div>

      <main className="flex-grow pt-[120px] sm:pt-[140px] lg:pt-[160px] pb-20">

        {/* HERO */}
        <section className="relative flex justify-center items-center pt-12 pb-20 px-4 sm:pb-24">
          <div className="w-full max-w-5xl rounded-3xl mx-auto">
            <SpotlightCard
              className="
                w-full p-6 sm:p-10 md:p-14 rounded-3xl
                bg-gradient-to-b from-[#1F5E3C] to-[#124434]
                border border-white/10 backdrop-blur-xl
                shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                transition-all duration-700
                hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
              "
              spotlightColor="rgba(177,237,103,0.22)"
            >
              <div className="flex justify-center w-full">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="inline-block w-full text-center">
                    <BlurText
                      text="Let’s Connect with CompareFi"
                      delay={80}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                    />
                  </span>
                </motion.h1>
              </div>
              <motion.p
                className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have a question, partnership idea, or want to collaborate?
                <br /> We’re always excited to hear from you.
              </motion.p>
            </SpotlightCard>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-12 sm:py-16 relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start"
          >

            {/* LEFT CARD */}
            <div className="rounded-3xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="
                  bg-white/20 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                  rounded-3xl p-6 sm:p-10 md:p-14
                  flex flex-col space-y-6 sm:space-y-8
                  hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                  transition-all duration-700
                "
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A0F2C] text-center">
                  Get in Touch
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center leading-relaxed">
                  Reach out to our team for any inquiries, collaborations, or product details.
                  We typically respond within 24 hours.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon: <Mail className="text-[#1F5E3C] w-6 h-6" />, text: "comparefi12@gmail.com" },
                    { icon: <Phone className="text-[#1F5E3C] w-6 h-6" />, text: "+91 99999 99999" },
                    { icon: <MapPin className="text-[#1F5E3C] w-6 h-6" />, text: "123, Mumbai, India" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex items-center space-x-4
                        bg-white/25 backdrop-blur-xl
                        border border-white/10
                        rounded-2xl p-3 sm:p-4
                        shadow-[0_10px_28px_rgba(0,0,0,0.12)]
                        hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
                        transition-all duration-500
                      "
                    >
                      {item.icon}
                      <span className="text-[#0A0F2C] font-medium break-words">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT CARD (FORM) */}
            <div className="rounded-3xl w-full">
              <SpotlightCard
                className="
                  bg-white/80 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                  rounded-3xl p-6 sm:p-8 md:p-10
                  hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                  transition-all duration-700
                  w-full
                "
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[#10B981] mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  {["name", "mobile", "email"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field === "name"
                          ? "Your Name"
                          : field === "mobile"
                          ? "Mobile Number"
                          : "Email Address"
                      }
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                      }
                      className="
                        w-full p-4 rounded-xl 
                        border border-green-400/40 
                        bg-white/60
                        focus:outline-none focus:ring-2 focus:ring-green-600
                        placeholder-gray-400 text-gray-800 transition
                      "
                      required
                    />
                  ))}

                  <select
                    name="product"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    className="
                      w-full p-4 rounded-xl 
                      border border-green-400/40 
                      bg-white/60
                      focus:outline-none focus:ring-2 focus:ring-green-600
                      text-gray-800 transition
                    "
                    required
                  >
                    <option value="" disabled hidden>Select Product to Enquire</option>
                    <option value="Loan Against Shares (LAS)">Loan Against Shares (LAS)</option>
                    <option value="Loan Against Mutual Funds (LAMF)">Loan Against Mutual Funds (LAMF)</option>
                    <option value="Margin Trading Facility (MTF)">Margin Trading Facility (MTF)</option>
                  </select>

                  {/* OPTIONAL PAN */}
                  <input
                    type="text"
                    name="pan"
                    placeholder="PAN (Optional)"
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({ ...formData, pan: e.target.value })
                    }
                    className="
                      w-full p-4 rounded-xl 
                      border border-green-400/40 
                      bg-white/60
                      focus:outline-none focus:ring-2 focus:ring-green-600
                      placeholder-gray-400 text-gray-800 transition
                    "
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="
                      w-full p-4 rounded-xl 
                      border border-green-400/40 
                      bg-white/60
                      focus:outline-none focus:ring-2 focus:ring-green-600
                      placeholder-gray-400 text-gray-800 transition
                      resize-none h-40
                    "
                    required
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="
                      bg-gradient-to-r from-[#10B981] to-[#047857]
                      text-white rounded-2xl px-6 py-4 text-lg
                      shadow-md hover:shadow-green-400/50 hover:scale-105
                      transition
                    "
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </SpotlightCard>
            </div>
          </motion.div>
        </section>

        {/* MAP SECTION */}
        <section className="py-12 sm:py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto text-center mb-12 px-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0F2C] mb-3">
              Visit Our Office
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Drop by for a coffee or schedule a consultation — we’d love to meet you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center px-2"
          >
            <div className="w-full max-w-6xl rounded-3xl overflow-hidden">
              <SpotlightCard
                className="
                  relative w-full rounded-3xl
                  bg-white/80 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                  p-4 sm:p-6 md:p-6
                "
              >
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019221819469!2d-122.42067928468116!3d37.77928077975716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2fbd6c3b%3A0x5d53b45c4ed3b0!2sCity%20Hall%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sin!4v1697750000000!5m2!1sen!2sin"
                  className="rounded-3xl border-0 w-full h-[300px] sm:h-[400px] md:h-[450px]"
                  allowFullScreen
                  loading="lazy"
                />
              </SpotlightCard>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}