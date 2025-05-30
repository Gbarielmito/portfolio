const depoimentos = document.querySelector('.depoimentos');
const bgIcons = document.querySelector('.bg-icons');
const observer = new IntersectionObserver(
  ([entry]) => {
    if(entry.isIntersecting) {
      bgIcons.classList.add('visivel-depoimentos');
    } else {
      bgIcons.classList.remove('visivel-depoimentos');
    }
  },
  { threshold: 0.3 }
);
if(depoimentos) observer.observe(depoimentos);

const depoFlex = document.querySelector('.depoimentos .flex');
const btnPrev = document.getElementById('depo-prev');
const btnNext = document.getElementById('depo-next');
const depoBoxes = document.querySelectorAll('.depoimento-box');

function getCardsPerView() {
    return window.innerWidth <= 900 ? 1 : 3;
}

function getScrollAmount() {
    const card = depoFlex.querySelector('.depoimento-box');
    if (!card) return 0;
    return (card.offsetWidth + 24) * getCardsPerView();
}

let currentIndex = 0;

function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = depoBoxes.length - cardsPerView;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const scrollTo = currentIndex * (depoBoxes[0].offsetWidth + 24);
    depoFlex.scrollTo({ left: scrollTo, behavior: 'smooth' });
}

if (depoFlex && btnPrev && btnNext) {
    btnPrev.onclick = () => {
        currentIndex -= getCardsPerView();
        updateCarousel();
    };
    btnNext.onclick = () => {
        currentIndex += getCardsPerView();
        updateCarousel();
    };

    // Touch/drag para mobile
    let isDown = false, startX, scrollLeft;
    depoFlex.addEventListener('mousedown', (e) => {
        isDown = true;
        depoFlex.classList.add('dragging');
        startX = e.pageX - depoFlex.offsetLeft;
        scrollLeft = depoFlex.scrollLeft;
    });
    depoFlex.addEventListener('mouseleave', () => {
        isDown = false;
        depoFlex.classList.remove('dragging');
    });
    depoFlex.addEventListener('mouseup', () => {
        isDown = false;
        depoFlex.classList.remove('dragging');
    });
    depoFlex.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - depoFlex.offsetLeft;
        const walk = (x - startX) * 1.5;
        depoFlex.scrollLeft = scrollLeft - walk;
    });
    // Touch events
    depoFlex.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - depoFlex.offsetLeft;
        scrollLeft = depoFlex.scrollLeft;
    });
    depoFlex.addEventListener('touchend', () => {
        isDown = false;
    });
    depoFlex.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - depoFlex.offsetLeft;
        const walk = (x - startX) * 1.5;
        depoFlex.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    // Atualiza ao redimensionar a tela
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

// Inicializa o carrossel na posição correta
updateCarousel();

// Preloader com tempo mínimo de 5 segundos
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hide');
            setTimeout(() => preloader.style.display = 'none', 600);
        }, 2400); // 5 segundos
    }
});

// Função para scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const btnAbrir = document.getElementById('abrir-mais-servicos');
    const modal = document.getElementById('modal-mais-servicos');
    const btnFechar = document.getElementById('fechar-modal-mais-servicos');

    if (btnAbrir && modal && btnFechar) {
        btnAbrir.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        btnFechar.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    if (btnAbrir) {
        btnAbrir.addEventListener('click', function() {
            var linha2 = document.getElementById('portfolio-cards-linha2');
            if (linha2) {
                linha2.classList.remove('oculto');
            }
            btnAbrir.parentElement.style.display = 'none';
        });
    }

    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Remove observer para não animar de novo
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => {
        // Inicialmente, deixa invisível e deslocado
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        observer.observe(el);
    });
});