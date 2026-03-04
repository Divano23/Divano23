// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sistema Farmacia Noly v2 inicializado.');
    
    // Lógica del Carrusel Hero
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Función para mostrar un slide específico
    const showSlide = (index) => {
        // Ocultar todos los slides bajando la opacidad y poniéndolos al fondo
        slides.forEach(slide => {
            slide.classList.remove('opacity-100', 'z-10');
            slide.classList.add('opacity-0', 'z-0');
        });
        
        // Resetear todos los puntitos
        dots.forEach(dot => {
            dot.classList.remove('w-8', 'bg-noly-teal');
            dot.classList.add('w-3', 'bg-white/70');
        });

        // Mostrar el slide actual
        slides[index].classList.remove('opacity-0', 'z-0');
        slides[index].classList.add('opacity-100', 'z-10');
        
        // Activar el puntito correspondiente
        dots[index].classList.remove('w-3', 'bg-white/70');
        dots[index].classList.add('w-8', 'bg-noly-teal');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        showSlide(currentSlide);
    };

    // Eventos para los botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Eventos para los puntitos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoPlay();
        });
    });

    // Función para que avance solo cada 5 segundos
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    };

    // Función para reiniciar el contador si el usuario hace clic manualmente
    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Iniciar el carrusel
    if (slides.length > 0) {
        startAutoPlay();
    }
});
