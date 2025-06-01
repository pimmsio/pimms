"use client";

// Re-export only the specific exports we need from framer-motion
// This avoids the "export *" issue with Next.js App Router

export { motion, AnimatePresence, type Transition } from "framer-motion";
