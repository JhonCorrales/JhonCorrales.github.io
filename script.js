// JavaScript para la Hoja de Vida Interactiva
// Autor: Jhon Patricio Corrales Almendáriz

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initSkillBars();
    initSmoothScrolling();
    initTypewriterEffect();
    initParallaxEffect();
    initLoadingAnimation();
});

/**
 * Animaciones de scroll para elementos que aparecen al entrar en vista
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animar barras de habilidades cuando la sección entra en vista
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.section, .education-item, .experience-item, .project-card, .certification-card, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Marcar la sección de skills para animación especial
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsSection.classList.add('skills-section');
        observer.observe(skillsSection);
    }
}

/**
 * Inicializa las barras de progreso de habilidades
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

/**
 * Anima las barras de habilidades cuando entran en vista
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute('data-skill');
        
        setTimeout(() => {
            bar.style.width = skillLevel + '%';
            
            // Agregar efecto de pulso a la barra
            bar.addEventListener('transitionend', function() {
                this.style.animation = 'pulse 0.5s ease-in-out';
            });
        }, index * 200); // Delay escalonado para efecto secuencial
    });
}

/**
 * Navegación suave entre secciones
 */
function initSmoothScrolling() {
    // Crear navegación flotante (opcional)
    createFloatingNavigation();
    
    // Agregar scroll suave a todos los enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Crea una navegación flotante para saltar entre secciones
 */
function createFloatingNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'floating-nav';
    nav.innerHTML = `
        <div class="nav-item" data-section="about" title="Sobre Mí">
            <i class="fas fa-user"></i>
        </div>
        <div class="nav-item" data-section="education" title="Educación">
            <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="nav-item" data-section="experience" title="Experiencia">
            <i class="fas fa-briefcase"></i>
        </div>
        <div class="nav-item" data-section="skills" title="Habilidades">
            <i class="fas fa-tools"></i>
        </div>
        <div class="nav-item" data-section="projects" title="Proyectos">
            <i class="fas fa-project-diagram"></i>
        </div>
        <div class="nav-item" data-section="certifications" title="Certificaciones">
            <i class="fas fa-certificate"></i>
        </div>
        <div class="nav-item" data-section="contact" title="Contacto">
            <i class="fas fa-envelope"></i>
        </div>
    `;

    // Estilos para la navegación flotante
    const navStyles = `
        .floating-nav {
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 15px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .floating-nav.visible {
            opacity: 1;
        }
        
        .nav-item {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
            position: relative;
        }
        
        .nav-item:hover {
            background: var(--accent-color);
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(44, 90, 160, 0.4);
        }
        
        .nav-item i {
            color: white;
            font-size: 1.2rem;
        }
        
        .nav-item.active {
            background: var(--accent-color);
            transform: scale(1.1);
        }
        
        .nav-item::before {
            content: attr(title);
            position: absolute;
            right: 60px;
            background: var(--text-primary);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(10px);
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-item:hover::before {
            opacity: 1;
            transform: translateX(0);
        }
        
        @media (max-width: 768px) {
            .floating-nav {
                display: none;
            }
        }
    `;

    // Agregar estilos al head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = navStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(nav);

    // Funcionalidad de navegación
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mostrar navegación después del hero
    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        if (window.scrollY > heroHeight - 100) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }

        // Marcar sección activa
        updateActiveNavItem();
    });
}

/**
 * Actualiza el elemento activo en la navegación flotante
 */
function updateActiveNavItem() {
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navItems.forEach(item => item.classList.remove('active'));
            const activeItem = document.querySelector(`[data-section="${section.id}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }
    });
}

/**
 * Efecto de escritura para el título principal
 */
function initTypewriterEffect() {
    const heroName = document.querySelector('.hero-name');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroName && heroSubtitle) {
        const nameText = heroName.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroName.textContent = '';
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '0';
        
        // Escribir el nombre
        typeWriter(heroName, nameText, 100, () => {
            // Después mostrar el subtítulo
            heroSubtitle.style.opacity = '1';
            typeWriter(heroSubtitle, subtitleText, 50);
        });
    }
}

/**
 * Función auxiliar para el efecto de escritura
 */
function typeWriter(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }
    type();
}

/**
 * Efecto parallax sutil para el hero
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Animación de carga inicial
 */
function initLoadingAnimation() {
    // Crear overlay de carga
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Cargando Portfolio...</p>
        </div>
    `;

    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(loader);

    // Remover loader después de que la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                // Iniciar animaciones después de quitar el loader
                startInitialAnimations();
            }, 500);
        }, 1000);
    });
}

/**
 * Inicia las animaciones iniciales después de cargar
 */
function startInitialAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Funciones utilitarias adicionales
 */

// Detectar si el usuario prefiere movimiento reducido
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Throttle para optimizar eventos de scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar eventos de scroll
const optimizedScrollHandler = throttle(function() {
    updateActiveNavItem();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

/**
 * Interacciones adicionales para mejor UX
 */

// Efecto de click en las tarjetas
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-card, .certification-card, .skill-item, .contact-item')) {
        const card = e.target.closest('.project-card, .certification-card, .skill-item, .contact-item');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// Copiar email al hacer click
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="mailto:"]')) {
        e.preventDefault();
        const email = e.target.closest('a').href.replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copiado al portapapeles!');
            });
        } else {
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Email copiado al portapapeles!');
        }
    }
});

/**
 * Mostrar notificaciones al usuario
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification-success {
            background: #27ae60;
        }
        
        .notification-error {
            background: #e74c3c;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar meta información para SEO y compartir
function addMetaTags() {
    const metaTags = [
        { property: 'og:title', content: 'Jhon Patricio Corrales Almendáriz - Desarrollador de Software' },
        { property: 'og:description', content: 'Especialista en Python y Machine Learning. Estudiante de Ingeniería en Sistemas con experiencia en desarrollo web y AI.' },
        { property: 'og:type', content: 'website' },
        { name: 'description', content: 'Portfolio profesional de Jhon Patricio Corrales Almendáriz, desarrollador especializado en Python, Machine Learning y desarrollo web.' },
        { name: 'keywords', content: 'desarrollador, python, machine learning, tensorflow, keras, javascript, web developer, AI, neural networks' },
        { name: 'author', content: 'Jhon Patricio Corrales Almendáriz' }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.property) meta.setAttribute('property', tag.property);
        if (tag.name) meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
    });
}

// Inicializar meta tags
addMetaTags();

console.log('🚀 Portfolio de Jhon Patricio Corrales Almendáriz cargado exitosamente!');
console.log('💼 Desarrollador de Software | Especialista en Python y Machine Learning');
console.log('📧 Contacto: jhon.corrales@ejemplo.com');
