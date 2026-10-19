import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  ArrowUp,
  ChevronRight,
  Copy,
  Check,
  Code2,
  Coffee,
  Cpu,
  Table2,
  Presentation,
  Sparkles,
  Target,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  Lightbulb,
  ExternalLink,
  FolderGit2
} from 'lucide-react';
import {
  LayoutGrid,
  School,
  Brain,
  Users,
  Share2,
  CalendarCheck,
  FileText,
  CircleAlert
} from 'lucide-react';
import MenuDrawer, { type DrawerView } from './components/MenuDrawer';
import AmbientMotion from './components/AmbientMotion';

type SkillLevel = 'Advanced' | 'Proficient' | 'Familiar';

interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: string;
  level: SkillLevel;
  icon: React.ReactNode;
  iconBg: string;
  tagColor: string;
}

/*
 * Contact form delivery. Set VITE_CONTACT_FORM_ENDPOINT to a Formspree, EmailJS proxy,
 * Resend route, or any backend URL that accepts a JSON POST of { name, email, subject, message }.
 * When empty, the form falls back to opening a prefilled email draft (no fake success state).
 */
const CONTACT_FORM_ENDPOINT: string = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '';

/* Replace these empty strings with real URLs when available. Empty links render as "coming soon". */
const PROJECT_LINKS = {
  github: '',
  notebook: ''
};

