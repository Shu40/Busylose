// Initialize Lucide icons
lucide.createIcons();

// Loader Dismissal
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
});

// Navigation logic (Page Switcher)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function openPage(targetId) {
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    // Hide all sections
    sections.forEach(s => s.classList.remove('active'));
    // Show target section
    targetSection.classList.add('active');

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Refresh Icons
    lucide.createIcons();
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        openPage(targetId);
        
        // Close mobile menu if open
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            const icon = mobileToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});

// Handle initial hash or default to home
window.addEventListener('load', () => {
    const initialHash = window.location.hash || '#home';
    openPage(initialHash);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-up').forEach(el => {
    observer.observe(el);
});

// Documentation Dashboard Logic
const docTabs = document.querySelectorAll('.doc-tab');
const docPanes = document.querySelectorAll('.doc-pane');

docTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        // Update active tab
        docTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show target pane
        docPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === target) {
                pane.classList.add('active');
            }
        });
        
        // Re-init icons for new content if needed
        lucide.createIcons();
    });
});

// Mobile menu toggle logic
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});
// 3D Tilt Effect Logic
const tiltElements = document.querySelectorAll('.tilt-element');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const rotateX = (clientY - centerY) / 50;
    const rotateY = (centerX - clientX) / 50;

    tiltElements.forEach(el => {
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});
