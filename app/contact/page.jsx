"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SpotlightCard from "../components/SpotlightCard.jsx";
import BlurText from "@/components/BlurText";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Smartphone,
  CreditCard,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    product: "",
    pan: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type === "error") setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // Simulate API call delay for UX feel
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Actual logic would go here...
      /* 
      const res = await fetch("/api/contact", { ... });
      if (!res.ok) throw new Error("Failed");
      */

      setStatus({
        type: "success",
        message: "Request received! We'll call you shortly.",
      });
      setFormData({
        name: "",
        mobile: "",
        email: "",
        product: "",
        pan: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EFF3F6] text-gray-900 relative selection:bg-green-200 selection:text-green-900">
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Ambient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#1F5E3C]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-[#10B981]/10 blur-[120px] rounded-full" />
      </div>

      <div className="fixed top-4 w-full flex justify-center z-[9999] px-4">
        <div className="w-full max-w-7xl">
          <Navbar />
        </div>
      </div>

      <main className="relative z-10 flex-grow pt-[140px] pb-20 px-4 sm:px-6">
        {/* --- HEADER SECTION --- */}
        <section className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/80 text-green-800 text-sm font-medium mb-6 border border-green-200/50 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              We are currently accepting new enquiries
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0A0F2C] tracking-tight mb-6  max-w-4xl">
              <BlurText
                text="Let's build your wealth,"
                delay={50}
                animateBy="words"
                direction="top"
                className="inline-block mb-[-5%]"
              />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F5E3C] to-[#10B981]">
                together.
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Whether you’re comparing financial products, exploring
              partnerships, or have a question we’re open to conversations.
            </p>
          </div>
        </section>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT COLUMN: CONTACT INFO & PROCESS (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* 1. Quick Connect Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/40 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-2xl font-bold text-[#0A0F2C] mb-6">
                Contact Channels
              </h3>
              <div className="space-y-5">
                <ContactItem
                  icon={Phone}
                  label="Call directly"
                  value="+91 9082930770"
                  href="tel:+919082930770"
                />
                <ContactItem
                  icon={Mail}
                  label="Email support"
                  value="hetdoshi@comparefi.in"
                  href="mailto:hetdoshi@comparefi.in"
                />
                <ContactItem
                  icon={MapPin}
                  label="Headquarters"
                  value="Fatima Mansion, Station Road, Wadala west, Mumbai 400031"
                />
              </div>
            </motion.div>

            {/* 2. "What Happens Next" (Fills vertical space effectively) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-grow bg-[#1F5E3C] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <h3 className="text-2xl font-bold mb-8 relative z-10">
                What happens next?
              </h3>

              <div className="space-y-8 relative z-10">
                <TimelineItem
                  number="01"
                  title="We receive your request"
                  desc="Our system instantly routes your enquiry to the relevant financial expert."
                />
                <TimelineItem
                  number="02"
                  title="Analysis & Preparation"
                  desc="We analyze your requirements to find the best lenders for your portfolio."
                />
                <TimelineItem
                  number="03"
                  title="Personalized Call"
                  desc="Within 24 hours, an expert calls you with tailored offers."
                  isLast
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: THE FORM (Span 7) */}
          <div className="lg:col-span-7 h-full">
            <SpotlightCard
              className="
                        h-full w-full
                        bg-white/70 backdrop-blur-2xl
                        border border-white/20
                        shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                        rounded-[2rem] p-8 sm:p-10 lg:p-12
                    "
              spotlightColor="rgba(16, 185, 129, 0.15)"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0A0F2C]">
                  Send us a message
                </h2>
                <p className="text-gray-500 mt-2">
                  Fill out the form below and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputGroup
                    icon={User}
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputGroup
                    icon={Smartphone}
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <InputGroup
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {/* Product Select */}
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#10B981] transition-colors z-10" />
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all text-gray-800 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled hidden>
                        Select Interest
                      </option>
                      <option value="LAS">Loan Against Shares</option>
                      <option value="LAMF">Loan Against Mutual Funds</option>
                      <option value="MTF">Margin Trading Facility</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <InputGroup
                  icon={FileText}
                  name="pan"
                  placeholder="PAN Number (Optional)"
                  value={formData.pan}
                  onChange={handleChange}
                />

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-gray-400 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                  <textarea
                    name="message"
                    placeholder="Tell us a bit more about your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all text-gray-800 placeholder-gray-400 resize-none h-40"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  {/* Status Message Area */}
                  <div className="flex-grow w-full sm:w-auto min-h-[48px] flex items-center">
                    <AnimatePresence mode="wait">
                      {status.message && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`flex items-center gap-2 text-sm font-medium ${
                            status.type === "success"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {status.type === "success" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {status.message}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="
                                    w-full sm:w-auto min-w-[180px] h-14
                                    bg-[#0A0F2C] text-white rounded-xl
                                    hover:bg-[#151b42] hover:scale-[1.02]
                                    active:scale-[0.98] transition-all duration-300
                                    shadow-lg shadow-blue-900/10
                                    text-lg font-medium
                                "
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Send Request"
                    )}
                  </Button>
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>

        {/* --- MAP SECTION (Wide & Immersive) --- */}
        <section className="max-w-7xl mx-auto mt-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-[400px] lg:h-[500px] border border-white/20 group"
          >
            {/* The Map */}
            <iframe
              title="Office Location"
              src="https://www.google.com/maps?q=Shop+No+4,+Fatima+Mansion,+Station+Road,+Wadala+West,+Mumbai+400031&output=embed"
              className="w-full h-full filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:left-12 md:bottom-12 md:right-auto md:w-[400px]">
              <SpotlightCard className="bg-white/90 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#0A0F2C]">
                      Wadala Office
                    </h4>
                    <p className="text-sm text-gray-500">Central Mumbai</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full text-green-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Shop No 4, Fatima Mansion,
                  <br />
                  Station Road, Wadala West,
                  <br />
                  Mumbai, Maharashtra 400031
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <Clock className="w-4 h-4" />
                  <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

// Reusable Input Component with Icon
const InputGroup = ({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#10B981] transition-colors z-10" />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all text-gray-800 placeholder-gray-400"
      required
    />
  </div>
);

// Timeline Item for the left column
const TimelineItem = ({ number, title, desc, isLast }) => (
  <div className="relative pl-4 border-l-2 border-green-400/30">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#10B981] border-4 border-[#1F5E3C]" />
    <span className="text-green-300 text-xs font-bold tracking-widest uppercase mb-1 block">
      Step {number}
    </span>
    <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
    <p className="text-green-100/70 text-sm leading-relaxed">{desc}</p>
  </div>
);

// Small Contact Row Component
const ContactItem = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-lg font-semibold text-[#0A0F2C] hover:text-[#10B981] transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-lg font-semibold text-[#0A0F2C]">{value}</p>
      )}
    </div>
  </div>
);
