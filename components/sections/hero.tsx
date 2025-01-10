"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br
  from-[#ffffff] via-[#f7faff] to-[#e8efff]
  dark:from-[#0b0f19] dark:via-[#0a0d14] dark:to-[#2a2e37]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                Full Stack Developer
            </span>
            <br />
            <span className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
             Building Digital Solutions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            I craft beautiful, scalable web applications with modern technologies. Let's build something amazing together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center space-x-4 mb-8"
        >
          <a
            href="https://github.com/Sathyam1020"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sathyam-sahu-824946253/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:sathyamrock55@gmail.com"
            className="hover:text-primary transition-colors"
          >
            <Mail size={24} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button size="lg" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
