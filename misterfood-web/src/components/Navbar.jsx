import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#8B3A1C] text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter">MisterFood</span>
        </div>
        <div className="hidden md:flex gap-6 font-medium">
          <a href="#inicio" className="hover:text-[#D97706] transition">Inicio</a>
          <a href="#menu" className="hover:text-[#D97706] transition">Menú</a>
          <a href="#ubicacion" className="hover:text-[#D97706] transition">Ubicación</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;