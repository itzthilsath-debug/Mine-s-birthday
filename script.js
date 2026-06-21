// ============================================================
// INITIALIZE AOS
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});

// ============================================================
// PRELOADER HIDE
// ============================================================
window.addEventListener('load', function () {
    setTimeout(function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hide');
        }
    }, 500);
});

// ============================================================
// NAVIGATION
// ============================================================
var navbar = document.getElementById('navbar');
var navToggle = document.getElementById('navToggle');
var navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
});

if (navToggle) {
    navToggle.addEventListener('click', function () {
        if (navLinks) navLinks.classList.toggle('active');
    });
}

if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================================
// STARS
// ============================================================
function createStars() {
    var container = document.getElementById('starsContainer');
    if (!container) return;
    var count = window.innerWidth < 768 ? 60 : 120;

    for (var i = 0; i < count; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        var size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 4) + 's';
        container.appendChild(star);
    }
}
createStars();

// ============================================================
// ENVELOPE
// ============================================================
var envelope = document.getElementById('envelope3d');
var openBtn = document.getElementById('openEnvelopeBtn');

function openEnvelope() {
    if (!envelope) return;
    envelope.classList.toggle('opened');
    if (envelope.classList.contains('opened')) {
        createConfetti(30);
        setTimeout(function () {
            var story = document.getElementById('story');
            if (story) {
                story.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1200);
    }
}

if (envelope) {
    envelope.addEventListener('click', openEnvelope);
}
if (openBtn) {
    openBtn.addEventListener('click', openEnvelope);
}

// ============================================================
// CONFETTI
// ============================================================
function createConfetti(count) {
    count = count || 25;
    var colors = ['#d4af6a', '#b98fdb', '#e8b4d9', '#fff8e7', '#9b6bc4', '#f0dba0'];

    for (var i = 0; i < count; i++) {
        (function (i) {
            setTimeout(function () {
                var el = document.createElement('div');
                var size = Math.random() * 8 + 4;
                var isCircle = Math.random() > 0.5;
                var drift = (Math.random() - 0.5) * 200;
                el.style.cssText =
                    'position:fixed;top:-10px;left:' + Math.random() * 100 +
                    '%;width:' + size + 'px;height:' + (isCircle ? size : size * 1.6) +
                    'px;background:' + colors[Math.floor(Math.random() * colors.length)] +
                    ';border-radius:' + (isCircle ? '50%' : '2px') +
                    ';pointer-events:none;z-index:9999;' +
                    'animation:confettiFall ' + (Math.random() * 2 + 2) +
                    's linear forwards;--drift:' + drift + 'px;';
                document.body.appendChild(el);
                setTimeout(function () {
                    if (el.parentNode) el.remove();
                }, 4000);
            }, i * 30);
        })(i);
    }
}

// Add confetti CSS if not exists
if (!document.getElementById('confettiStyle')) {
    var confettiStyle = document.createElement('style');
    confettiStyle.id = 'confettiStyle';
    confettiStyle.textContent =
        '@keyframes confettiFall {' +
        '0% { transform: translateY(0) rotate(0deg); opacity: 1; }' +
        '100% { transform: translateY(100vh) translateX(var(--drift)) rotate(720deg); opacity: 0; }' +
        '}';
    document.head.appendChild(confettiStyle);
}

// ============================================================
// CAKE / CANDLES
// ============================================================
var candles = document.querySelectorAll('.candle-3d');
var statusText = document.getElementById('cakeStatus');
var progressBar = document.getElementById('progressBar');
var cutBtn = document.getElementById('cutCakeBtn');
var blownCount = 0;

if (candles.length > 0) {
    candles.forEach(function (candle) {
        candle.addEventListener('click', function () {
            if (this.classList.contains('blown')) return;
            this.classList.add('blown');
            blownCount++;

            if (progressBar) {
                var progress = (blownCount / candles.length) * 100;
                progressBar.style.width = progress + '%';
            }

            createConfetti(8);

            if (blownCount === candles.length) {
                if (statusText) {
                    statusText.textContent = '✨ Make a wish! All candles are blown! ✨';
                }
                if (cutBtn) {
                    cutBtn.disabled = false;
                }
                createConfetti(40);
            } else {
                if (statusText) {
                    statusText.textContent = '🕯️ ' + (candles.length - blownCount) + ' candles left to blow!';
                }
            }
        });
    });
}

if (cutBtn) {
    cutBtn.addEventListener('click', function () {
        if (statusText) {
            statusText.textContent = '🍰 Here\'s to a sweet year ahead! 🎉';
        }
        this.disabled = true;
        createConfetti(50);

        var cake3d = document.querySelector('.cake-3d');
        if (cake3d) {
            cake3d.style.transform = 'scale(0.95)';
            setTimeout(function () {
                cake3d.style.transform = 'scale(1)';
                var cakeBase = document.querySelector('.cake-base');
                if (cakeBase) cakeBase.classList.add('cut');
            }, 300);
        }
    });
}

// ============================================================
// CAROUSEL - NO AUTO SLIDE
// ============================================================
var track = document.getElementById('carouselTrack');
var slides = document.querySelectorAll('.carousel-slide');
var dotsContainer = document.getElementById('carouselDots');
var currentIndex = 0;
var totalSlides = slides.length;

if (track && slides.length > 0 && dotsContainer) {
    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        var slideWidth = slides[0].offsetWidth + 24;
        track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';

        var dots = document.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    var nextBtn = document.querySelector('.carousel-btn.next');
    var prevBtn = document.querySelector('.carousel-btn.prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
        });
    }

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            goToSlide(currentIndex);
        }, 200);
    });
}

