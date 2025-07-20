document.addEventListener('DOMContentLoaded', function() {
    const userOS = detectOS();
    highlightRecommendedDownload(userOS);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .download-card').forEach(card => {
        observer.observe(card);
    });
});

function detectOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Windows')) return 'windows';
    if (userAgent.includes('Mac')) return 'mac';
    if (userAgent.includes('Linux')) return 'linux';
    return 'unknown';
}

function highlightRecommendedDownload(os) {
    if (os !== 'unknown') {
        const recommendedCard = document.querySelector(`.download-card[data-os="${os}"]`);
        if (recommendedCard) {
            recommendedCard.style.border = `2px solid ${os === 'windows' ? '#0078d7' : os === 'mac' ? '#555' : '#333'}`;
            const badge = document.createElement('div');
            badge.textContent = 'Recommandé pour votre système';
            badge.style.backgroundColor = os === 'windows' ? '#0078d7' : os === 'mac' ? '#555' : '#333';
            badge.style.color = 'white';
            badge.style.padding = '5px 10px';
            badge.style.borderRadius = '20px';
            badge.style.fontSize = '0.8rem';
            badge.style.marginTop = '10px';
            recommendedCard.appendChild(badge);
        }
    }
}