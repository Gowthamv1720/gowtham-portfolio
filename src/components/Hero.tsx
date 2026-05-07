"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Hero() {
  const { name, role, phone, email, location, linkedin } = resumeData.personalInfo;

  return (
    <section className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={`${styles.heroTitle} text-gradient`}>{name}</h1>
        <h2 className={styles.heroSubtitle}>{role}</h2>

        <div className={styles.contactInfo}>
          <a href={`tel:${phone}`} className={styles.contactItem}>
            <Phone size={18} />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className={styles.contactItem}>
            <Mail size={18} />
            <span>{email}</span>
          </a>
          <div className={styles.contactItem}>
            <MapPin size={18} />
            <span>{location}</span>
          </div>
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

      </motion.div>
    </section>
  );
}
