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

    document.querySelectorAll('.fade-up, .fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // --- Project Data ---
    const projects = {
        'mosque': {
            title: 'Mosque Treasury Management Web',
            desc: '<p>In this project, I designed and built a financial recording system that encompasses structured income and expenditure transactions, featuring automated calculations for real-time accuracy.</p>',
            img: 'images/image2.png',
            tech: ['PHP', 'Codeigniter 4', 'MySQL', 'Tailwind CSS']
        },
        'elearning': {
            title: 'E-Learning Platform Web',
            desc: '<p>A professional digital learning system that enables the structured management of course materials, student progress, and user roles within a centralized platform.</p>',
            img: 'images/image1.png',
            tech: ['PHP', 'Laravel', 'MySQL']
        },
        'ai_disease': {
            title: 'AI Disease Detection Web',
            desc: '<p>In this project, I implemented a machine learning classification model to analyze user health data inputs and generate automated disease predictions with high precision.</p>',
            img: 'images/image3.png',
            tech: ['Python', 'FastAPI', 'Scikit-learn', 'TensorFlow']
        }
    };

    // --- Modal Logic ---
    const overlay = document.getElementById('modal-overlay');
    const projectModal = document.getElementById('project-modal');
    const certModal = document.getElementById('cert-modal');
    
    // Project Modal Elements
    const modalImg = document.getElementById('modal-project-img');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalTech = document.getElementById('modal-project-tech');

    // Certificate Modal Elements
    const certImg = document.getElementById('modal-cert-img');

    function openModal(type, data) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        if (type === 'project') {
            const project = projects[data];
            modalImg.src = project.img;
            modalTitle.innerText = project.title;
            modalDesc.innerHTML = project.desc;
            
            modalTech.innerHTML = '';
            project.tech.forEach(t => {
                const span = document.createElement('span');
                span.className = 'skill-badge px-3 py-1 rounded-full border border-accent/30';
                span.innerText = t;
                modalTech.appendChild(span);
            });

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
