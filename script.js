function showToast(title, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-msg').innerText = msg;
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3500);
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
function toggleMobileMenu() {
    mobileMenu.classList.add('hidden');
}

const homeAudioPlayer = document.getElementById('home-audio-player');
if (homeAudioPlayer) {
    const playButton = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration-time');
    const audioProgress = document.getElementById('audio-progress');

    function formatAudioTime(time) {
        if (!Number.isFinite(time)) {
            return '0:00';
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateAudioProgress() {
        currentTimeDisplay.textContent = formatAudioTime(homeAudioPlayer.currentTime);
        audioProgress.value = Number.isFinite(homeAudioPlayer.currentTime)
            ? String(homeAudioPlayer.currentTime)
            : '0';
    }

    function updateAudioDuration() {
        const duration = Number.isFinite(homeAudioPlayer.duration) ? homeAudioPlayer.duration : 0;
        durationDisplay.textContent = formatAudioTime(duration);
        audioProgress.max = String(duration);
        audioProgress.disabled = duration === 0;
    }

    playButton.addEventListener('click', async () => {
        if (homeAudioPlayer.paused) {
            try {
                await homeAudioPlayer.play();
            } catch (error) {
                console.error('Unable to play the audio.', error);
                showToast('Playback unavailable', 'The audio could not be played.');
            }
        } else {
            homeAudioPlayer.pause();
        }
    });

    homeAudioPlayer.addEventListener('play', () => {
        playIcon.classList.replace('fa-play', 'fa-pause');
        playButton.setAttribute('aria-label', 'Pause audio');
        playButton.setAttribute('aria-pressed', 'true');
        showToast('Audio Playing', 'Ishara Live Session Mix is now playing.');
    });
    homeAudioPlayer.addEventListener('pause', () => {
        playIcon.classList.replace('fa-pause', 'fa-play');
        playButton.setAttribute('aria-label', 'Play audio');
        playButton.setAttribute('aria-pressed', 'false');
    });
    homeAudioPlayer.addEventListener('ended', () => {
        playIcon.classList.replace('fa-pause', 'fa-play');
        playButton.setAttribute('aria-label', 'Play audio');
        playButton.setAttribute('aria-pressed', 'false');
        updateAudioProgress();
    });
    homeAudioPlayer.addEventListener('loadedmetadata', updateAudioDuration);
    homeAudioPlayer.addEventListener('durationchange', updateAudioDuration);
    homeAudioPlayer.addEventListener('timeupdate', updateAudioProgress);
    audioProgress.addEventListener('input', () => {
        homeAudioPlayer.currentTime = Number(audioProgress.value);
    });
    updateAudioDuration();
    updateAudioProgress();
}

const studioGallery = document.getElementById('studio-gallery');
if (studioGallery) {
    const studioPhotos = [
        { file: 'imageOne.jpeg', title: 'The Sound Starts Here', caption: 'A close-up of the microphone setup in our recording studio.' },
        { file: 'imageTwo.jpeg', title: 'Behind the Mix', caption: 'Fine-tuning every detail in the control room.' },
        { file: 'imageThree.jpeg', title: 'Find Your Voice', caption: 'A vocal session surrounded by the Ishara Studio sound.' },
        { file: 'imageFour.jpeg', title: 'Built for Recording', caption: 'A look inside our colorful, fully equipped studio.' },
        { file: 'imageFive.jpeg', title: 'Mix with Confidence', caption: 'Professional audio equipment ready for your next session.' },
        { file: 'imageSix.jpeg', title: 'Ready to Record', caption: 'A studio microphone and pop filter set up for vocals.' },
        { file: 'imageSeven.jpeg', title: 'Hear Every Detail', caption: 'Studio headphones for focused listening and mixing.' },
        { file: 'imageEight.jpeg', title: 'The Control Room', caption: 'Production tools and instruments in the Ishara Studio workspace.' },
        { file: 'imageNine.jpeg', title: 'Made Together', caption: 'Working on a track from the studio control room.' },
        { file: 'imageTen.jpeg', title: 'Your Creative Space', caption: 'A welcoming studio equipped for rehearsals and recording.' },
        { file: 'imageEleven.jpeg', title: 'Room to Make Music', caption: 'Instruments, recording equipment, and space to create.' },
        { file: 'imageTwelve.jpeg', title: 'Studio Details', caption: 'A closer look at the atmosphere inside Ishara Studio.' },
        { file: 'imageThirteen.jpeg', title: 'Bring the Rhythm', caption: 'Our drum kit is ready for rehearsal and recording.' },
        { file: 'imageFourteen.jpeg', title: 'Find Your Sound', caption: 'A bass guitar waiting for its next studio session.' },
        { file: 'imageFifteen.jpeg', title: 'The Right Tools', caption: 'Professional audio gear helps bring every session to life.' },
        { file: 'imageSixteen.jpeg', title: 'Made for Musicians', caption: 'A wide view of the instruments and recording space.' },
        { file: 'imageSeventeen.jpeg', title: 'Studio Sessions', caption: 'Our team working together in a comfortable studio setting.' },
        { file: 'imageEighteen.jpeg', title: 'Creative Collaboration', caption: 'Good music begins with people making it together.' },
        { file: 'imageNineteen.jpeg', title: 'Welcome to Ishara', caption: 'Meet the team behind the sound at Ishara Studio.' }
    ];
    const carouselInner = studioGallery.querySelector('.carousel-inner');
    const carouselIndicators = studioGallery.querySelector('.carousel-indicators');

    studioPhotos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-item${index === 0 ? ' active' : ''}`;
        slide.innerHTML = `
            <img src="someImages/${photo.file}" class="d-block" alt="${photo.title}">
            <div class="carousel-caption">
                <h3 class="animate__animated animate__fadeInUp">${photo.title}</h3>
                <p class="animate__animated animate__fadeInUp" style="--animate-delay: 0.15s;">${photo.caption}</p>
            </div>
        `;
        carouselInner.appendChild(slide);

        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#studio-gallery');
        indicator.setAttribute('data-bs-slide-to', String(index));
        indicator.setAttribute('aria-label', `Show photo ${index + 1}: ${photo.title}`);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicator);
    });
}

// Exact Rental Catalog Data with Names & High-Quality Images
const rentalData = {
            instruments: {
                title: "Musical Instruments Rental",
                desc: "Explore our collection of professional musical instruments available for rent.",
                items: [
                    { name: "Piano", desc: "Professional weighted-key digital stage piano.", rate: "$35 / day", img: "instruments/piano-rental.jpeg" },
                    { name: "Guitars", desc: "Acoustic, electric, and bass guitars with pristine tuning.", rate: "$20 / day", img: "instruments/bass-guitar.jpeg" },
                    { name: "Drum", desc: "Complete acoustic drum kit with cymbals and hardware.", rate: "$45 / day", img: "instruments/drum.jpeg" },
                    { name: "Nexo Speaker", desc: "High-power professional live sound reinforcement speaker.", rate: "$50 / day", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
                    { name: "Sustain pedal for piano", desc: "Heavy-duty metal piano sustain pedal with polarity switch.", rate: "$10 / day", img: "instruments/piano-sustain-pedal.svg" },
                    { name: "Sustain pedal for guitar", desc: "Expression & sustain pedal controller for guitar effects.", rate: "$10 / day", img: "instruments/guitar-sustain-pedal.svg" },
                    { name: "Violin", desc: "Acoustic violin outfit with bow and protective case.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?auto=format&fit=crop&w=600&q=80" },
                    { name: "Bass Guitar", desc: "Four-string electric bass guitar for rehearsals and live sets.", rate: "$25 / day", img: "instruments/bass-guitar.jpeg" },
                    { name: "Keyboard", desc: "Portable digital keyboard with weighted keys and built-in sounds.", rate: "$30 / day", img: "instruments/piano-rental.jpeg" },
                    { name: "Studio Microphone", desc: "Large-diaphragm condenser microphone for vocals and instruments.", rate: "$20 / day", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" },
                    { name: "Saxophone", desc: "Alto saxophone supplied with mouthpiece and carry case.", rate: "$30 / day", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80" },
                    { name: "Trumpet", desc: "Brass trumpet with mouthpiece for practice and performances.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80" },
                    { name: "Cello", desc: "Full-size cello with bow and padded carrying bag.", rate: "$35 / day", img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80" },
                    { name: "Flute", desc: "Concert flute with cleaning rod and fitted case.", rate: "$20 / day", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80" },
                    { name: "Ukulele", desc: "Concert-size ukulele with a warm tone, ideal for practice and travel.", rate: "$15 / day", img: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80" },
                    { name: "Accordion", desc: "Compact piano accordion with shoulder straps and carrying case.", rate: "$30 / day", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80" }
                ]
            },
            machines: {
                title: "Machines Borrowing / Rental",
                desc: "Browse our professional machinery and equipment available for your events and projects.",
                items: [
                    { name: "Grill Machine", desc: "Heavy-duty commercial BBQ grill machine for events and catering.", rate: "$40 / day", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" },
                    { name: "Generator", desc: "Reliable silent power generator for outdoor shoots and live events.", rate: "$60 / day", img: "https://images.unsplash.com/photo-1617839396348-d3c267b2d56a?auto=format&fit=crop&w=600&q=80" },
                    { name: "Pressure Washer", desc: "High-pressure industrial cleaning washer for equipment and venues.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80" },
                    { name: "Concrete Mixer", desc: "Compact motorized mixer for construction and studio groundwork.", rate: "$45 / day", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
                    { name: "Laser Cutting Machine", desc: "Precision desktop laser cutter for custom merchandise and signage.", rate: "$55 / day", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
                    { name: "Popcorn Machine", desc: "Commercial popcorn maker for parties, events, and movie nights.", rate: "$30 / day", img: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80" },
                    { name: "Industrial Sewing Machine", desc: "Heavy-duty sewing machine for custom textiles and acoustic panels.", rate: "$35 / day", img: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=600&q=80" },
                    { name: "Air Compressor", desc: "Portable pneumatic compressor for studio tools and maintenance.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80" },
                    { name: "Sound Mixer Desk", desc: "Professional multi-channel mixing console for live audio setups.", rate: "$70 / day", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" },
                    { name: "Forklift", desc: "Compact forklift for moving pallets and heavy equipment.", rate: "$90 / day", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80" },
                    { name: "Welding Machine", desc: "Portable arc welder for metal fabrication and repairs.", rate: "$35 / day", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80" },
                    { name: "Industrial Vacuum Cleaner", desc: "High-capacity wet and dry vacuum for workshops and venues.", rate: "$30 / day", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80" },
                    { name: "Water Pump", desc: "Portable motor pump for draining water and site work.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80" },
                    { name: "Floor Polisher", desc: "Commercial floor buffer for polishing and maintaining hard floors.", rate: "$30 / day", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" },
                    { name: "Plate Compactor", desc: "Gas-powered compactor for leveling soil and paving surfaces.", rate: "$45 / day", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
                    { name: "Electric Hoist", desc: "Powered lifting hoist for safely raising equipment and materials.", rate: "$40 / day", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80" },
                    { name: "Tile Cutter", desc: "Precision wet saw for cutting ceramic and stone tiles.", rate: "$25 / day", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80" },
                    { name: "Wood Chipper", desc: "Heavy-duty chipper for shredding branches and garden debris.", rate: "$55 / day", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80" }
                ]
            }
};

function openRentalModal(category) {
    const data = rentalData[category];
    if (!data) return;

    document.getElementById('rental-modal-title').innerText = data.title;
    document.getElementById('rental-modal-desc').innerText = data.desc;

    const bodyContainer = document.getElementById('rental-modal-body');
    bodyContainer.innerHTML = '';

    data.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'rental-item-card bg-studio-900 border border-studio-700 rounded-2xl overflow-hidden flex flex-col hover:border-studio-bronze transition';
        card.innerHTML = `
                    <div class="flex flex-col flex-1">
                        <div class="rental-item-image aspect-square overflow-hidden relative sm:aspect-auto sm:h-40">
                            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-studio-900 via-transparent to-transparent"></div>
                            <span class="absolute top-2 left-2 right-2 rounded-lg border border-studio-bronze/70 bg-studio-900/95 px-3 py-2 text-center text-sm font-extrabold leading-snug text-white shadow-lg break-words sm:left-3 sm:right-auto sm:max-w-[85%] sm:text-base">${item.name}</span>
                            <span class="absolute bottom-2 left-3 text-studio-gold text-xs font-bold bg-black/80 px-2.5 py-1 rounded-full border border-studio-bronze/30">${item.rate}</span>
                        </div>
                        <div class="p-4 space-y-2 flex-1">
                            <h4 class="text-white font-bold text-base leading-snug break-words">${item.name}</h4>
                            <p class="text-xs text-studio-muted leading-relaxed break-words">${item.desc}</p>
                        </div>
                    </div>
                    <div class="p-4 pt-0 mt-auto">
                        <button onclick="requestRentalItem('${data.title}', '${item.name}')" class="w-full bg-studio-bronze hover:bg-studio-bronze/90 text-white text-xs font-semibold py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                            <i class="fa-solid fa-envelope"></i> Request Rental
                        </button>
                    </div>
        `;
        bodyContainer.appendChild(card);
    });

    document.getElementById('rental-modal').classList.remove('hidden');
}

function closeRentalModal() {
    document.getElementById('rental-modal').classList.add('hidden');
}

function requestRentalItem(categoryTitle, itemName) {
    const subject = encodeURIComponent(`Rental Inquiry: ${itemName} (${categoryTitle})`);
    const body = encodeURIComponent(`Hello Ishara Studio Team,\n\nI would like to inquire about renting the following item:\n\nCategory: ${categoryTitle}\nItem: ${itemName}\n\nPlease let me know availability and booking details.`);
    window.location.href = `mailto:isharastudio1@gmail.com?subject=${subject}&body=${body}`;
    showToast('Email Dispatch', `Opening mail client for ${itemName}`);
    closeRentalModal();
}

// Handle Booking Mail Dispatch
function handleBookingEmail(e) {
    e.preventDefault();
    const name = document.getElementById('b-name').value;
    const email = document.getElementById('b-email').value;
    const service = document.getElementById('b-service').value;
    const date = document.getElementById('b-date').value;
    const time = document.getElementById('b-time').value;
    const msg = document.getElementById('b-msg').value;

    const subject = encodeURIComponent(`Booking Inquiry: ${service} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nDate: ${date} (${time})\n\nDetails:\n${msg}`);

    window.location.href = `mailto:isharastudio1@gmail.com?subject=${subject}&body=${body}`;
    showToast('Email Dispatch', 'Opening mail client to send to isharastudio1@gmail.com');
    setTimeout(() => {
        switchPage('home');
    }, 1500);
}

// Navigate between the standalone site pages.
const pageLinks = {
    home: 'index.html',
    about: 'about.html',
    services: 'services.html',
    playlists: 'playlist.html',
    booking: 'booking.html'
};

const currentPage = Object.keys(pageLinks).find(
    (pageId) => pageLinks[pageId] === window.location.pathname.split('/').pop()
) || 'home';

document.querySelectorAll('[data-nav]').forEach((link) => {
    const isCurrentPage = link.dataset.nav === currentPage;
    link.classList.toggle('text-studio-bronze', isCurrentPage);
    link.classList.toggle('text-studio-muted', !isCurrentPage);

    if (isCurrentPage) {
        link.setAttribute('aria-current', 'page');
    }
});

function switchPage(pageId) {
    const pagePath = pageLinks[pageId];
    if (!pagePath) {
console.error(`Unknown page: ${pageId}`);
return;
    }
    window.location.href = pagePath;
}
