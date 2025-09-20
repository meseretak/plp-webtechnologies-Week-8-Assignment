// Dark/Light Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if(contactForm){
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if(name === "" || email === "" || message === ""){
            formMessage.textContent = "Please fill out all fields.";
            formMessage.style.color = "red";
            return;
        }
        formMessage.textContent = "Message sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
    });
}
