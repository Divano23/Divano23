// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MÓDULO 1: CARRUSEL (Funcionalidad base) ---
    // (Mantén aquí tu lógica anterior del carrusel si la necesitas)

    // --- MÓDULO 2: CATÁLOGO DE OFERTAS (Estilo Cruz Verde) ---
    const ofertas = [
        { id: 1, nombre: 'Vitamina C 1000mg', precio: 4990, anterior: 6990, dcto: '28%', icon: 'fa-vial' },
        { id: 2, nombre: 'Protector Solar Eucerin', precio: 15990, anterior: 21990, dcto: '27%', icon: 'fa-sun' },
        { id: 3, nombre: 'Pañales Babysec G 40u', precio: 12990, anterior: 15490, dcto: '16%', icon: 'fa-baby' }
    ];

    const grid = document.getElementById('productos-oferta');
    
    if (grid) {
        ofertas.forEach(p => {
            const card = document.createElement('div');
            card.className = 'bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition relative flex flex-col h-full';
            card.innerHTML = `
                <span class="badge-promo">-${p.dcto}</span>
                <div class="h-40 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-noly-teal/40">
                    <i class="fa-solid ${p.icon} text-5xl"></i>
                </div>
                <h3 class="font-bold text-slate-800 mb-2 leading-tight flex-grow text-sm uppercase">${p.nombre}</h3>
                <div class="mt-4 border-t pt-4">
                    <p class="price-old">$${p.anterior.toLocaleString('es-CL')}</p>
                    <p class="text-2xl font-black text-noly-red">$${p.precio.toLocaleString('es-CL')}</p>
                    <button class="w-full mt-4 bg-noly-teal text-white font-black py-2 rounded-lg hover:bg-teal-600 transition text-xs uppercase">Agregar al carro</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- MÓDULO 3: REGISTRO EXPRESS DE PACIENTES ---
    const regForm = document.getElementById('express-register');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const paciente = {
                nombre: document.getElementById('reg-nombre').value,
                correo: document.getElementById('reg-correo').value,
                especialidad: document.getElementById('reg-especialidad').value
            };

            // Guardamos en LocalStorage para usarlo en la siguiente página
            localStorage.setItem('reserva_actual', JSON.stringify(paciente));

            alert(`¡Bienvenido ${paciente.nombre}! Ahora verás los detalles para tu cita de ${paciente.especialidad}.`);
            
            // Redirección a la ficha técnica
            window.location.href = 'detalle-especialidad.html'; 
        });
    }

    // --- MÓDULO 4: DETALLE DINÁMICO DE ESPECIALIDAD ---
    const infoEspecialidades = {
        limpieza: {
            titulo: "Limpieza Dental",
            img: "img/limpieza-dental.jpg",
            desc: "Nuestro tratamiento de profilaxis elimina el sarro acumulado y la placa bacteriana, previniendo enfermedades periodontales.",
            doctores: ["Dr. Ricardo Soto", "Dra. Ana María Jerez"]
        },
        ortodoncia: {
            titulo: "Ortodoncia Avanzada",
            img: "img/ortodoncia.jpg",
            desc: "Especialidad dedicada a corregir la posición de los dientes y problemas de mordida mediante brackets o alineadores.",
            doctores: ["Dra. Patricia Luna", "Dr. Felipe Castro"]
        },
        implantes: {
            titulo: "Implantes Dentales",
            img: "img/implantes-dentales.jpg",
            desc: "Restauración funcional y estética mediante tornillos de titanio que reemplazan piezas perdidas.",
            doctores: ["Dr. Carlos Méndez"]
        }
    };

    const tituloH1 = document.getElementById('esp-titulo');
    if (tituloH1) {
        const reserva = JSON.parse(localStorage.getItem('reserva_actual'));
        
        if (reserva && infoEspecialidades[reserva.especialidad]) {
            const datos = infoEspecialidades[reserva.especialidad];

            tituloH1.innerText = datos.titulo;
            document.getElementById('esp-img').src = datos.img;
            document.getElementById('esp-desc').innerText = datos.desc;

            const contenedorDoctores = document.getElementById('esp-doctores');
            contenedorDoctores.innerHTML = ''; // Limpiar antes de cargar
            
            datos.doctores.forEach(doc => {
                const div = document.createElement('div');
                div.className = "flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100";
                div.innerHTML = `<i class="fa-solid fa-user-doctor text-[#00acee]"></i> <span class="font-bold text-slate-700">${doc}</span>`;
                contenedorDoctores.appendChild(div);
            });
        }
    }
});