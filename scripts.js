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

    header.style.backdropFilter = `blur(${currentYratio*5}px)`;
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
    const gallery_closeBtn = document.getElementById('closePopup');
    const gallery_overlay = document.getElementById('gallery_popupOverlay');
    // Open popup and change image
    function imagefullscreen(newimage) {
      gallery_overlay.style.display = 'flex';
      img.src = newimage;
    }

    // Close popup
    gallery_closeBtn.addEventListener('click', () => {
        gallery_overlay.style.display = 'none';
    });

    // Close when clicking outside popup
    window.addEventListener('click', (e) => {
        if (e.target === gallery_overlay) {
            gallery_overlay.style.display = 'none';
        }
    });
//

//work scripts
    var imgnumber = 0;
    // Get elements
    const work_closeBtn = document.querySelectorAll('.work_close-btn');
    const work_overlay = document.getElementById('work_popupOverlay');
    const work_popups = document.querySelectorAll('.work_popup');
    
    // Open popup and change image
    function imagedescription(workpopup) {
        const work_popup = document.getElementById(workpopup);
        resetworkimgs()
        work_overlay.style.display = 'flex';
        work_popup.style.display = 'flex';
    }

    // Close popup
    work_closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            work_overlay.style.display = 'none';
            work_popups.forEach((popup) => {
                popup.style.display = 'none';
            });
        });
    });

    // Close when clicking outside popup
    window.addEventListener('click', (e) => {
        if (e.target === work_overlay) {
            work_overlay.style.display = 'none';
            work_popups.forEach((popup) => {
                popup.style.display = 'none';
            });
        }
    });

    const right_btn = document.querySelector('rightarr');
    const left_btn = document.querySelector('leftarr');

    const workimgs = ['workimg1','workimg2','workimg3','workimg4','workimg5','workimg6']

    const worksrc1 = ["./ressources/images/work/Darth_Maul.jpg","./ressources/images/work/Turtle_Front.jpg","./ressources/images/work/Bryan_Cranston.jpg"]
    const worksrc2 = ["./ressources/images/work/Turtle_Front.jpg","./ressources/images/work/Darth_Maul.jpg","./ressources/images/work/Bryan_Cranston.jpg"]
    const worksrc3 = ["./ressources/images/work/Bryan_Cranston.jpg","./ressources/images/work/Darth_Maul.jpg","./ressources/images/work/Turtle_Front.jpg"]
    const worksrc4 = ["./ressources/images/work/Enceinte_Front_Lookdev.jpg","./ressources/images/work/Turtle_Front.jpg","./ressources/images/work/Bryan_Cranston.jpg"]
    const worksrc5 = ["./ressources/images/work/Environment_2D_1.jpg","./ressources/images/work/Environment_2D_2.jpg","./ressources/images/work/Environment_2D_3.jpg","./ressources/images/work/Environment_2D_4.jpg","./ressources/images/work/Environment_2D_5.jpg","./ressources/images/work/Environment_2D_6.jpg"]
    const worksrc6 = ["./ressources/images/work/Environment.jpg","./ressources/images/work/Turtle_Front.jpg","./ressources/images/work/Bryan_Cranston.jpg"]

    function changeimageL(workimg, imgs) {
        const work_img = document.getElementById(workimg);

        imgnumber += imgs.length - 1; imgnumber = imgnumber%imgs.length;
        work_img.src = imgs[imgnumber];
    }

    function changeimageR(workimg, imgs) {
        const work_img = document.getElementById(workimg);

        imgnumber += 1; imgnumber = imgnumber%imgs.length;
        work_img.src = imgs[imgnumber];

    }

    function resetworkimgs() {
        imgnumber = 0;
        workimgs.forEach((workimgId) => {
            const workimg = document.getElementById(workimgId);
            workimg.src = workimg.getAttribute('original-src');
        });
    }
//