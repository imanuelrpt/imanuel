document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in, .slide-up, .ppt-slide-in-left, .ppt-slide-in-right, .ppt-slide-in-up, .ppt-zoom-in, .section-slide-show').forEach(el => {
        observer.observe(el);
    });

    // --- Project Data ---
    const projects = {
        'GreenBite': {
            title: 'GreenBite Catering Web',
            desc: '<p>A modern catering website designed to help customers explore healthy menus, place orders, and access catering service information through a clean and professional interface.</p>',
            images: ['images/GB 1.jpeg', 'images/GB 2.jpeg', 'images/GB 3.jpeg', 'images/GB 4.jpeg', 'images/GB 5.jpeg'],
            tech: ['HTML', 'JAVASCRIPT', 'Tailwind CSS']
        },
        'GymElite': {
            title: 'GymElite Fitness Web',
            desc: '<p>A fitness and gym website featuring workout programs, membership plans, class schedules, and trainer information with a sporty and interactive design to enhance visitor engagement.</p>',
            images: ['images/GYM 1.jpeg', 'images/GYM 2.jpeg', 'images/GYM 3.jpeg', 'images/GYM 4.jpeg', 'images/GYM 5.jpeg'],
            tech: ['HTML', 'JAVASCRIPT', 'TAILWIND CSS']
        },
        'Matcha&Co': {
            title: 'Matcha&Co Web',
            desc: '<p>A matcha beverage brand website with an aesthetic and modern design focused on visual experience, product catalog presentation, and seamless online ordering for customers.</p>',
            images: ['images/Matcha 1.jpeg', 'images/Matcha 2.jpeg', 'images/Matcha 3.jpeg', 'images/Matcha 4.jpeg'],
            tech: ['HTML', 'JAVASCRIPT', 'TAILWIND CSS']
        },
        'TravelMate': {
            title: 'SkinHealth',
            desc: '<p>Check Skin Health is a website that helps users check their skin health through digital analysis and provides information along with skincare recommendations based on the examination results.</p>',
            images: ['images/Scanner 1.jpeg', 'images/Scanner 2.jpeg'],
            tech: ['Node.js', 'Python']
        },
        'EduPortal': {
            title: 'Resume Gen',
            desc: '<p>ResumeGenerator (ResumeGen) is a website that helps users create professional resumes quickly and easily with customizable templates and simple editing features.</p>',
            images: ['images/resume 1.jpeg', 'images/resume 2.jpeg', 'images/resume 3.jpeg'],
            tech: ['CodeIgniter', 'PHP', 'MySQL']
        },
        'CityPulse': {
            title: 'SIPALA',
            desc: '<p>SIPALA is an online public complaint management website that enables people to submit reports or complaints digitally, making the complaint process faster, easier, and more efficient.</p>',
            images: ['images/SIPALA 1.jpeg', 'images/SIPALA 2.jpeg', 'images/SIPALA 3.jpeg'],
            tech: ['Laravel', 'PHP', 'MySQL']
        }
    };

    // --- Modal Logic ---
    const overlay = document.getElementById('modal-overlay');
    const projectModal = document.getElementById('project-modal');
    const certModal = document.getElementById('cert-modal');

    // Project Modal Elements
    const modalTitle = document.getElementById('modal-project-title');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalTech = document.getElementById('modal-project-tech');

    // Modal carousel elements
    const modalCarouselTrack = document.getElementById('modal-carousel-track');
    const modalCarouselPrev = document.getElementById('modal-carousel-prev');
    const modalCarouselNext = document.getElementById('modal-carousel-next');
    const modalCarouselDots = document.getElementById('modal-carousel-dots');

    // Certificate Modal Elements
    const certImg = document.getElementById('modal-cert-img');

    // Modal carousel state
    let modalImages = [];
    let modalCurrentIndex = 0;

    function renderModalImages(images) {
        modalCarouselTrack.innerHTML = '';
        modalCarouselDots.innerHTML = '';
        modalImages = images || [];
        modalCurrentIndex = 0;

        modalImages.forEach((src, i) => {
            const item = document.createElement('div');
            item.className = 'modal-carousel-item';
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Project image ${i + 1}`;
            item.appendChild(img);
            modalCarouselTrack.appendChild(item);

            const dot = document.createElement('button');
            dot.className = 'modal-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToModalSlide(i));
            modalCarouselDots.appendChild(dot);
        });

        updateModalCarousel();
    }

    function updateModalCarousel() {
        const offset = -(modalCurrentIndex * 100);
        modalCarouselTrack.style.transform = `translateX(${offset}%)`;
        document.querySelectorAll('.modal-dot').forEach((d, i) => {
            d.classList.toggle('active', i === modalCurrentIndex);
        });
    }

    function goToModalSlide(index) {
        modalCurrentIndex = Math.max(0, Math.min(index, modalImages.length - 1));
        updateModalCarousel();
    }

    modalCarouselPrev.addEventListener('click', () => {
        if (modalCurrentIndex > 0) goToModalSlide(modalCurrentIndex - 1);
    });

    modalCarouselNext.addEventListener('click', () => {
        if (modalCurrentIndex < modalImages.length - 1) goToModalSlide(modalCurrentIndex + 1);
    });

    function openModal(type, data) {
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (type === 'project') {
            const project = projects[data];
            if (!project) {
                console.error(`Project not found: ${data}`);
                closeModal();
                return;
            }

            modalTitle.innerText = project.title;
            modalDesc.innerHTML = project.desc || '';

            modalTech.innerHTML = '';
            (project.tech || []).forEach(t => {
                const span = document.createElement('span');
                span.className = 'skill-badge px-3 py-1 rounded-full border border-accent/30';
                span.innerText = t;
                modalTech.appendChild(span);
            });

            // support both legacy `img` and new `images` array
            const imgs = project.images || (project.img ? [project.img] : []);
            renderModalImages(imgs);

            projectModal.classList.remove('hidden');
            certModal.classList.add('hidden');
        } else if (type === 'cert') {
            certImg.src = data;
            certModal.classList.remove('hidden');
            projectModal.classList.add('hidden');
        }
    }

    function closeModal() {
        overlay.classList.add('hidden');
        overlay.classList.remove('active');
        projectModal.classList.add('hidden');
        certModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Event Listeners
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal('project', projectId);
        });
    });

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-cert');
            openModal('cert', imgSrc);
        });
    });

    document.getElementById('close-project').addEventListener('click', closeModal);
    document.getElementById('close-cert').addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // --- Projects Carousel ---
    const carousel = document.getElementById('projects-carousel');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    const projectItems = document.querySelectorAll('.carousel-project-item');
    let currentIndex = 0;

    function getItemsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const itemsPerView = getItemsPerView();
        const numDots = Math.max(1, projectItems.length - itemsPerView + 1);
        
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const itemsPerView = getItemsPerView();
        const itemWidth = 100 / itemsPerView;
        const offset = -(currentIndex * itemWidth);
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, projectItems.length - itemsPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }

    function nextSlide() {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, projectItems.length - itemsPerView);
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }

    carouselNextBtn.addEventListener('click', nextSlide);
    carouselPrevBtn.addEventListener('click', prevSlide);

    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        createDots();
        updateCarousel();
    });

    // Initialize carousel
    createDots();
    updateCarousel();

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />`;
            document.body.style.overflow = 'auto';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });
});
