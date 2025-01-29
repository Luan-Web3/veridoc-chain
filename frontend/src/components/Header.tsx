import { useState, useCallback } from 'react';
import Link from 'next/link';

import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import { FaBitcoin } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

import Nav from './Nav';
import UploadSection from './Upload';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <header className="relative py-[100px] bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        
        <div className="absolute inset-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              style: {
                position: "absolute",
                width: "100%",
                height: "100%"
              },
              particles: {
                number: {
                  value: 40,
                  density: { enable: true, value_area: 800 }
                },
                color: { value: "#ffffff" },
                shape: {
                  type: "polygon",
                  polygon: { nb_sides: 6 }
                },
                opacity: {
                  value: 0.3,
                  random: false
                },
                size: {
                  value: 3,
                  random: true
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.2,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "bounce"
                }
              }
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 pt-16">
          
          <FaBitcoin size={72} className="mb-4" />

          <h1 className="text-5xl font-bold mb-4 text-center text-amber-300">
            Registre sua propriedade intelectual
          </h1>
          <p className="text-xl mb-8 text-center text-white/90">
            Proteja sua criação com a tecnologia blockchain
          </p>
          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold 
                       hover:bg-opacity-90 transition duration-300 flex items-center"
            >
              <FaBitcoin className="mr-2" /> Conectar Carteira Bitcoin
            </button>
          ) : (
            <UploadSection />
          )}
        </div>
      </header>
    </>
  );
}