const levelStyles: Record<SkillLevel, string> = {
  Advanced: 'bg-[#0F172A] text-white border-[#0F172A]',
  Proficient: 'bg-[#0EA5C6]/10 text-[#0369A1] border-[#0EA5C6]/30',
  Familiar: 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]'
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [drawerView, setDrawerView] = useState<DrawerView | null>(null);
  const closeDrawer = React.useCallback(() => setDrawerView(null), []);
  const openDrawer = (view: DrawerView) => {
    setMobileMenuOpen(false);
    setDrawerView(view);
  };

  // Contact Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const emailAddress = 'jeshema123@gmail.com';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const aiSkills: SkillItem[] = [
    {
      id: 'python',
      name: 'Python Programming',
      description: 'Data analysis, scripting, and problem-solving',
      category: 'Core Language',
      level: 'Proficient',
      icon: <Code2 className="w-6 h-6" />,
      iconBg: 'bg-[#0EA5C6]/10 text-[#0EA5C6] border border-[#0EA5C6]/25',
      tagColor: 'bg-[#0EA5C6]/10 text-[#0369A1] border-[#0EA5C6]/25'
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      description: 'Core concepts and model fundamentals',
      category: 'AI Foundations',
      level: 'Familiar',
      icon: <Brain className="w-6 h-6" />,
      iconBg: 'bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/25',
      tagColor: 'bg-[#0284C7]/10 text-[#0369A1] border-[#0284C7]/25'
    },
    {
      id: 'excel',
      name: 'Microsoft Excel',
      description: 'Organising, analysing, and presenting data',
      category: 'Data Analysis',
      level: 'Proficient',
      icon: <Table2 className="w-6 h-6" />,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  const toolSkills: SkillItem[] = [
    {
      id: 'java',
      name: 'Java',
      description: 'Object-oriented programming foundations',
      category: 'Object-Oriented',
      level: 'Familiar',
      icon: <Coffee className="w-6 h-6" />,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'cpp',
      name: 'C++',
      description: 'Core programming and logical thinking',
      category: 'Systems & Logic',
      level: 'Familiar',
      icon: <Cpu className="w-6 h-6" />,
      iconBg: 'bg-[#14B8A6]/10 text-[#0F766E] border border-[#14B8A6]/25',
      tagColor: 'bg-[#14B8A6]/10 text-[#0F766E] border-[#14B8A6]/25'
    },
    {
      id: 'm365',
      name: 'Microsoft 365',
      description: 'Everyday collaboration and productivity',
      category: 'Productivity',
      level: 'Proficient',
      icon: <Users className="w-6 h-6" />,
      iconBg: 'bg-sky-50 text-sky-700 border border-sky-200',
      tagColor: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      description: 'Shared documents and team sites',
      category: 'Collaboration',
      level: 'Familiar',
      icon: <Share2 className="w-6 h-6" />,
      iconBg: 'bg-teal-50 text-teal-700 border border-teal-200',
      tagColor: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      id: 'powerpoint',
      name: 'Microsoft PowerPoint',
      description: 'Clear, impactful presentations',
      category: 'Visual Communication',
      level: 'Proficient',
      icon: <Presentation className="w-6 h-6" />,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-200',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const handleScroll = () => {
      const header = document.querySelector('header');
      const probe = (header?.offsetHeight ?? 80) + window.innerHeight * 0.25;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 5000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message should be at least 5 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (CONTACT_FORM_ENDPOINT) {
      setFormStatus('sending');
      try {
        const response = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim()
          })
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        setFormStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setToastMessage('Thank you! Your message has been sent successfully.');
      } catch {
        setFormStatus('error');
      }
      return;
    }

    // Construct prefilled mailto URL
    const subjectEncoded = encodeURIComponent(formData.subject.trim());
    const bodyText = `Hello Jeshema,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}\n\n---\nSent from your portfolio website`;
    const bodyEncoded = encodeURIComponent(bodyText);
    const mailto = `mailto:${emailAddress}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setLastMailtoUrl(mailto);
    setFormSubmitted(true);

    // Open user's default email client
    window.location.href = mailto;
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setQuickSubject = (subj: string) => {
    setFormData((prev) => ({ ...prev, subject: subj }));
    if (formErrors.subject) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.subject;
        return updated;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#475569] flex flex-col font-sans selection:bg-[#0EA5C6] selection:text-white">
      <AmbientMotion />
      {/* -------------------- STICKY NAVIGATION BAR -------------------- */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/85 backdrop-blur-md border-b border-[#DCE7F2] shadow-lg shadow-[#0F172A]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group flex items-center gap-3 focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40 rounded-lg p-1"
          >
  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-md shadow-[#0EA5C6]/25 group-hover:scale-105 transition-all duration-200 border-2 border-[#0EA5C6]">
  <img src="/images/jb-logo.jpg" alt="JB logo" className="w-full h-full object-cover scale-125 mix-blend-multiply" />
  </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#0F172A] tracking-tight text-base sm:text-lg leading-tight group-hover:text-[#0EA5C6] transition-colors">
                <span className="sr-only">Jeshema Begam</span>
                <span aria-hidden="true">
                  {'Jeshema Begam'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="logo-letter"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </span>
              <span className="text-xs text-[#0EA5C6] font-medium logo-subtitle">
                B.Tech AI & Data Science
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#0F172A] bg-[#0EA5C6]/10 border border-[#0EA5C6]/30 font-semibold shadow-xs'
                      : 'text-[#475569] hover:text-[#0EA5C6] hover:bg-[#EEF6FF]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => openDrawer('menu')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[#475569] hover:text-[#0EA5C6] hover:bg-[#EEF6FF] transition-all duration-200"
            >
              <LayoutGrid className="w-4 h-4 text-[#0EA5C6]" aria-hidden="true" />
              Menu
            </button>
          </nav>

          {/* Desktop Direct Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] rounded-lg shadow-md shadow-[#0EA5C6]/25 transition-all duration-200 border border-[#0EA5C6]/30"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Let’s Connect</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#475569] hover:text-[#0EA5C6] hover:bg-[#EEF6FF] focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#0F172A]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0F172A]" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#DCE7F2] bg-white/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1 shadow-2xl">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#0F172A] bg-[#0EA5C6]/10 font-semibold border border-[#0EA5C6]/25'
                      : 'text-[#475569] hover:text-[#0EA5C6] hover:bg-[#EEF6FF]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => openDrawer('menu')}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium text-[#475569] hover:text-[#0EA5C6] hover:bg-[#EEF6FF] transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-[#0EA5C6]" aria-hidden="true" />
              Menu
              <span className="ml-auto text-xs text-[#0EA5C6]">Academics · Blog</span>
            </button>
            <div className="pt-3">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] rounded-lg shadow-md shadow-[#0EA5C6]/25"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Send Me a Message</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* -------------------- MAIN CONTENT -------------------- */}
      <main className="flex-1">
        {/* ==================== 1. HERO SECTION ==================== */}
        <section
          id="home"
          className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF6FF] to-[#F8FAFC]"
        >
          {/* Ambient Blue Background Glows */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0EA5C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-10 left-1/3 w-[300px] h-[300px] bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Profile Photo: Prominently placed on right for desktop, above introduction on mobile */}
              <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center">
                <div className="relative group w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
                  {/* Outer subtle glow/ring effect */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#0EA5C6]/25 via-[#14B8A6]/15 to-[#0284C7]/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300" />

                  {/* Clean rounded frame with accurate proportions */}
                  <div className="relative overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3 shadow-2xl shadow-[#0F172A]/10 border border-[#0EA5C6]/30">
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#F8FAFC]">
                      {!imageError ? (
                        <img
                          src="/jesheeeeeeeeeeeeeeeeee.jpeg"
                          alt="Jeshema Begam – B.Tech AI & Data Science Student"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        /* Styled fallback matching the user's photo details */
                        <div className="w-full h-full bg-gradient-to-b from-[#EEF6FF] via-white to-[#EEF6FF] flex flex-col items-center justify-center p-6 text-center text-[#0F172A]">
  <div className="w-20 h-20 rounded-2xl bg-white border border-[#0EA5C6]/30 flex items-center justify-center overflow-hidden mb-4 shadow-inner">
  <img src="/images/jb-logo.jpg" alt="JB logo" className="w-full h-full object-cover scale-125 mix-blend-multiply" />
  </div>
                          <h3 className="font-bold text-xl text-[#0F172A]">Jeshema Begam</h3>
                          <p className="text-[#475569] text-xs mt-1">B.Tech AI & Data Science Student</p>
                          <div className="mt-4 px-3 py-1 rounded-full bg-[#EEF6FF] text-[11px] text-[#475569] border border-[#DCE7F2]">
                            Professional Profile
                          </div>
                        </div>
                      )}

                      {/* Subtle gradient vignette at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0F172A]/35 via-[#0F172A]/5 to-transparent pointer-events-none" />

                      {/* Photo Badge overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-[#0F172A]">
                        <div className="flex items-center justify-between text-xs font-medium px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#DCE7F2] shadow-md shadow-[#0F172A]/10">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Jeshema Begam
                          </span>
                          <span className="text-[#0EA5C6] text-[11px]">19 yrs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating decorative badge */}
                  <div className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl shadow-[#0F172A]/10 border border-[#0EA5C6]/25 text-[#0F172A]">
                    <div className="w-8 h-8 rounded-xl bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight text-[#0F172A]">B.Tech AI & DS</p>
                      <p className="text-[10px] text-[#0EA5C6] font-medium">Undergraduate Student</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Content (left side on desktop, below photo on mobile) */}
              <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left space-y-6">
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs sm:text-sm font-semibold tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                  <span>Welcome to My Portfolio</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                  Hi, I’m <span className="text-[#0EA5C6]">Jeshema Begam</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl font-semibold text-[#0284C7] leading-snug">
                  B.Tech AI & Data Science Student{' '}
                  <span className="hidden sm:inline text-slate-300">|</span>{' '}
                  <span className="block sm:inline text-[#475569] font-medium">Aspiring Tech Professional</span>
                </p>

                {/* Short Welcoming Description */}
                <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  I am passionate about learning technology, strengthening my programming skills, and growing into a successful professional.
                </p>

                {/* Two Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <a
                    href="#skills"
                    onClick={(e) => scrollToSection(e, '#skills')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 group text-sm sm:text-base border border-[#0EA5C6]/30"
                  >
                    <span>View My Skills</span>
                    <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#475569] bg-white hover:bg-[#EEF6FF] border border-[#0EA5C6]/25 hover:border-[#0EA5C6] shadow-sm transition-all duration-200 text-sm sm:text-base"
                  >
                    <Mail className="w-4 h-4 text-[#0EA5C6]" />
                    <span>Send Me a Message</span>
                  </a>
                </div>

                {/* Quick Info Badges */}
                <div className="pt-6 border-t border-[#DCE7F2] grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
                  <div className="bg-white p-3 rounded-xl border border-[#DCE7F2] text-left">
                    <p className="text-[11px] text-[#0EA5C6] font-semibold uppercase tracking-wider">Major</p>
                    <p className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">AI & Data Science</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#DCE7F2] text-left">
                    <p className="text-[11px] text-[#0369A1] font-semibold uppercase tracking-wider">Availability</p>
                    <p className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5 leading-snug">
                      Open to internships, collaborative projects, and learning opportunities.
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-white p-3 rounded-xl border border-[#DCE7F2] text-left">
                    <p className="text-[11px] text-[#0EA5C6] font-semibold uppercase tracking-wider">Aspiration</p>
                    <p className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">Tech Professional</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ==================== 2. ABOUT SECTION ==================== */}
        <section
          id="about"
          className="py-16 sm:py-24 bg-[#EEF6FF] border-y border-[#DCE7F2] relative"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#0EA5C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs font-semibold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#14B8A6]" aria-hidden="true" />
                <span>01 · Introduction</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                <span className="text-[#0EA5C6]">01</span> About Me
              </h2>
              <div className="w-12 h-1 bg-[#0EA5C6] mx-auto mt-3 rounded-full" />
            </div>

            {/* About Card Content */}
            <div className="bg-white rounded-3xl border border-[#DCE7F2] p-6 sm:p-10 shadow-xl shadow-[#0F172A]/5">
              <div className="space-y-5 text-[#334155] text-base sm:text-lg leading-relaxed">
                <p>
                  I am <strong className="text-[#0F172A] font-semibold">Jeshema Begam</strong>, a 19-year-old student currently pursuing my Bachelor of Technology (B.Tech) in <strong className="text-[#0EA5C6] font-semibold">Artificial Intelligence & Data Science</strong>.
                </p>
                <p>
                  Driven by genuine curiosity about how computing systems shape our modern world, I dedicate my time to learning programming concepts, sharpening my logical thinking, and building a solid technical foundation. My primary interest lies in understanding core algorithms, structured problem-solving, and managing data effectively.
                </p>
                <p>
                  As an aspiring technology professional, I believe that growth stems from consistent practice, curiosity, and an open mindset toward learning new technologies. I strive to apply my skills with responsibility, thoroughness, and dedication.
                </p>
              </div>

              {/* Structured Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#DCE7F2]">
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#DCE7F2] shadow-xs flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5C6]/10 text-[#0EA5C6] border border-[#0EA5C6]/25 flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-base">Academic Focus</h4>
                  <p className="text-xs sm:text-sm text-[#334155] mt-1 leading-normal">
                    B.Tech in Artificial Intelligence & Data Science, focusing on analytical and software fundamentals.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#DCE7F2] shadow-xs flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/25 flex items-center justify-center mb-3">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-base">Curiosity & Logic</h4>
                  <p className="text-xs sm:text-sm text-[#334155] mt-1 leading-normal">
                    Passionate about core programming logic, structured problem-solving, and continuous self-improvement.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#DCE7F2] shadow-xs flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/25 flex items-center justify-center mb-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-base">Professional Growth</h4>
                  <p className="text-xs sm:text-sm text-[#334155] mt-1 leading-normal">
                    Committed to learning, strengthening technical expertise, and preparing for industry impact.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => openDrawer('academics')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 group text-sm sm:text-base border border-[#0EA5C6]/30"
              >
                <School className="w-4 h-4 text-white" aria-hidden="true" />
                <span>Academics</span>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== 3. SKILLS SECTION ==================== */}
        <section
          id="skills"
          className="py-16 sm:py-24 bg-[#F8FAFC] relative"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0EA5C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs font-semibold uppercase tracking-wider mb-3">
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>02 · Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                <span className="text-[#0EA5C6]">02</span> Technical Skills
              </h2>
              <p className="text-base text-[#334155] mt-3 max-w-xl mx-auto">
                Foundational programming languages and essential analytical tools I actively practice and apply.
              </p>
              <div className="w-12 h-1 bg-[#0EA5C6] mx-auto mt-3 rounded-full" />
            </div>

            {[
              { id: 'ai', letter: 'A', title: 'AI & Data Science', items: aiSkills, primary: true },
              { id: 'tools', letter: 'B', title: 'Development & Productivity Tools', items: toolSkills, primary: false }
            ].map((group) => (
              <div key={group.id} className={group.id === 'tools' ? 'mt-12' : ''}>
                <h3
                  id={`skills-${group.id}`}
                  className="flex items-center gap-3 text-lg sm:text-xl font-bold text-[#0F172A] mb-5"
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold ${
                      group.primary
                        ? 'bg-[#0EA5C6] text-white'
                        : 'bg-[#0EA5C6]/10 text-[#0369A1] border border-[#0EA5C6]/25'
                    }`}
                    aria-hidden="true"
                  >
                    {group.letter}
                  </span>
                  {group.title}
                </h3>
                <ul
                  aria-labelledby={`skills-${group.id}`}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {group.items.map((skill) => (
                    <li
                      key={skill.id}
                      className={`group bg-white rounded-2xl p-5 sm:p-6 border shadow-lg shadow-[#0F172A]/5 hover:shadow-xl hover:shadow-[#0EA5C6]/15 hover:border-[#0EA5C6]/50 transition-all duration-200 flex flex-col min-w-0 ${
                        group.primary ? 'border-[#0EA5C6]/35' : 'border-[#DCE7F2]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div
                          className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center shadow-xs ${skill.iconBg} transition-transform duration-200 group-hover:scale-105`}
                          aria-hidden="true"
                        >
                          {skill.icon}
                        </div>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border text-right ${skill.tagColor}`}
                        >
                          {skill.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#0F172A] break-words">{skill.name}</h4>
                      <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">{skill.description}</p>
                      <div className="pt-4 mt-auto">
                        <div className="pt-3 border-t border-[#DCE7F2] flex items-center justify-between gap-2 text-xs">
                          <span className="text-[#475569] font-medium">Level</span>
                          <span className={`font-semibold px-2.5 py-1 rounded-full border ${levelStyles[skill.level]}`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Note on Continuous Learning */}
            <div className="mt-10 p-5 rounded-2xl bg-white border border-[#DCE7F2] text-center max-w-2xl mx-auto shadow-md">
              <p className="text-sm text-[#334155]">
                <span className="font-semibold text-[#0EA5C6]">Learning in Progress:</span> Continuously expanding knowledge in modern algorithms, data structures, and computer science principles as part of the B.Tech curriculum.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section
          id="projects"
          className="py-16 sm:py-24 bg-[#F8FAFC] relative border-t border-[#DCE7F2]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs font-semibold uppercase tracking-wider mb-3">
                <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>03 · Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                <span className="text-[#0EA5C6]">03</span> Featured Project
              </h2>
              <p className="text-base text-[#334155] mt-3 max-w-xl mx-auto">
                Hands-on work applying Python and data science to real-world problems.
              </p>
              <div className="w-12 h-1 bg-[#0EA5C6] mx-auto mt-3 rounded-full" />
            </div>

            <article className="bg-white rounded-3xl border border-[#DCE7F2] shadow-xl shadow-[#0F172A]/5 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <figure className="bg-white flex flex-col items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#DCE7F2]">
                <img
                  src="/elnino-air-temp.png"
                  alt="Line chart of air temperature for the first 20 observations in the El Niño dataset"
                  width={640}
                  height={480}
                  loading="lazy"
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="text-xs text-slate-500 mt-2">
                  Air temperature — first 20 observations
                </figcaption>
              </figure>

              <div className="p-6 sm:p-8 flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Pandas', 'Matplotlib', 'Data Analysis'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-[#0EA5C6]/10 text-[#0EA5C6] border-[#0EA5C6]/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] text-balance">
                  El Niño Climate Analysis Using Python
                </h3>

                <ol className="flex flex-col gap-3">
                  {[
                    {
                      step: 'Problem',
                      text: 'Understand ocean-climate behaviour and temperature variability associated with El Niño conditions.'
                    },
                    {
                      step: 'Dataset',
                      text: '782 records, 9 variables: buoy ID, location, wind, humidity, air temperature, and sea surface temperature (SST). No missing values.'
                    },
                    {
                      step: 'Approach',
                      text: 'Loaded and inspected the data with Python and Pandas, then plotted air temperature and SST with line charts.'
                    },
                    {
                      step: 'Model',
                      text: 'Exploratory and descriptive statistical analysis. Predictive El Niño forecasting is planned as future work.'
                    },
                    {
                      step: 'Results',
                      text: 'Average SST of 28.29°C, ranging from 22.44°C to 30.34°C, with a 1.39°C standard deviation.'
                    }
                  ].map((item, i) => (
                    <li key={item.step} className="flex gap-3">
                      <span
                        className="w-7 h-7 shrink-0 rounded-lg bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0369A1] text-xs font-bold flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.step}</h4>
                        <p className="text-sm text-[#334155] leading-relaxed">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <details className="group/abstract rounded-xl border border-[#DCE7F2] bg-[#F8FAFC]">
                  <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-semibold text-[#0369A1] rounded-xl focus-visible:outline-2 focus-visible:outline-[#0EA5C6]">
                    Read full abstract
                  </summary>
                  <p className="px-4 pb-4 text-sm text-[#334155] leading-relaxed">
                    This project presents a Python-based exploratory analysis of El Niño-related climate observations. The dataset contains 782 records and 9 variables, including buoy identification, geographic location, wind measurements, humidity, air temperature, and sea surface temperature (SST). Using Python and Pandas, the dataset was loaded, inspected for structure, data types, and missing values, with no missing values identified. Line charts were created to examine variations in air temperature and SST across the observations. Descriptive statistical analysis of SST showed an average temperature of 28.29°C, with values ranging from 22.44°C to 30.34°C, a standard deviation of 1.39°C, and an overall range of 7.90°C. The findings demonstrate how Python-based visualization and statistical techniques can support the initial understanding of ocean-climate data and temperature variability associated with El Niño conditions. Future work can extend this analysis by studying SST anomalies, relationships between climate variables, and predictive models for El Niño forecasting.
                  </p>
                </details>

                <dl className="grid grid-cols-2 gap-3 pt-5 border-t border-[#DCE7F2]">
                  {[
                    { label: 'Records', value: '782' },
                    { label: 'Avg SST', value: '28.29°C' },
                    { label: 'SST Range', value: '7.90°C' },
                    { label: 'Std Dev', value: '1.39°C' }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#DCE7F2] min-w-0">
                      <dt className="text-[11px] text-[#0369A1] font-semibold">{stat.label}</dt>
                      <dd className="text-lg font-bold text-[#0F172A] break-words">{stat.value}</dd>
                    </div>
                  ))}
                </dl>

                <section aria-labelledby="model-eval-heading" className="rounded-xl border border-[#DCE7F2] p-4">
                  <h4 id="model-eval-heading" className="text-sm font-bold text-[#0F172A]">
                    Model Evaluation
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {['Accuracy', 'Precision', 'Recall', 'F1-score'].map((metric) => (
                      <li
                        key={metric}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]"
                      >
                        {metric}: <span className="font-normal">N/A</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-[#475569] mt-2.5 leading-relaxed">
                    Not applicable yet: this phase is exploratory analysis, so no classification model was trained.
                  </p>
                </section>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  {[
                    { label: 'GitHub Repository', href: PROJECT_LINKS.github, icon: FolderGit2 },
                    { label: 'View Project Report / Notebook', href: PROJECT_LINKS.notebook, icon: FileText }
                  ].map(({ label, href, icon: Icon }) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0F172A] bg-white hover:bg-[#EEF6FF] border border-[#0EA5C6]/30 hover:border-[#0EA5C6]"
                      >
                        <Icon className="w-4 h-4 text-[#0EA5C6]" aria-hidden="true" />
                        {label}
                        <ExternalLink className="w-3.5 h-3.5 text-[#475569]" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span
                        key={label}
                        aria-disabled="true"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#475569] bg-[#F8FAFC] border border-dashed border-[#CBD5E1]"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {label}
                        <span className="text-[11px] font-medium">(coming soon)</span>
                      </span>
                    )
                  )}
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-md shadow-[#0EA5C6]/25 border border-[#0EA5C6]/30"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Contact Me
                  </a>
                </div>
              </div>
            </article>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => openDrawer('blog')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 group text-sm sm:text-base border border-[#0EA5C6]/30"
              >
                <BookOpen className="w-4 h-4 text-white" aria-hidden="true" />
                <span>Blog</span>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== 4. CAREER GOAL SECTION ==================== */}
        <section
          id="goal"
          className="py-16 sm:py-24 bg-gradient-to-br from-[#EEF6FF] via-[#F8FAFC] to-[#EEF6FF] text-[#0F172A] relative overflow-hidden border-y border-[#DCE7F2]"
        >
          {/* Ambient Blue Decorative Glows */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#0EA5C6]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0EA5C6]/10 backdrop-blur-md border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Vision & Future</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                My Goal
              </h2>
              <div className="w-12 h-1 bg-[#14B8A6] mx-auto mt-3 rounded-full" />
            </div>

            {/* Main Goal Card */}
            <div className="bg-white backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-[#0EA5C6]/25 shadow-2xl relative">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                
                {/* Quote Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#0EA5C6]/10 border border-[#0EA5C6]/30 text-[#0EA5C6] flex items-center justify-center mx-auto shadow-inner">
                  <Target className="w-7 h-7" />
                </div>

                {/* The Exact Required Goal Text */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-[#0F172A] leading-snug tracking-tight">
                  “My goal is to become a successful technology professional who learns continuously, applies skills responsibly, and contributes meaningful value through innovation.”
                </blockquote>

                {/* Sub-quote: Career Aspiration */}
                <div className="pt-6 border-t border-[#DCE7F2] text-[#475569] text-sm sm:text-base font-normal leading-relaxed italic max-w-2xl mx-auto">
                  “I aspire to become a successful professional by continuously learning, improving my technical expertise, and creating meaningful solutions through technology.”
                </div>

                {/* Sign-off */}
                <div className="pt-2">
                  <p className="font-bold text-[#0F172A] text-base">Jeshema Begam</p>
                  <p className="text-xs text-[#0EA5C6] font-medium">B.Tech Student, Artificial Intelligence & Data Science</p>
                </div>

              </div>

              {/* Three Pillars breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 mt-10 border-t border-[#DCE7F2] text-left">
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#DCE7F2]">
                  <div className="text-[#0EA5C6] font-bold text-sm mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                    Continuous Learning
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Dedicated to constantly evolving with the fast-paced world of artificial intelligence and software engineering.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#DCE7F2]">
                  <div className="text-[#0EA5C6] font-bold text-sm mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                    Responsible Application
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Applying technical problem-solving with integrity, diligence, and ethical responsibility in all endeavors.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#DCE7F2]">
                  <div className="text-[#0EA5C6] font-bold text-sm mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                    Meaningful Value
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Aiming to build practical technological solutions that solve genuine problems and deliver positive impact.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== 5. CONTACT SECTION ==================== */}
        <section
          id="contact"
          className="py-16 sm:py-24 bg-[#F8FAFC] relative"
        >
          {/* Ambient Glow */}
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#0EA5C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#0EA5C6]/25 text-[#0EA5C6] text-xs font-semibold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Let’s Connect
              </h2>
              <p className="text-base text-[#475569] mt-3 max-w-lg mx-auto">
                Have a question, feedback, or would like to discuss technology and learning? Feel free to reach out directly.
              </p>
              <div className="w-12 h-1 bg-[#0EA5C6] mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct Contact Info & Quick Actions */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE7F2] shadow-xl shadow-[#0F172A]/5">
                  <h3 className="font-bold text-lg text-[#0F172A] mb-2">Direct Contact</h3>
                  <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                    You can contact Jeshema directly via email. Click below to copy or open your mail app:
                  </p>

                  {/* Clickable Mail Link Box */}
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE7F2] flex flex-col gap-3 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#0EA5C6] uppercase tracking-wider">Email Address</span>
                      <button
                        type="button"
                        onClick={copyEmailToClipboard}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0EA5C6] hover:text-[#0EA5C6] focus:outline-hidden"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={`mailto:${emailAddress}`}
                      className="font-bold text-base sm:text-lg text-[#0EA5C6] hover:text-[#0284C7] hover:underline break-all flex items-center gap-2 group"
                      title="Click to email Jeshema Begam"
                    >
                      <Mail className="w-5 h-5 text-[#14B8A6] shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{emailAddress}</span>
                    </a>
                  </div>

                  {/* "Email Me Directly" Button */}
                  <div className="mt-5">
                    <a
                      href={`mailto:${emailAddress}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 text-sm border border-[#0EA5C6]/30"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>Email Me Directly</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/80 ml-1" />
                    </a>
                  </div>
                </div>

                {/* Quick Academic Details Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#DCE7F2] shadow-xl shadow-[#0F172A]/5 space-y-3">
                  <h4 className="font-bold text-sm text-[#0F172A]">Academic & Availability Status</h4>
                  <div className="flex items-center gap-2.5 text-xs text-[#475569]">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                    <span>Open to academic learning discussions & student collaboration</span>
                  </div>
                  <div className="text-xs text-[#475569] pt-2 border-t border-[#DCE7F2]">
                    <strong className="text-[#0F172A]">Department:</strong> B.Tech (Artificial Intelligence & Data Science)
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE7F2] shadow-xl shadow-[#0F172A]/5">
                  <div className="mb-6">
                    <h3 className="font-bold text-xl text-[#0F172A]">Send a Message</h3>
                    <p className="text-sm text-[#475569] mt-1">
                      Fill out the form below to automatically draft a message to <span className="font-medium text-[#0EA5C6]">{emailAddress}</span>.
                    </p>
                  </div>

                  {/* Quick Subject Suggestions */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-[#0EA5C6] uppercase tracking-wider mb-2">
                      Quick Topics
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'General Inquiry',
                        'Academic Collaboration',
                        'Programming & Tech Discussion',
                        'Feedback on Portfolio'
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setQuickSubject(topic)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            formData.subject === topic
                              ? 'bg-[#0EA5C6] text-white border-[#0EA5C6] font-semibold'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#DCE7F2] hover:bg-[#EEF6FF] hover:text-[#0EA5C6]'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#475569] mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] text-[#0F172A] placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40 transition-colors ${
                          formErrors.name
                            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/30'
                            : 'border-[#DCE7F2] focus:border-[#0EA5C6]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#475569] mb-1">
                        Your Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sarah@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] text-[#0F172A] placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40 transition-colors ${
                          formErrors.email
                            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/30'
                            : 'border-[#DCE7F2] focus:border-[#0EA5C6]'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#475569] mb-1">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Connecting regarding AI & Data Science"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] text-[#0F172A] placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40 transition-colors ${
                          formErrors.subject
                            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/30'
                            : 'border-[#DCE7F2] focus:border-[#0EA5C6]'
                        }`}
                      />
                      {formErrors.subject && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[#475569] mb-1">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message here..."
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] text-[#0F172A] placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40 transition-colors resize-y ${
                          formErrors.message
                            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/30'
                            : 'border-[#DCE7F2] focus:border-[#0EA5C6]'
                        }`}
                      />
                      {formErrors.message && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#0EA5C6] hover:bg-[#0284C7] shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 text-sm sm:text-base border border-[#0EA5C6]/30 focus:outline-hidden focus:ring-2 focus:ring-[#0EA5C6]/40"
                      >
                        <Send className="w-4 h-4 text-white" />
                        <span>Send Message via Email</span>
                      </button>
                    </div>
                  </form>

                  {/* Submission Success / Notice Message */}
                  {formSubmitted && (
                    <div className="mt-5 p-4 rounded-xl bg-[#EEF6FF] border border-[#DCE7F2] text-[#475569] animate-in fade-in duration-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm">
                          <p className="font-bold text-[#0F172A]">
                            Your email app will open to send the message.
                          </p>
                          <p className="text-[#475569] mt-1">
                            A prefilled draft to <span className="font-semibold text-[#0F172A]">{emailAddress}</span> has been generated. If your email application did not launch automatically, click the link below:
                          </p>
                          {lastMailtoUrl && (
                            <div className="mt-2.5 flex flex-wrap gap-2">
                              <a
                                href={lastMailtoUrl}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0EA5C6] text-white font-semibold text-xs hover:bg-[#0284C7] transition-colors border border-[#0EA5C6]/30"
                              >
                                <span>Open Email Draft</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData({ name: '', email: '', subject: '', message: '' });
                                  setFormSubmitted(false);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#EEF6FF] border border-[#0EA5C6]/25 text-[#475569] text-xs font-semibold hover:bg-[#EEF6FF]"
                              >
                                Clear Form
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="bg-[#EEF6FF] text-[#64748B] border-t border-[#DCE7F2] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#DCE7F2]">
            {/* Logo & Tag */}
            <div className="flex items-center gap-3">
  <div className="w-9 h-9 rounded-lg bg-white border border-[#0EA5C6] flex items-center justify-center overflow-hidden">
  <img src="/images/jb-logo.jpg" alt="JB logo" className="w-full h-full object-cover scale-125 mix-blend-multiply" />
  </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0F172A]">Jeshema Begam</p>
                <p className="text-xs text-[#0EA5C6]">B.Tech AI & Data Science Student</p>
              </div>
            </div>

            {/* Nav links in footer */}
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#475569]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="hover:text-[#0EA5C6] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Back to Top Button */}
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF6FF] text-xs font-semibold text-[#475569] border border-[#DCE7F2] hover:border-[#0EA5C6] transition-all duration-200 shadow-xs"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#14B8A6]" />
            </a>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3 text-center sm:text-left">
            <p>© 2026 Jeshema Begam. B.Tech AI & Data Science.</p>
            <p className="text-[#64748B]">
              Personal Portfolio Website • Designed with care
            </p>
          </div>
        </div>
      </footer>

      <MenuDrawer view={drawerView} onClose={closeDrawer} onNavigate={setDrawerView} />
    </div>
  );
}
