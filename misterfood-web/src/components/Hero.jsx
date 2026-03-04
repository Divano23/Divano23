import React, { useState } from 'react';

const Hero = () => {
  // Estado para controlar si el menú de celular está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <section className="bg-mister-cream min-h-[80vh] flex flex-col relative overflow-hidden border-b-8 border-mister-gold">
      
      {/* 📱 NAVBAR RESPONSIVE */}
      <nav className="container mx-auto px-6 py-6 relative z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-black text-mister-red tracking-tighter">
            Mister<span className="text-gray-900">Food.</span>
          </div>

          {/* Enlaces para PC (Ocultos en celular) */}
          <div className="hidden md:flex gap-8 font-bold text-gray-700 uppercase tracking-widest text-sm">
            <a href="#carta" className="hover:text-mister-red transition">La Carta</a>
            <a href="#especialidades" className="hover:text-mister-red transition">Especialidades</a>
            <a href="#contacto" className="hover:text-mister-red transition">Ubicación</a>
          </div>

          {/* Botón Hamburguesa para Celular (Oculto en PC) */}
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden text-mister-red p-2 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Desplegable para Celular */}
        <div className={`md:hidden absolute left-0 right-0 bg-white shadow-2xl transition-all duration-300 ease-in-out origin-top ${menuAbierto ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          <div className="flex flex-col px-6 py-4 space-y-4 text-center font-bold uppercase tracking-wider text-mister-red border-t border-gray-100">
            <a href="#carta" onClick={() => setMenuAbierto(false)} className="py-2">La Carta</a>
            <a href="#especialidades" onClick={() => setMenuAbierto(false)} className="py-2">Especialidades</a>
            <a href="#contacto" onClick={() => setMenuAbierto(false)} className="py-2">Ubicación</a>
          </div>
        </div>
      </nav>

      {/* 🚀 CONTENIDO DEL HERO (Se adapta solo) */}
      <div className="container mx-auto px-6 flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 py-10 lg:py-0">
        
        {/* Panel de Texto */}
        <div className="flex-1 text-center lg:text-left mt-4 md:mt-0">
          <p className="text-mister-gold font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 text-xs md:text-sm">
            Tradición en el Terminal de Talca
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-mister-red leading-none mb-6 lg:mb-8 tracking-tighter">
            Mister<span className="text-gray-900">Food.</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed px-4 lg:px-0">
            Sabores de casa, porciones abundantes y las recetas de nuestra familia directo a tu mesa.
          </p>
          
          <a href="https://wa.me/56959073284" className="inline-flex items-center justify-center gap-3 bg-mister-gold hover:bg-mister-red text-white w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 rounded-sm font-bold shadow-xl transition-all duration-300 uppercase tracking-widest text-sm">
            Consultar Menú de Hoy
          </a>
        </div>
        
        {/* Panel de Imagen Responsiva */}
        <div className="flex-1 w-full relative mt-8 lg:mt-0 pb-12 lg:pb-0">
          <div className="hidden lg:block absolute inset-0 bg-mister-red transform translate-x-4 translate-y-4 rounded-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000" 
            className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-2xl z-10 border-4 border-white" 
            alt="Plato tradicional MisterFood" 
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;