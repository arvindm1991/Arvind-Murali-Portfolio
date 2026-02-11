import { NavLink } from 'react-router-dom';
import { Home, FileText, Briefcase, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/resume', label: 'Resume', icon: FileText },
  { path: '/projects', label: 'Projects', icon: Briefcase },
  { path: '/misc', label: 'Misc Work', icon: Settings }, // Using Settings generic icon for Misc for now
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggle}
        className="fixed top-4 left-4 z-50 p-2 bg-stone-100 rounded-full md:hidden shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-stone-100/50 border-r border-stone-200 sticky top-0 backdrop-blur-sm">
        <div className="p-8">
          <h1 className="text-2xl font-serif text-stone-900 tracking-tight">Arvind Murali</h1>
          <p className="text-sm text-stone-500 mt-1">Product & Engineering</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-stone-200 text-stone-900'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                )
              }
            >
              <item.icon size={18} strokeWidth={1.5} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-8 text-xs text-stone-400">
          Built with Zen
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggle}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-stone-50 z-50 md:hidden shadow-xl border-r border-stone-200"
            >
              <div className="p-8 pt-16">
                 <h1 className="text-2xl font-serif text-stone-900">Arvind Murali</h1>
              </div>
              <nav className="px-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all',
                        isActive
                          ? 'bg-stone-200 text-stone-900'
                          : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                      )
                    }
                  >
                    <item.icon size={18} strokeWidth={1.5} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
