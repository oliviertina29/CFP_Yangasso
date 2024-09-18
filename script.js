// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    setupContactForm();
    initializeScrollAnimation();
});

// Fonction pour initialiser le défilement fluide
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Fonction pour configurer le formulaire de contact
function setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
                // Par exemple, avec fetch() ou XMLHttpRequest
                alert('Merci pour votre message. Nous vous contacterons bientôt !');
                this.reset();
            }
        });
    }
}

// Fonction pour initialiser l'animation au défilement
function initializeScrollAnimation() {
    const sections = document.querySelectorAll('main section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Fonction pour valider le formulaire de contact
function validateForm() {
    const name = document.querySelector('input[placeholder="Nom"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const message = document.querySelector('textarea[placeholder="Message"]').value;

    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return false;
    }

    return true;
}

// Fonction pour vérifier si l'email est valide
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
