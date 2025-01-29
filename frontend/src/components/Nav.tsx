import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaBitcoin } from 'react-icons/fa';

interface NavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Nav = ({ isMenuOpen, setIsMenuOpen, isLoggedIn, setIsLoggedIn }: NavProps) => {
  return (
    <nav className="fixed w-full z-50">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <span className="text-xl font-bold text-white flex items-center justify-center gap-2"><FaBitcoin /> VeriDoc</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#sobre">
                <span className="text-white/90 hover:text-white transition-colors">Sobre</span>
              </Link>
              <Link href="#como-funciona">
                <span className="text-white/90 hover:text-white transition-colors">Como Funciona</span>
              </Link>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md 
                         border border-white/20 transition-all text-white flex items-center"
              >
                <FaBitcoin className="mr-2" />
                {isLoggedIn ? 'Logout' : 'Conectar Carteira'}
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-4 backdrop-blur-md bg-white/5">
            <Link href="#sobre">
              <span className="block text-white/90 hover:text-white">Sobre</span>
            </Link>
            <Link href="#como-funciona">
              <span className="block text-white/90 hover:text-white">Como Funciona</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;