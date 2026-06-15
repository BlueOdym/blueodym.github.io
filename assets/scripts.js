//time
    const options = {
        timeZone: "Europe/Paris",
        hourCycle: "h23",
        hour: "numeric",
        minute: "numeric",
    };
    function updateTime() {
            const date = new Date();
            const time = date.toLocaleTimeString(0,options);
            document.getElementById('time').innerHTML =`Paris, ${time}`;
        }

    setInterval(updateTime, 1000);
    updateTime();

//scrollingtxt

const scrolledtitles = document.querySelectorAll('#scrolledtitles');
const header = document.querySelector('header');

// element whose height is used as an offset; adjust selector to match your HTML
const heightoffset = document.querySelector('.introduction');
const experiencetitle = document.querySelectorAll('.experiencetitle');
const experiencedate = document.querySelectorAll('.experiencedate');
const experiencedescrip = document.querySelectorAll('.experiencedescrip');


window.addEventListener('scroll', (event) => {
    const currentY = window.scrollY / 2;
    var calcX = -window.scrollY/2 - heightoffset.offsetHeight + 1000;
    var HeaderOpacity

    if (calcX < 0) {calcX = 0;}
    if (currentY <= 0.5) {HeaderOpacity = 0.5;}

    const currentYratio = (window.scrollY / window.innerHeight);
    const currentYinvertratio = 1 - currentYratio;

    scrolledtitles.forEach((scrolledtitle) => {
        scrolledtitle.style.transform = `translateY(${currentY}px)`;
        scrolledtitle.style.opacity = currentYinvertratio;
    });

    header.style.backdropFilter = `blur(${currentYratio*10}px)`;
    header.style.border = `1px solid rgba(61, 61, 61, ${currentYratio})`;
    header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${currentYinvertratio}), rgba(0, 0, 0, 0))`;
    header.style.backgroundClip = `padding-box`;

    experiencetitle.forEach((experience) => {
        experience.style.transform = `translateX(${calcX}px)`;
        experience.style.opacity = currentYratio*2 - 2;
    });
    experiencedate.forEach((experience) => {
        experience.style.opacity = currentYratio*2 - 1.8;
    });
    experiencedescrip.forEach((experience) => {
        experience.style.opacity = currentYratio*2 - 1.8;
    });
});

//gallery scripts
    // Get elements
    const img = document.getElementById('galleryimg');
    const closeBtn = document.getElementById('closePopup');
    const overlay = document.getElementById('popupOverlay');
    // Open popup and change image
    function imagefullscreen(newimage) {
      overlay.style.display = 'flex';
      img.src = newimage;
    }

    // Close popup
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Close when clicking outside popup
    window.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
//
