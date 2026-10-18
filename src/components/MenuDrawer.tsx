import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowLeft, ChevronRight, School, BookOpen, LayoutGrid } from 'lucide-react';
import AcademicSection from './AcademicSection';
import BlogSection from './BlogSection';

export type DrawerView = 'menu' | 'academics' | 'blog';

interface MenuDrawerProps {
  view: DrawerView | null;
  onClose: () => void;
  onNavigate: (view: DrawerView) => void;
}

const menuItems = [
  {
    id: 'academics' as const,
    label: 'Academics',
    description: 'Explore my academic journey',
    icon: School,
    accent: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
  },
  {
    id: 'blog' as const,
    label: 'Blog',
    description: 'Detailed summary of my project',
    icon: BookOpen,
    accent: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
  }
];

const titles: Record<DrawerView, string> = {
  menu: 'Menu',
  academics: 'Academics',
  blog: 'Blog'
};

export default function MenuDrawer({ view, onClose, onNavigate }: MenuDrawerProps) {
  const isOpen = view !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={titles[view]}
            className="absolute right-0 top-0 h-full w-full sm:max-w-xl bg-[#080e22] border-l border-blue-400/25 shadow-2xl shadow-black/60 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          >
            <header className="flex items-center gap-2 px-4 sm:px-6 h-16 border-b border-blue-900/70 shrink-0">
              {view !== 'menu' ? (
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="p-2 -ml-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                  aria-label="Back to menu"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-200 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4" aria-hidden="true" />
                </div>
              )}
              <h2 className="flex-1 text-lg font-bold text-white">{titles[view]}</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={view}
                  className="absolute inset-0 overflow-y-auto px-4 sm:px-6 py-6"
                  initial={{ x: view === 'menu' ? '-30%' : '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: view === 'menu' ? '100%' : '-30%', opacity: 0 }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                >
                  {view === 'menu' && (
                    <nav aria-label="Additional sections">
                      <ul className="flex flex-col gap-3">
                        {menuItems.map((item, i) => (
                          <motion.li
                            key={item.id}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                          >
                            <button
                              type="button"
                              onClick={() => onNavigate(item.id)}
                              className="group w-full flex items-center gap-4 p-4 rounded-2xl bg-[#0e1b3d]/90 border border-blue-400/25 hover:border-blue-400/60 hover:bg-[#12224c] text-left transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                            >
                              <span
                                className={`w-11 h-11 shrink-0 rounded-xl border flex items-center justify-center ${item.accent}`}
                              >
                                <item.icon className="w-5 h-5" aria-hidden="true" />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block font-bold text-white">{item.label}</span>
                                <span className="block text-xs text-slate-400 mt-0.5">{item.description}</span>
                              </span>
                              <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>
                  )}
                  {view === 'academics' && <AcademicSection />}
                  {view === 'blog' && <BlogSection />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
