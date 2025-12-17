"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnquiryModal({
  open,
  onClose,
  product,
  institution,
}) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pan: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        mobile: "",
        email: "",
        pan: "",
        message: institution
          ? `I’m interested in ${product} offered by ${institution}.`
          : `I’m interested in ${product}.`,
      });
      setError("");
      setSuccess(false);
      setLoading(false);
    }
  }, [open, product, institution]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.mobile || !formData.email) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        ...formData,
        product,
        institution,
        source: "comparison-table",
        }),
    });

    let result = null;
    const text = await res.text();

    try {
        result = text ? JSON.parse(text) : null;
    } catch {
        throw new Error(
        "Service is temporarily unavailable. Please try again later."
        );
    }

    if (!res.ok) {
        throw new Error(
        result?.error ||
            "Unable to send enquiry right now. Please try again later."
        );
    }

    setSuccess(true);
    } catch (err) {
    setError(
        err.message ||
        "Something went wrong while sending your enquiry. Please try again."
    );
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_18px_42px_rgba(0,0,0,0.35)] p-6 sm:p-8 animate-in fade-in zoom-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F2C] mb-2">
          Enquire Now
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Share your details and we’ll help you find the best option.
        </p>

        {/* Success State */}
        {success ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Enquiry Sent Successfully 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly.
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-[#10B981] to-[#047857] text-white px-6 py-3 rounded-xl"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product (readonly) */}
            <input
              value={product}
              readOnly
              className="w-full p-4 rounded-xl border bg-gray-100 text-gray-700 cursor-not-allowed"
            />

            {/* Institution (readonly if present) */}
            {institution && (
              <input
                value={institution}
                readOnly
                className="w-full p-4 rounded-xl border bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            )}

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-green-600"
              required
            />

            {/* Mobile */}
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number *"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-green-600"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-green-600"
              required
            />

            {/* PAN (optional) */}
            <input
              type="text"
              name="pan"
              placeholder="PAN (Optional)"
              value={formData.pan}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-green-600"
            />

            {/* Message */}
            <textarea
              name="message"
              rows={4}
              placeholder="Additional Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border resize-none focus:ring-2 focus:ring-green-600"
            />

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#10B981] to-[#047857] text-white py-4 rounded-2xl text-lg flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Sending..." : "Send Enquiry"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}