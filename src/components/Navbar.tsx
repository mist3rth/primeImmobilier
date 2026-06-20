import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeProjectId, activePillarId, activeInquiryProjectId, navigateToSection } = useNavigation();

  const isDetailPage = !!activeProjectId || !!activePillarId || !!activeInquiryProjectId;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    navigateToSection(id);
  };

  const forceDarkTheme = isScrolled || isDetailPage;

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        forceDarkTheme
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-stone-200/40'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="w-full px-[20px] flex justify-between items-center">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => scrollToSection('top')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <span className={`font-serif text-2xl font-bold tracking-tight relative transition-colors duration-300 ${
            forceDarkTheme ? 'text-stone-950' : 'text-white'
          }`}>
            Prime<span className="text-accent">Immobilier</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>

        {/* Desktop Menu links */}
        <div id="desktop-links" className="hidden md:flex items-center space-x-8">
          <button
            id="link-about"
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              forceDarkTheme ? 'text-stone-950 hover:text-accent' : 'text-white hover:text-accent'
            }`}
          >
            À Propos
          </button>
          <button
            id="link-projects"
            onClick={() => scrollToSection('active-projects')}
            className={`text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              forceDarkTheme ? 'text-stone-950 hover:text-accent' : 'text-white hover:text-accent'
            }`}
          >
            Projets
          </button>
          <button
            id="link-slider"
            onClick={() => scrollToSection('renovation-slider')}
            className={`text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              forceDarkTheme ? 'text-stone-950 hover:text-accent' : 'text-white hover:text-accent'
            }`}
          >
            Rénovations
          </button>
          <button
            id="link-faq"
            onClick={() => scrollToSection('faq')}
            className={`text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              forceDarkTheme ? 'text-stone-950 hover:text-accent' : 'text-white hover:text-accent'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-1 hover:text-accent transition-colors duration-350 cursor-pointer ${
            forceDarkTheme ? 'text-stone-950' : 'text-white'
          }`}
          aria-label="Ouvrir le menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-beige shadow-lg py-6 px-6 space-y-4 flex flex-col transition-all duration-300"
        >
          <button
            id="mob-link-about"
            onClick={() => scrollToSection('about')}
            className="text-left font-medium text-dark hover:text-accent tracking-wide py-2 cursor-pointer"
          >
            À Propos
          </button>
          <button
            id="mob-link-projects"
            onClick={() => scrollToSection('active-projects')}
            className="text-left font-medium text-dark hover:text-accent tracking-wide py-2 cursor-pointer"
          >
            Projets
          </button>
          <button
            id="mob-link-slider"
            onClick={() => scrollToSection('renovation-slider')}
            className="text-left font-medium text-dark hover:text-accent tracking-wide py-2 cursor-pointer"
          >
            Rénovations
          </button>
          <button
            id="mob-link-faq"
            onClick={() => scrollToSection('faq')}
            className="text-left font-medium text-dark hover:text-accent tracking-wide py-2 cursor-pointer"
          >
            FAQ
          </button>
        </div>
      )}
    </nav>
  );
}
