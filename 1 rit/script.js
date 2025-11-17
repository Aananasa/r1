// Темная тема
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.onclick = () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

// Анимация hero при загрузке
window.addEventListener('load', () => {
    document.querySelector('.hero-content').classList.add('visible');
});

// Валидация формы с согласием
const form = document.getElementById('contact-form');
if (form) {
    form.onsubmit = e => {
        e.preventDefault();
        const consent = document.getElementById('consent');
        let valid = true;
        form.querySelectorAll('input[required]:not(#consent), textarea[required]').forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });
        if (!consent.checked) {
            valid = false;
            alert('Пожалуйста, согласитесь на обработку данных.');
        }
        if (valid) {
            // Симуляция фиксации согласия (в реальности — backend)
            const consentData = {
                date: new Date().toISOString(),
                ip: 'user-ip-placeholder', // Получите реальный IP через API
                userAgent: navigator.userAgent
            };
            console.log('Согласие зафиксировано:', consentData); // Для лога
            alert('Сообщение отправлено! Согласие зафиксировано.');
            form.reset();
        }
    };
}

// Cookie баннер
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');
const configureCookies = document.getElementById('configure-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
}

acceptCookies.onclick = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
};

configureCookies.onclick = () => {
    alert('Настройка cookies: Здесь можно добавить опции (аналитика/функциональные). Для простоты принимаем все.');
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
};

// Fade-in on scroll для секций и карточек
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Анимация карточек по одной
            if (entry.target.querySelectorAll('.service-card').length > 0) {
                entry.target.querySelectorAll('.service-card').forEach((card, index) => {
                    setTimeout(() => card.classList.add('visible'), index * 150);
                });
            }
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));