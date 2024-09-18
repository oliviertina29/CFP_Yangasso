// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
            // Par exemple, avec fetch() ou XMLHttpRequest
            alert('Merci pour votre message. Nous vous contacterons bientôt !');
            this.reset();
        });
    }

    // Animation simple pour les sections au défilement
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
});

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
