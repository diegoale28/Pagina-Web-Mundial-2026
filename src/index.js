import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MENÚ DESPLEGABLE INTERACTIVO (RESPONSIVO)
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // ==========================================
    // 2. EFECTO PARALLAX CONTROLADO POR SCROLL
    // ==========================================
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            let offset = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${offset * 0.35}px)`;
        });
    }

    // ==========================================
    // 3. CARRUSEL INFORMATIVO (INICIO)
    // ==========================================
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-control.next');
    const prevBtn = document.querySelector('.carousel-control.prev');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const updateSlidePosition = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition(currentIndex);
        });
    }

    // ==========================================
    // 4. EFECTO ACORDEÓN (SEDES Y ESTADIOS)
    // ==========================================
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const body = trigger.nextElementSibling;
            const isOpen = trigger.classList.contains('active');

            // Cierra los demás acordeones abiertos
            accordionTriggers.forEach(t => {
                t.classList.remove('active');
                t.nextElementSibling.style.maxHeight = null;
            });

            if (!isOpen) {
                trigger.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 5. TU LÓGICA ORIGINAL DE LOCALSTORAGE (REGISTRO)
    // ==========================================
    const form = document.getElementById('formRegistro');
    const tablaBody = document.querySelector('#tablaUsuarios tbody');
    const btnLimpiar = document.getElementById('btnLimpiar');

    function mostrarUsuarios() {
        if (!tablaBody) return; // Evita errores si no estamos en la página de registro
        tablaBody.innerHTML = '';
        const usuarios = JSON.parse(localStorage.getItem('usuariosMundial')) || [];
        
        usuarios.forEach(user => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.equipo}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const nuevoUsuario = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                equipo: document.getElementById('equipo').value
            };

            const usuarios = JSON.parse(localStorage.getItem('usuariosMundial')) || [];
            usuarios.push(nuevoUsuario);

            localStorage.setItem('usuariosMundial', JSON.stringify(usuarios));
            
            form.reset(); 
            mostrarUsuarios(); 
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            localStorage.removeItem('usuariosMundial');
            mostrarUsuarios();
        });
    }

    // Carga inicial de usuarios
    mostrarUsuarios();
});