// Menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Cambiar clase activa en navegación
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Contador de vistas simulado (para artículos)
    if (document.querySelector('.article-meta')) {
        const views = Math.floor(Math.random() * 500) + 50;
        const viewsElement = document.createElement('span');
        viewsElement.innerHTML = `<i class="far fa-eye"></i> ${views} visualizaciones`;
        document.querySelector('.article-meta').appendChild(viewsElement);
    }
    
    // Cargar artículos destacados dinámicamente
    loadFeaturedArticles();
});

// Datos de ejemplo para artículos
const articles = {
    saludMental: [
        {
            id: 1,
            title: "Ansiedad académica: cómo reconocerla y manejarla",
            excerpt: "La ansiedad académica no es solo 'estrés por exámenes'. Se manifiesta con insomnio, pensamientos recurrentes de fracaso...",
            date: "hace 2 días",
            readTime: "4 min de lectura",
            author: "NICKOLLAY PATRICIO ABAD VERA"
        },
        {
            id: 2,
            title: "\"No estás solo\": testimonios de estudiantes que buscan ayuda psicológica",
            excerpt: "Hablamos con tres estudiantes de diferentes carreras que decidieron acudir a terapia durante su vida universitaria...",
            date: "hace 5 días",
            readTime: "3 min de lectura",
            author: "MARÍA FERNANDA LÓPEZ"
        }
    ],
    discapacidadLaboral: [
        {
            id: 3,
            title: "Ley de inclusión laboral: ¿qué derechos tienes?",
            excerpt: "En Ecuador, la Ley Orgánica de Discapacidades (2012) establece que el 4% de plazas en empresas deben ser ocupadas...",
            date: "hace 3 días",
            readTime: "5 min de lectura",
            author: "MICHAEL RUBIO"
        },
        {
            id: 4,
            title: "Tecnología asistiva: herramientas que rompen barreras en el trabajo",
            excerpt: "Desde software de lectura de pantalla hasta teclados adaptados, la tecnología asistiva está revolucionando...",
            date: "hace 1 semana",
            readTime: "6 min de lectura",
            author: "JOAQUÍN PATIÑO"
        }
    ]
};

// Función para cargar artículos destacados
function loadFeaturedArticles() {
    // Esta función puede ser extendida para cargar datos desde una API
    console.log("Artículos cargados:", articles);
}

// Validación mejorada para formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación
            let errors = [];
            
            if (!name) errors.push("El nombre es obligatorio");
            if (!email) {
                errors.push("El correo electrónico es obligatorio");
            } else if (!isValidEmail(email)) {
                errors.push("El correo electrónico no es válido");
            }
            if (!message) errors.push("El mensaje es obligatorio");
            if (message.length < 10) errors.push("El mensaje es muy corto (mínimo 10 caracteres)");
            
            // Mostrar errores o enviar
            if (errors.length > 0) {
                alert("Por favor corrige los siguientes errores:\n\n" + errors.join("\n"));
                return;
            }
            
            // Simular envío (en un proyecto real, aquí iría una petición AJAX)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Te contactaremos en un plazo de 48 horas.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Redirigir a inicio después de éxito (opcional)
                // window.location.href = "index.html";
            }, 1500);
        });
    }
}

// Función para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para resaltar la página actual
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// Funcionalidades específicas para la página de Blog/Videos
function setupBlogPage() {
    // Contador de visualizaciones para videos (simulado)
    const videoCards = document.querySelectorAll('.video-card');
    if (videoCards.length > 0) {
        videoCards.forEach(card => {
            const views = Math.floor(Math.random() * 40) + 10;
            const viewsElement = document.createElement('p');
            viewsElement.className = 'video-views';
            viewsElement.innerHTML = `<i class="far fa-eye"></i> ${views} visualizaciones`;
            
            const videoInfo = card.querySelector('.video-info');
            const sourceElement = card.querySelector('.video-source');
            videoInfo.insertBefore(viewsElement, sourceElement.nextSibling);
        });
    }
    
    // Botón para compartir videos
    const shareButtons = document.querySelectorAll('.share-video');
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoTitle = this.closest('.video-card').querySelector('h4').textContent;
                const videoUrl = window.location.href;
                
                if (navigator.share) {
                    navigator.share({
                        title: videoTitle,
                        text: 'Mira este video en Conectando Miradas',
                        url: videoUrl
                    });
                } else {
                    // Fallback para navegadores que no soportan Web Share API
                    prompt('Comparte este enlace:', videoUrl);
                }
            });
        });
    }
    
    // Filtro por categorías (si se implementa en el futuro)
    const categoryFilters = document.querySelectorAll('.category-filter');
    if (categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filterVideosByCategory(category);
            });
        });
    }
}

// Función para filtrar videos por categoría
function filterVideosByCategory(category) {
    const videos = document.querySelectorAll('.video-card');
    const categories = document.querySelectorAll('.video-category');
    
    if (category === 'all') {
        videos.forEach(video => video.style.display = 'block');
        categories.forEach(cat => cat.style.display = 'block');
    } else {
        categories.forEach(cat => {
            if (cat.getAttribute('data-category') === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
}



// Llamar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    generateVideoPreviews();
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Tu código existente...
    
    // Inicializar funcionalidades del blog si estamos en esa página
    if (window.location.pathname.includes('blog.html')) {
        setupBlogPage();
    }
});S

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de contacto con validación mejorada
    setupContactForm();
    
    // Resaltar página actual
    highlightCurrentPage();
});