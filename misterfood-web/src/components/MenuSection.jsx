import React from 'react';

const MenuSection = () => {
  const carta = [
    {
      categoria: "Para Empezar",
      items: [
        { nombre: "Consomé de Ave", desc: "Reconfortante y caliente, ideal para el viajero." },
        { nombre: "Ensalada Surtida", desc: "Vegetales frescos de la zona seleccionados del día." },
        { nombre: "Empanadas Caseras", desc: "Nuestra clásica masa horneada rellena de pino tradicional." }
      ]
    },
    {
      categoria: "Nuestros Clásicos (Platos de Fondo)",
      items: [
        { nombre: "Cazuela de Vacuno", desc: "El orgullo de la casa, con osobuco, choclo, zapallo y arroz." },
        { nombre: "Porotos con Riendas", desc: "Receta de la abuela, contundentes y llenos de sabor." },
        { nombre: "Carne al Horno", desc: "Cocción lenta para garantizar la máxima suavidad." },
        { nombre: "Pescado Frito", desc: "Crujiente por fuera, suave por dentro." },
        { nombre: "Cerdo BBQ", desc: "Toque moderno con el adobo secreto de la familia." },
        { nombre: "Guatitas a la Jardinera", desc: "Un clásico chileno preparado con dedicación." }
      ]
    },
    {
      categoria: "Acompañamientos",
      items: [
        { nombre: "Arroz Graneado", desc: "Suelto y sabroso." },
        { nombre: "Puré de Papas", desc: "Cremoso, hecho con papas naturales." },
        { nombre: "Papas Mayo", desc: "El acompañamiento frío tradicional." },
        { nombre: "Spaghetti", desc: "Al dente." }
      ]
    }
  ];

  return (
    <section id="carta" className="bg-white py-24 px-6 relative z-20">
      <div className="container mx-auto max-w-5xl">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-mister-red uppercase tracking-tight mb-4">Nuestra Carta</h2>
          <div className="w-24 h-1.5 bg-mister-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {carta.map((seccion, idx) => (
            <div key={idx} className={idx === 1 ? "md:col-span-2 md:w-2/3 md:mx-auto text-center md:mt-8" : ""}>
              <h3 className="text-3xl font-black text-gray-900 mb-8 pb-4 border-b-2 border-mister-cream uppercase">
                {seccion.categoria}
              </h3>
              <div className="flex flex-col gap-6">
                {seccion.items.map((plato, i) => (
                  <div key={i} className={`group ${idx === 1 ? "md:items-center" : ""}`}>
                    <h4 className="text-xl font-black text-mister-red uppercase tracking-tight mb-1">
                      {plato.nombre}
                    </h4>
                    <p className="text-gray-600 font-medium">
                      {plato.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuSection;