"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const companySizes = [
  { value: "", label: "Select company size" },
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const contactReasons = [
  { value: "", label: "Select reason for contact" },
  { value: "demo", label: "Request a demo" },
  { value: "pricing", label: "Custom pricing" },
  { value: "enterprise", label: "Enterprise plan" },
  { value: "partnership", label: "Partnership opportunity" },
  { value: "support", label: "Request support" },
  { value: "other", label: "Other" },
];

const selectClassName =
  "flex h-12 w-full border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-xl appearance-none";

export function ContactSalesForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      companySize: formData.get("companySize"),
      website: formData.get("website"),
      reason: formData.get("reason"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Request Submitted!
        </h3>
        <p className="text-gray-500">
          Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
        Get in Touch
      </h3>
      <p className="text-gray-500 text-center text-sm mb-6">
        Our team will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="fullName"
          placeholder="Full name"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Business email"
          required
        />

        <Input type="tel" name="phone" placeholder="Phone number" />

        <Input
          type="text"
          name="company"
          placeholder="Company name"
          required
        />

        <select name="companySize" required className={selectClassName}>
          {companySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>

        <Input type="url" name="website" placeholder="Website URL" />

        <select name="reason" required className={selectClassName}>
          {contactReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Any additional information (optional)"
          rows={4}
          className={cn(
            selectClassName,
            "h-auto resize-none py-3"
          )}
        />

        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}