// ============================================================
// PRE-WRITTEN CHAT - UPDATED (Respectful & Mature)
// ============================================================
var chatMessagesData = [
    "Hafsa, unna pathi sonna.. enaku romba pidikkum nu enakku theriyum.",
    "Aana indha love, enakku pudicha oru feel. Unakku adhu disturb ah irukka koodadhu nu nenachen.",
    "Niraya naal yosichen, en feelings ah sollanum nu. Aana un life pathi yosichapo, enaku oru clarity vandhuchu.",
    "Naan unna love pandren. Athu unmai. Aana adhu unakku kashtam kodukka koodadhu.",
    "Neenga pudicha life, pudicha aalunga kooda sandhosama irukanum. Athu than enakku romba mukkiyam.",
    "Unga happiness than enaku mukkiyam. Adhu en kooda illaina kooda paravala.",
    "Naan unna disturb pannama irukkanum. Athu than en goal.",
    "Unakku en mela edhuvum feel illaina, adhu okay. Naan atha accept pandren.",
    "Nee un life ah full ah enjoy pannu. Nee sandhosama irukanum. Athu than en wish.",
    "Indha message lam padichittu, nee onnum solla vendam. Naan edhuvum expect pannala.",
    "Unakku oru sandhosamaana life venum. Athu than enaku podhum.",
    "Always stay happy, Hafsa. Nee deserve pannura ellame unakku kedaikattum. 💜"
];

var chatContainer = document.getElementById('chatMessages');
var typingIndicator = document.getElementById('chatTyping');
var chatStarted = false;

