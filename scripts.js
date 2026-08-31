function clamp(value, min, max) {
    if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("All parameters must be numbers.");
    }
    if (min > max) {
        throw new Error("Min cannot be greater than max.");
    }
    return Math.min(Math.max(value, min), max);
}

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
const headers = document.querySelectorAll('#header1, #header2');

// element whose height is used as an offset; adjust selector to match your HTML
const heightoffset = document.querySelector('.introduction');
const experiences = document.querySelectorAll('.experience');
const links = document.querySelectorAll('.link');


window.addEventListener('scroll', (event) => {
    const currentY = window.scrollY / 2;

    const currentYratio = (window.scrollY / window.innerHeight);
    const currentYinvertratio = 1 - currentYratio;

    scrolledtitles.forEach((scrolledtitle) => {
        scrolledtitle.style.transform = `translateY(${currentY}px)`;
        scrolledtitle.style.opacity = currentYinvertratio;
    });

    headers.forEach((header) => {
        header.style.backdropFilter = `blur(${currentYratio*5}px)`;
        header.style.border = `1px solid rgba(61, 61, 61, ${currentYratio})`;
        header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${currentYinvertratio}), rgba(0, 0, 0, 0))`;
        header.style.backgroundClip = `padding-box`;
    });

    //experience scripts
    experiences.forEach((experience) => {
        const ratio = 1 - (experience.getBoundingClientRect().top / window.innerHeight);
        const titleoffset = clamp((1 - ratio - 0.5), 0, 1) * 300;

        experience.querySelectorAll('.experiencetitle').forEach((element) => {
            element.style.transform = `translateX(${titleoffset}px)`;
            element.style.opacity = ratio * 3 -0.5;
        });

        experience.querySelectorAll('.experiencedate').forEach((element) => {
            element.style.opacity = ratio * 3 -0.5;
        });

        experience.querySelectorAll('.experiencedescrip').forEach((element) => {
            element.style.opacity = ratio * 3 -0.5;
        });
    });

    links.forEach((link) => {
        const ratio = 1 - (link.getBoundingClientRect().top / window.innerHeight);
        const titleoffset = clamp((1 - ratio - 0.8), 0, 1) * 300;

        link.style.transform = `translateX(${titleoffset}px)`;
        link.style.opacity = ratio * 3;
    });
});

//gallery scripts
    // Get elements
    const img = document.getElementById('galleryimg');
    const video = document.getElementById('galleryvideo');
    const gallery_closeBtn = document.getElementById('closePopup');
    const gallery_overlay = document.getElementById('gallery_popupOverlay');
    // Open popup and change image
    function imagefullscreen(newinput) {
      gallery_overlay.style.display = 'flex';
      if (newinput.endsWith('.jpg') || newinput.endsWith('.jpeg') || newinput.endsWith('.png') || newinput.endsWith('.gif')) {
        img.src = newinput;
        img.style.display = 'flex';
      } else if (newinput.endsWith('.mp4') || newinput.endsWith('.webm') || newinput.endsWith('.ogg')) {
        video.src = newinput;
        video.style.display = 'flex';
      }
    }
    window.imagefullscreen = imagefullscreen;

    // Close popup
    gallery_closeBtn.addEventListener('click', () => {
        gallery_overlay.style.display = 'none';
        img.style.display = 'none';
        video.style.display = 'none';
    });

    // Close when clicking outside popup
    window.addEventListener('click', (e) => {
        if (e.target === gallery_overlay) {
            gallery_overlay.style.display = 'none';
            img.style.display = 'none';
            video.style.display = 'none';
        }
    });

    const gallery = document.querySelector("#gallery");

    const targetRowHeight = 300;
    const gap = 6;

    function layoutGallery() {
        const images = [...gallery.querySelectorAll("img")];

        const containerWidth = gallery.clientWidth;

        let row = [];
        let aspectSum = 0;

        for (const img of images) {
            const ratio = img.naturalWidth / img.naturalHeight;

            row.push({ img, ratio });
            aspectSum += ratio;

            const rowWidth =
                aspectSum * targetRowHeight +
                gap * (row.length - 1);

            if (rowWidth >= containerWidth) {
                // Calculate the actual height needed
                const height =
                    (containerWidth - gap * (row.length - 1)) /
                    aspectSum;

                for (const item of row) {
                    item.img.style.width =
                        `${item.ratio * height}px`;

                    item.img.style.height =
                        `${height}px`;
                }

                row = [];
                aspectSum = 0;
            }
        }

        // Last row
        if (row.length) {
            const height = targetRowHeight;

            for (const item of row) {
                item.img.style.width =
                    `${item.ratio * height}px`;

                item.img.style.height =
                    `${height}px`;
            }
        }
    }

    window.addEventListener("load", layoutGallery);
    window.addEventListener("resize", layoutGallery);
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
    window.imagedescription = imagedescription;

    // Close popup
    if (work_closeBtn && work_closeBtn.length) {
        work_closeBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                work_overlay.style.display = 'none';
                work_popups.forEach((popup) => {
                    popup.style.display = 'none';
                });
            });
        });
    }

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

    window.worksrc1 = ["./ressources/images/work/Darth_Maul.jpg","./ressources/images/work/Darth_Maul_Coolguy.jpg","./ressources/images/work/Darth_Maul_Turn.jpg","./ressources/images/work/Darth_Maul_Wireframe.jpg","./ressources/images/work/Darth_Maul_viewport_1.jpg","./ressources/images/work/Darth_Maul_viewport_2.jpg"]
    window.worksrc2 = ["./ressources/images/work/Turtle_Front.jpg","./ressources/images/work/Turtle_34Front.jpg","./ressources/images/work/Turtle_34Back.jpg","./ressources/images/work/Turtle_Side.jpg","./ressources/images/work/Turtle_CloseUpBack.jpg","./ressources/images/work/Turtle_CloseUpFront.jpg","./ressources/images/work/Turtle_Lookdev.jpg"]
    window.worksrc3 = ["./ressources/images/work/Bryan_Cranston.jpg","./ressources/images/work/Bryan_Cranston_Full.jpg","./ressources/images/work/Bryan_Cranston_Viewport.jpg","./ressources/images/work/Bryan_Cranston_Wireframe.jpg"]
    window.worksrc4 = ["./ressources/images/work/Enceinte_Front_LookDev.jpg","./ressources/images/work/Enceinte_Back_LookDev.jpg","./ressources/images/work/Enceinte_5K.jpg","./ressources/images/work/Enceinte_White.jpg","./ressources/images/work/Enceinte_Enviro.jpg","./ressources/images/work/Enceinte_Wireframe.jpg","./ressources/images/work/Enceinte_UVs.jpg"]
    window.worksrc5 = ["./ressources/images/work/Environment_2D_1.jpg","./ressources/images/work/Environment_2D_2.jpg","./ressources/images/work/Environment_2D_3.jpg","./ressources/images/work/Environment_2D_4.jpg","./ressources/images/work/Environment_2D_5.jpg","./ressources/images/work/Environment_2D_6.jpg"]
    window.worksrc6 = ["./ressources/images/work/Environment.jpg","./ressources/images/work/Environment_Process.gif","./ressources/images/work/Environment_Lighting.gif","./ressources/images/work/Environment_Fog.gif","./ressources/images/work/Environment_Wireframe.jpg","./ressources/images/work/Environment_UVs.jpg"]

    function changeimageL(workimg, imgs) {
        const work_img = document.getElementById(workimg);

        imgnumber += imgs.length - 1; imgnumber = imgnumber%imgs.length;
        work_img.src = imgs[imgnumber];
    }
    window.changeimageL = changeimageL;

    function changeimageR(workimg, imgs) {
        const work_img = document.getElementById(workimg);

        imgnumber += 1; imgnumber = imgnumber%imgs.length;
        work_img.src = imgs[imgnumber];

    }
    window.changeimageR = changeimageR;

    function resetworkimgs() {
        imgnumber = 0;
        workimgs.forEach((workimgId) => {
            const workimg = document.getElementById(workimgId);
            workimg.src = workimg.getAttribute('original-src');
        });
    }
//
