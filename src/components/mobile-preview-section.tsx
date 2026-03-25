"use client";

import { motion } from "framer-motion";

export function MobilePreviewSection() {
  return (
    <section className="border-b border-zinc-900 py-16">
      <div className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Preview</p>
        <h2 className="text-2xl font-semibold tracking-tight">Product in motion</h2>
      </div>

      <div className="flex justify-center">
        <motion.div
          animate={{ rotateZ: [-2, 2, -2], rotateY: [0, 15, 0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="mobile-3d-wrap"
        >
          <div className="mobile-frame">
            <div className="mobile-notch" />
            <div className="mobile-screen">
              <div className="mobile-screen-glow" />
              <div className="space-y-3">
                <div className="h-3 w-20 rounded-full bg-zinc-700" />
                <div className="h-24 rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-14 rounded-lg bg-zinc-800" />
                  <div className="h-14 rounded-lg bg-zinc-800" />
                </div>
                <div className="h-10 rounded-lg bg-zinc-800" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}