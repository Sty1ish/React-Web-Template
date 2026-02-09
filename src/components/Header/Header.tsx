import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="text-xl font-bold">
          React Template
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to={ROUTES.HOME} className="hover:text-blue-600">
            홈
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            소개
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            문의
          </Link>
        </nav>

        {/* User Menu */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <User size={20} />
            <span>로그인</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              to={ROUTES.HOME}
              className="hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              소개
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              문의
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>로그인</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
