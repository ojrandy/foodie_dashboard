"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = mounted ? LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0] : LANGUAGES[0];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">{currentLang.short}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-0 mt-2 w-40 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden z-[300]"
          >
            <div className="p-1 flex flex-col gap-0.5">
              {LANGUAGES.map((lang) => {
                const isActive = i18n.language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs transition-colors duration-200 ${
                      isActive ? "bg-accent/10 text-accent font-bold" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{lang.label}</span>
                    {isActive && <Check className="h-3 w-3 text-accent" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
