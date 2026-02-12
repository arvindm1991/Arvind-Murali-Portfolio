import { NavLink, useLocation } from 'react-router-dom';
import { Home, FileText, Briefcase, Menu, X, Car, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { projectsData } from '../data/projects';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/resume', label: 'Resume', icon: FileText },
  { path: '/projects', label: 'Projects', icon: Briefcase, hasSubmenu: true },
  { path: '/misc', label: 'Misc Work', icon: Car },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  // Auto-expand projects menu if on a project page
  useEffect(() => {
    if (location.pathname.startsWith('/projects')) {
      setProjectsOpen(true);
    }
  }, [location.pathname]);

  const NavItem = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const isProjectSection = item.path === '/projects';
    
    return (
      <>
        <div className="flex flex-col">
           <div className="flex items-center justify-between pr-2 group">
            <NavLink
              to={item.path}
              onClick={() => mobile && setIsOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex-1',
                  isActive
                    ? 'bg-stone-200 text-stone-900'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                )
              }
            >
              <item.icon size={18} strokeWidth={1.5} />
              {item.label}
            </NavLink>
            {isProjectSection && (
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setProjectsOpen(!projectsOpen);
                    }}
                    className="p-1.5 rounded-md hover:bg-stone-200 text-stone-400 hover:text-stone-800 transition-colors"
                >
                    {projectsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
            )}
           </div>

           {/* Projects Submenu */}
           <AnimatePresence>
             {isProjectSection && projectsOpen && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="overflow-hidden ml-9 border-l border-stone-200"
               >
                 {projectsData.map(project => (
                   <NavLink
                     key={project.id}
                     to={`/projects/${project.id}`}
                     onClick={() => mobile && setIsOpen(false)}
                     className={({ isActive }) =>
                       clsx(
                         'block px-4 py-2 text-sm transition-colors border-l-2 -ml-[1px]',
                         isActive
                           ? 'border-stone-800 text-stone-900 font-medium'
                           : 'border-transparent text-stone-500 hover:text-stone-800'
                       )
                     }
                   >
                     {project.title}
                   </NavLink>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </>
    );
  };

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
      <aside className="hidden md:flex flex-col w-64 h-screen bg-stone-100/50 border-r border-stone-200 sticky top-0 backdrop-blur-sm overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-serif text-stone-900 tracking-tight">Arvind Murali</h1>
          <p className="text-sm text-stone-500 mt-1">Product Builder</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 pb-8">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
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
              className="fixed inset-y-0 left-0 w-64 bg-stone-50 z-50 md:hidden shadow-xl border-r border-stone-200 overflow-y-auto"
            >
              <div className="p-8 pt-16">
                 <h1 className="text-2xl font-serif text-stone-900">Arvind Murali</h1>
                 <p className="text-sm text-stone-500 mt-1">Product Builder</p>
              </div>
              <nav className="px-4 space-y-1 pb-8">
                {navItems.map((item) => (
                  <NavItem key={item.path} item={item} mobile={true} />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
