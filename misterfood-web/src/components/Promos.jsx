import React, { useRef } from 'react';

const Promos = () => {
  const scrollRef = useRef(null);

  // Función para mover el carrusel con los botones
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Nuestra lista de promociones/productos destacados
  const promociones = [
    {
      id: 1,
      titulo: "1/4 Pollo con Papas",
      desc: "Pollo asado jugoso acompañado de abundantes papas fritas crujientes.",
      img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600"
    },
    {
      id: 2,
      titulo: "Desayuno de Campeones",
      desc: "Huevos revueltos de campo, pan amasado tostado y café para recargar energías.",
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600"
    },
    {
      id: 3,
      titulo: "Chorrillana Mister",
      desc: "Nuestra especialidad para compartir, con carne, cebolla, huevo y papas fritas.",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600"
    },
    {
      id: 4,
      titulo: "Pescado Frito",
      desc: "Pescado fresco con un batido crujiente, ideal con ensalada chilena o arroz.",
      img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=600"
    }
  ];

  return (
    <section className="bg-mister-cream py-20 px-6 border-t border-mister-red/10 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabecera del Carrusel */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-mister-red uppercase tracking-tight mb-2">
              Nuestras Especialidades
            </h2>
            <p className="text-gray-600 font-medium">Desliza para ver nuestros platos más pedidos</p>
          </div>
          
          {/* Botones de Navegación (Solo visibles en pantallas medianas/grandes) */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')} 
              className="bg-white border-2 border-mister-red text-mister-red hover:bg-mister-red hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="bg-white border-2 border-mister-red text-mister-red hover:bg-mister-red hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Contenedor del Carrusel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {promociones.map((promo) => (
            <div 
              key={promo.id} 
              className="snap-center shrink-0 w-[85vw] sm:w-[350px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col group border-b-8 border-mister-gold"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={promo.img} 
                  alt={promo.titulo} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase leading-tight mb-3">
                    {promo.titulo}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm mb-6">
                    {promo.desc}
                  </p>
                </div>
                <a 
                  href="https://wa.me/56959073284" 
                  className="bg-mister-red hover:bg-red-800 text-white text-center py-3 rounded-full font-bold transition w-full uppercase tracking-wider text-sm"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Promos;