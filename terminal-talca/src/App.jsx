import React, { useState, useEffect } from 'react'
import axios from 'axios'

const styles = `
  @keyframes scroll-continuous {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll-continuous {
    display: flex;
    width: max-content;
    animation: scroll-continuous 60s linear infinite;
  }
  .animate-scroll-continuous:hover { animation-play-state: paused; }

  @keyframes scroll-logos {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll-logos {
    display: flex;
    gap: 2rem;
    width: max-content;
    animation: scroll-logos 40s linear infinite;
  }
  .animate-scroll-logos:hover { animation-play-state: paused; }

  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator,
  input[list]::-webkit-calendar-picker-indicator {
    cursor: pointer; opacity: 0.8; filter: invert(1);
  }
`;

// --- DATOS TURÍSTICOS ---
const tourismAttractions = [
  { id: 1, title: "Radal Siete Tazas", location: "Molina", img: "https://images.unsplash.com/photo-1596489432377-cd583344d56d?q=80&w=600", desc: "Parque Nacional con caídas de agua y pozones turquesa.", buses: "Buses Radal", coords: "Ruta K-151", type: "Naturaleza" },
  { id: 2, title: "Piedra de la Iglesia", location: "Constitución", img: "https://images.unsplash.com/photo-1518182170546-0766be62843d?q=80&w=600", desc: "Gigantescas rocas en medio del mar.", buses: "Buses Constitución", coords: "Costanera Mar", type: "Costa" },
  { id: 3, title: "Lago Colbún", location: "Colbún", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600", desc: "El embalse más grande del país.", buses: "Buses TPL", coords: "Ribera Sur", type: "Lago" }
];

// --- DATOS GASTRONÓMICOS ---
const foodAttractions = [
  { id: 101, title: "Mister Bread", location: "Talca", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600", desc: "Panadería artesanal con tradición.", buses: "Líneas 1, 2 y 5", coords: "Centro de Talca", type: "Bakery" },
  { id: 102, title: "Mister Food", location: "Talca", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600", desc: "La mejor sazón de la zona.", buses: "Colectivos Centro", coords: "Sector Comercial", type: "Restaurante" }
];

const duplicatedTourism = [...tourismAttractions, ...tourismAttractions];
const duplicatedFood = [...foodAttractions, ...foodAttractions];

const companies = [
  { name: "Turbus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Tur_Bus_logo.svg/320px-Tur_Bus_logo.svg.png" },
  { name: "Pullman Bus", logo: "https://seeklogo.com/images/P/pullman-bus-logo-12C827D714-seeklogo.com.png" },
  { name: "Cikbus", logo: "https://cl.busbud.com/pub/media/logo/cikbus_elite.png" },
  { name: "TPL", logo: "https://cl.busbud.com/pub/media/logo/talca_paris_londres.png" },
  { name: "Condor Bus", logo: "https://www.condorbus.cl/wp-content/uploads/2023/06/logo-condor-bus.png" }
];
const duplicatedCompanies = [...companies, ...companies];

const chileanTerminals = ["Santiago (Terminal Sur)", "Santiago (Alameda)", "Viña del Mar", "Valparaíso", "Concepción", "Chillán", "Los Ángeles", "Temuco", "Valdivia", "Curicó", "Linares", "Cauquenes", "Constitución", "San Fernando", "Rancagua"];

function App() {
  const [salidas, setSalidas] = useState([]);
  const [salidasFiltradas, setSalidasFiltradas] = useState([]);
  const [busquedaDestino, setBusquedaDestino] = useState("");
  const [horaActual, setHoraActual] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [clima, setClima] = useState({ temp: '--', desc: 'Cargando...', icon: '⌛' });
  const [nuevoBus, setNuevoBus] = useState({ destino: '', hora: '', empresa: '', anden: '', estado: 'A Tiempo' });

  const obtenerClima = async () => {
    try {
      const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-35.4277&longitude=-71.6542&current_weather=true&timezone=America/Santiago');
      setClima({ temp: Math.round(res.data.current_weather.temperature), desc: 'Despejado', icon: '☀️' });
    } catch (err) { console.error("Error Clima:", err); }
  };

  const cargarTodo = () => {
    const mockData = [
        { id: 1, destino: 'Santiago', empresa: 'Pullman Bus', hora: '13:15', anden: '1', estado: 'A Tiempo' },
        { id: 2, destino: 'Linares', empresa: 'TPL', hora: '13:30', anden: '2', estado: 'A Tiempo' },
        { id: 3, destino: 'Concepción', empresa: 'Cikbus', hora: '13:45', anden: '4', estado: 'A Tiempo' },
        { id: 4, destino: 'Chillán', empresa: 'Turbus', hora: '14:00', anden: '3', estado: 'Demorado' }
    ];
    setSalidas(mockData); setSalidasFiltradas(mockData);
  };

  useEffect(() => {
    cargarTodo(); obtenerClima();
    const timer = setInterval(() => setHoraActual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const filtrados = salidas.filter(b => b.destino.toLowerCase().includes(busquedaDestino.toLowerCase()));
    setSalidasFiltradas(filtrados);
    const element = document.getElementById('horarios');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.user === 'admin' && loginData.pass === '1234') { setIsAdmin(true); setShowLogin(false); } 
    else alert("Error: admin / 1234");
  };

  const agregarBus = (e) => {
    e.preventDefault();
    const nuevaLista = [...salidas, { ...nuevoBus, id: Date.now() }];
    setSalidas(nuevaLista); setSalidasFiltradas(nuevaLista);
    setNuevoBus({ destino: '', hora: '', empresa: '', anden: '', estado: 'A Tiempo' });
  };

  const eliminarBus = (id) => {
    const nuevaLista = salidas.filter(b => b.id !== id);
    setSalidas(nuevaLista); setSalidasFiltradas(nuevaLista);
  };

  return (
    // FONDO GRIS ANTRACITA (Estructura metálica del terminal)
    <div className="min-h-screen bg-[#2A2D34] font-sans text-slate-100 relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* 0. BARRA SUPERIOR */}
      <div className="bg-[#1E2025] border-b border-white/5 py-2 px-6 flex justify-between items-center text-xs font-medium z-50 relative shadow-sm">
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-4">
             <a href="tel:131" className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32021]/20 text-[#E32021] hover:bg-[#E32021] hover:text-white border border-[#E32021]/30 transition-colors">131 SAMU</a>
             <a href="tel:132" className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32021]/20 text-[#E32021] hover:bg-[#E32021] hover:text-white border border-[#E32021]/30 transition-colors">132 Bomberos</a>
             <a href="tel:133" className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#8DC63F]/20 text-[#8DC63F] hover:bg-[#8DC63F] hover:text-[#1E2025] border border-[#8DC63F]/30 transition-colors">133 Carabineros</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)} className="text-xs font-bold uppercase hover:text-[#8DC63F] transition-colors">{isAdmin ? "Cerrar Sesión" : "Intranet"}</button>
        </div>
      </div>

      {/* 1. NAVBAR */}
      <header className="bg-[#2A2D34] text-white p-4 sticky top-0 z-40 shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO TBT IMITANDO LA FACHADA */}
          <div className="flex items-center gap-4">
            <div className="flex items-baseline font-black tracking-tighter text-4xl leading-none">
              <span className="text-[#E32021]">tb</span>
              <span className="text-[#8DC63F]">t</span>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <h1 className="font-medium text-lg uppercase tracking-widest leading-none">Terminal</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase">De buses de Talca</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase">
            <a href="#horarios" className="hover:text-[#8DC63F] transition-colors">Salidas</a>
            <a href="#cultura" className="hover:text-[#8DC63F] transition-colors">Turismo</a>
            <a href="#gastronomia" className="hover:text-[#8DC63F] transition-colors">Gastronomía</a>
            <div className="border-l border-white/20 pl-4">
              <p className="text-[10px] text-gray-400">Hora Local</p>
              <p className="text-lg font-mono text-[#8DC63F]">{horaActual.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-sm font-bold uppercase animate-fade-in pb-2">
            <a href="#horarios" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8DC63F] block">Salidas</a>
            <a href="#cultura" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8DC63F] block">Turismo</a>
            <a href="#gastronomia" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8DC63F] block">Gastronomía</a>
          </div>
        )}
      </header>

      {/* 2. HERO CON BUSCADOR */}
      <div className="relative h-[400px] bg-[#1E2025] overflow-hidden border-b border-[#E32021]/20">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Terminal" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2D34] via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center pb-20">
          <h2 className="text-white text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">Conectando <br/><span className="text-[#8DC63F]">Toda la región</span></h2>
          <div className="bg-[#353941] p-2 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row gap-2 border border-white/10">
             <input type="text" value="Talca" readOnly className="flex-1 p-3 md:p-4 bg-[#2A2D34] text-white rounded-xl font-bold border border-white/5 outline-none cursor-not-allowed opacity-70" />
             <div className="flex-1 relative">
                <input 
                  type="text" list="lista-terminales" placeholder="¿Hacia dónde vas?" 
                  className="w-full p-3 md:p-4 bg-[#2A2D34] text-white rounded-xl font-bold border border-white/10 outline-none focus:border-[#8DC63F] transition-colors" 
                  value={busquedaDestino} onChange={(e) => setBusquedaDestino(e.target.value)} 
                />
                <datalist id="lista-terminales">
                  {chileanTerminals.map((city, idx) => <option key={idx} value={city} />)}
                </datalist>
             </div>
             {/* BOTÓN ROJO TBT */}
             <button onClick={handleSearch} className="bg-[#E32021] hover:bg-[#c81b1c] text-white font-black rounded-xl px-10 py-3 md:py-4 shadow-lg transition-all uppercase">Buscar Salidas</button>
          </div>
        </div>
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 pb-20 space-y-16">
        
        {isAdmin && (
          <div className="bg-[#353941] rounded-[32px] shadow-2xl border-t-8 border-[#8DC63F] p-8">
             <h2 className="font-black uppercase tracking-tighter text-2xl mb-6 text-white">⚙️ Gestión Divano Solutions</h2>
             <form onSubmit={agregarBus} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#2A2D34] p-6 rounded-2xl border border-white/5">
                <input list="lista-terminales" placeholder="Destino" className="p-3 bg-[#353941] border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#8DC63F]" value={nuevoBus.destino} onChange={e => setNuevoBus({...nuevoBus, destino: e.target.value})} required />
                <input type="time" className="p-3 bg-[#353941] border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#8DC63F]" value={nuevoBus.hora} onChange={e => setNuevoBus({...nuevoBus, hora: e.target.value})} required/>
                <input placeholder="Empresa" className="p-3 bg-[#353941] border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#8DC63F]" value={nuevoBus.empresa} onChange={e => setNuevoBus({...nuevoBus, empresa: e.target.value})} required/>
                <input placeholder="Andén" className="p-3 bg-[#353941] border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#8DC63F]" value={nuevoBus.anden} onChange={e => setNuevoBus({...nuevoBus, anden: e.target.value})} required/>
                <button className="md:col-span-4 bg-[#8DC63F] text-[#1E2025] font-black p-4 rounded-xl uppercase hover:bg-[#7CB342] transition-colors">Publicar en Monitor</button>
             </form>
          </div>
        )}

        <section id="horarios" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3"><span className="w-2 h-6 bg-[#E32021]"></span>Próximas Salidas</h3>
            {salidasFiltradas.length > 0 ? salidasFiltradas.map((bus) => (
              <div key={bus.id} className="bg-[#353941] rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:border-[#8DC63F] transition-all cursor-pointer gap-4 md:gap-0">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8DC63F] font-black uppercase tracking-[0.2em]">{bus.empresa}</span>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{bus.destino}</h4>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t border-white/10 md:border-none pt-4 md:pt-0">
                  <div className="text-center"><p className="text-[9px] font-bold text-gray-400 uppercase">Andén</p><p className="text-xl font-black text-[#E32021]">{bus.anden}</p></div>
                  <div className="text-right"><p className="text-3xl font-black text-white leading-none">{bus.hora}</p></div>
                  {isAdmin && <button onClick={() => eliminarBus(bus.id)} className="bg-red-900/30 text-[#E32021] p-2 rounded-full hover:bg-[#E32021] hover:text-white transition-all">✕</button>}
                </div>
              </div>
            )) : <div className="bg-[#353941] text-slate-400 p-12 text-center rounded-2xl border-2 border-dashed border-white/10 uppercase font-black">Sin registros</div>}
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#353941] text-white p-6 rounded-[32px] shadow-xl border-b-8 border-[#8DC63F] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div><p className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#8DC63F]">Talca Hoy</p><div className="text-6xl font-black tracking-tighter">{clima.temp}°</div></div>
                    <span className="text-5xl">{clima.icon}</span>
                  </div>
                  <p className="text-[10px] mt-4 font-black uppercase tracking-widest border-b border-white/10 pb-4 text-slate-300">{clima.desc}</p>
                </div>
            </div>
          </div>
        </section>

        <section className="py-8 border-y border-white/5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Empresas Asociadas</h3>
            <div className="relative w-full overflow-hidden">
              <div className="flex animate-scroll-logos">
                {duplicatedCompanies.map((company, i) => (
                  <div key={i} className="bg-[#353941] w-40 h-24 rounded-2xl border border-white/5 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <img src={company.logo} alt={company.name} className="h-8 object-contain opacity-80 hover:opacity-100 mix-blend-screen" />
                  </div>
                ))}
              </div>
            </div>
        </section>
        {/* SECCIÓN GASTRONOMÍA */}
        <section id="gastronomia" className="overflow-hidden py-4 mb-8">
            <h3 className="text-3xl font-black text-white uppercase pl-4 border-l-8 border-[#8DC63F] mb-8 ml-4">Ruta Gastronómica</h3>
            <div className="animate-scroll-continuous gap-6" style={{ animationDirection: 'reverse' }}>
              {duplicatedFood.map((item, index) => (
                <div key={index} onClick={() => setSelectedItem(item)} className="min-w-[300px] h-[200px] rounded-[32px] overflow-hidden relative group cursor-pointer border-4 border-[#353941] hover:border-[#8DC63F] transition-colors">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" alt={item.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1E2025] to-transparent p-6 flex flex-col justify-end text-white">
                     <h4 className="font-black text-lg uppercase">{item.title}</h4>
                     <p className="text-[#8DC63F] text-[10px] font-black uppercase tracking-widest">{item.type} • {item.location}</p>
                   </div>
                </div>
              ))}
            </div>
        </section>

        {/* Módulos de Turismo usando bordes Rojos y Verdes */}
        <section id="cultura" className="overflow-hidden py-4">
            <h3 className="text-3xl font-black text-white uppercase pl-4 border-l-8 border-[#E32021] mb-8 ml-4">Turismo Regional</h3>
            <div className="animate-scroll-continuous gap-6">
              {duplicatedTourism.map((item, index) => (
                <div key={index} onClick={() => setSelectedItem(item)} className="min-w-[300px] h-[200px] rounded-[32px] overflow-hidden relative group cursor-pointer border-4 border-[#353941] hover:border-[#E32021] transition-colors">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" alt={item.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1E2025] to-transparent p-6 flex flex-col justify-end text-white">
                     <h4 className="font-black text-lg uppercase">{item.title}</h4>
                     <p className="text-[#8DC63F] text-[10px] font-black uppercase tracking-widest">{item.location}</p>
                   </div>
                </div>
              ))}
            </div>
        </section>

        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#2A2D34] w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative border-b-[12px] border-[#8DC63F]">
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-10 bg-black/40 hover:bg-[#E32021] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border border-white/20">✕</button>
              <div className="md:w-1/2 h-64 md:h-auto"><img src={selectedItem.img} className="w-full h-full object-cover opacity-90" alt={selectedItem.title} /></div>
              <div className="md:w-1/2 p-8 md:p-12 bg-[#2A2D34]">
                <h2 className="text-4xl font-black text-white uppercase mb-2">{selectedItem.title}</h2>
                <p className="text-[#8DC63F] font-bold text-sm uppercase tracking-widest mb-6">📍 {selectedItem.coords}</p>
                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed font-medium">{selectedItem.desc}</p>
                  <button onClick={() => { setBusquedaDestino(selectedItem.location); setSelectedItem(null); handleSearch(); }} className="w-full bg-[#E32021] hover:bg-[#c81b1c] text-white font-black py-5 rounded-2xl transition-all uppercase shadow-xl">Ver Pasajes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER INSPIRADO EN TURBUS PERO CON PALETA TBT */}
      <footer className="bg-[#1E2025] text-white pt-16 pb-12 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
           <div className="col-span-2">
             <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline font-black tracking-tighter text-4xl leading-none">
                  <span className="text-[#E32021]">tb</span><span className="text-[#8DC63F]">t</span>
                </div>
               <span className="font-medium text-xl uppercase tracking-widest text-slate-300">Terminal de Talca</span>
             </div>
             <p className="text-slate-400 text-sm max-w-sm font-medium mb-4">
                Administración Terminal de Buses SpA<br/>
                RUT: 76.000.000-0<br/>
                Dirección: Calle 2 Sur 1920, Talca, Región del Maule.
             </p>
             <div className="flex items-center gap-3 mt-6">
                <span className="text-3xl text-[#8DC63F]">📞</span>
                <div>
                  <p className="text-[#8DC63F] font-black text-sm uppercase">¿Necesitas ayuda?</p>
                  <p className="font-bold">+56 71 200 0000</p>
                </div>
             </div>
           </div>
           
           <div>
             <h4 className="text-white font-black uppercase text-sm mb-6 tracking-widest">Servicios</h4>
             <ul className="space-y-3 text-slate-400 text-sm font-medium">
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Custodia de equipaje</li>
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Locales comerciales</li>
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Encomiendas</li>
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Estacionamiento</li>
             </ul>
           </div>

           <div>
             <h4 className="text-white font-black uppercase text-sm mb-6 tracking-widest">Información</h4>
             <ul className="space-y-3 text-slate-400 text-sm font-medium">
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Canales de atención</li>
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Normas del recinto</li>
               <li className="hover:text-[#8DC63F] cursor-pointer transition-colors">• Trabaja con nosotros</li>
             </ul>
             <div className="mt-12 text-left md:text-right">
                <p className="text-[10px] font-black uppercase text-slate-500">Desarrollo por</p>
                <p className="text-xl font-black tracking-tighter text-white uppercase">Divano Solutions</p>
             </div>
           </div>
        </div>

        {/* BOTÓN FLOTANTE WHATSAPP ESTILO TURBUS */}
        <a href="#" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <form onSubmit={handleLogin} className="bg-[#2A2D34] p-12 rounded-[40px] w-full max-w-sm border-b-8 border-[#E32021] shadow-2xl relative border border-white/10">
            <button onClick={() => setShowLogin(false)} type="button" className="absolute top-8 right-8 text-slate-400 font-bold hover:text-[#E32021]">✕</button>
            <h2 className="text-center font-black uppercase mb-8 text-white">Intranet TBT</h2>
            <input type="text" placeholder="Usuario" className="w-full p-4 bg-[#353941] text-white rounded-2xl mb-4 border border-white/10 outline-none focus:border-[#8DC63F]"/>
            <input type="password" placeholder="Pass" className="w-full p-4 bg-[#353941] text-white rounded-2xl mb-8 border border-white/10 outline-none focus:border-[#8DC63F]"/>
            <button className="w-full bg-[#E32021] hover:bg-[#c81b1c] text-white p-5 rounded-2xl font-black uppercase shadow-xl transition-colors">Ingresar</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App;