function startChat() {
    if (chatStarted || !chatContainer) return;
    chatStarted = true;

    var index = 0;

    function showNextMessage() {
        if (index >= chatMessagesData.length) return;

        if (typingIndicator) typingIndicator.classList.add('active');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

        var delay = Math.min(1500, 500 + chatMessagesData[index].length * 15);

        setTimeout(function () {
            if (typingIndicator) typingIndicator.classList.remove('active');

            var bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = chatMessagesData[index];
            if (chatContainer) {
                chatContainer.appendChild(bubble);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            index++;

            if (index === 2 || index === 5 || index === 10) {
                createConfetti(15);
            }

            setTimeout(showNextMessage, 800);
        }, delay);
    }

    setTimeout(showNextMessage, 600);
}

// ============================================================
// CHAT TAB TOGGLE
// ============================================================
var letterTab = document.getElementById('letterTab');
var liveTab = document.getElementById('liveTab');
var letterChat = document.getElementById('letterChat');
var liveChat = document.getElementById('liveChat');

if (letterTab && liveTab && letterChat && liveChat) {
    letterTab.addEventListener('click', function () {
        letterTab.classList.add('active');
        liveTab.classList.remove('active');
        letterChat.style.display = 'flex';
        liveChat.style.display = 'none';
        if (!chatStarted) {
            startChat();
        }
    });

    liveTab.addEventListener('click', function () {
        liveTab.classList.add('active');
        letterTab.classList.remove('active');
        letterChat.style.display = 'none';
        liveChat.style.display = 'flex';
    });
}

// ============================================================
// LIVE CHAT - UPDATED AUTO-REPLIES
// ============================================================
var liveMessages = document.getElementById('liveChatMessages');
var liveInput = document.getElementById('liveChatInput');
var liveSendBtn = document.getElementById('liveSendBtn');
var clearBtn = document.getElementById('clearChatBtn');

// Updated auto-replies - Respectful & Mature
var replies = [
    '💜 Thank you da. Athu romba arumai.',
    '😊 Neenga sonna ellame enaku romba pidichirukku.',
    '🎂 En life la neenga irukareenga nu therinjathu romba special.',
    '✨ Naan sandhosama irukken. Neengalum appadi irunga.',
    '🥺 Idhu romba touching ah irukku. Thank you.',
    '❤️ Ungaluku en life la oru place irukku. Always.',
    '💕 Neenga nalla irukanum. Athu than en wish.',
    '🌹 Naan unga love ah appreciate pandren. Romba thanks.',
    '💜 Unga maturity ku romba respect. Nalla irunga.',
    '✨ En life la neenga oru special person. Always remember that.'
];

function loadLiveMessages() {
    if (!liveMessages) return;
    try {
        var saved = localStorage.getItem('hafsaLiveChat');
        if (saved && saved !== '[]') {
            var messages = JSON.parse(saved);
            messages.forEach(function (msg) {
                displayLiveMessage(msg.text, msg.sender, msg.time);
            });
        } else {
            displayLiveMessage('💜 Hi Hafsa! Ungaluku enna solanum?', 'System', new Date().toLocaleTimeString());
        }
    } catch (e) {
        displayLiveMessage('💜 Hi Hafsa! Ungaluku enna solanum?', 'System', new Date().toLocaleTimeString());
    }
}

function displayLiveMessage(text, sender, time) {
    if (!liveMessages) return;
    var div = document.createElement('div');
    div.className = 'live-message ' + (sender === 'You' ? 'sent' : 'received');
    div.innerHTML = text + '<span class="msg-time">' + (time || new Date().toLocaleTimeString()) + '</span>';
    liveMessages.appendChild(div);
    liveMessages.scrollTop = liveMessages.scrollHeight;
}

function sendLiveMessage() {
    if (!liveInput || !liveMessages) return;
    var text = liveInput.value.trim();
    if (!text) return;

    var time = new Date().toLocaleTimeString();

    displayLiveMessage(text, 'You', time);

    try {
        var saved = JSON.parse(localStorage.getItem('hafsaLiveChat') || '[]');
        saved.push({ text: text, sender: 'You', time: time });
        localStorage.setItem('hafsaLiveChat', JSON.stringify(saved));
    } catch (e) { }

    liveInput.value = '';

    setTimeout(function () {
        var reply = replies[Math.floor(Math.random() * replies.length)];
        var replyTime = new Date().toLocaleTimeString();
        displayLiveMessage(reply, 'Hafsa 💜', replyTime);

        try {
            var saved = JSON.parse(localStorage.getItem('hafsaLiveChat') || '[]');
            saved.push({ text: reply, sender: 'Hafsa 💜', time: replyTime });
            localStorage.setItem('hafsaLiveChat', JSON.stringify(saved));
        } catch (e) { }

        createConfetti(10);
    }, 1000 + Math.random() * 1500);
}

// Emoji helper - Make it global
window.addEmoji = function (emoji) {
    if (liveInput) {
        liveInput.value += emoji;
        liveInput.focus();
    }
};

if (clearBtn) {
    clearBtn.addEventListener('click', function () {
        if (confirm('Clear all chat messages?')) {
            try {
                localStorage.removeItem('hafsaLiveChat');
            } catch (e) { }
            if (liveMessages) {
                liveMessages.innerHTML = '';
                displayLiveMessage('✨ Chat cleared. Start fresh! 💜', 'System', new Date().toLocaleTimeString());
            }
        }
    });
}

if (liveSendBtn) {
    liveSendBtn.addEventListener('click', sendLiveMessage);
}
if (liveInput) {
    liveInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendLiveMessage();
    });
}

// Load live chat
loadLiveMessages();

// ============================================================
// AUTO-START LETTER CHAT
// ============================================================
var chatSection = document.getElementById('chat');
if (chatSection) {
    var chatObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !chatStarted) {
                startChat();
                chatObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    chatObserver.observe(chatSection);
}

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
// PARALLAX EFFECT
// ============================================================
window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var heroContent = document.querySelector('.hero-content');
    var bgOrbs = document.querySelectorAll('.gradient-orb');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
    }

    bgOrbs.forEach(function (orb, i) {
        var speed = 0.02 + (i + 1) * 0.01;
        orb.style.transform = 'translate(' + (scrolled * speed * 0.3) + 'px, ' + (scrolled * speed * 0.2) + 'px)';
    });
});

// ============================================================
// REDUCED MOTION CHECK
// ============================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.carousel-btn, .cut-cake-btn, .hero-btn').forEach(function (el) {
        el.style.transition = 'none';
    });
}



console.log('💜 Happy Birthday, Hafsa! Made with love 💜');
console.log('💜 Always stay happy, Hafsa! 💜');