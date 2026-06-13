//time
    const options = {
        timeZone: "Europe/Paris",
        hourCycle: "h24",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    function updateTime() {
            const date = new Date();
            const time = date.toLocaleTimeString(0,options);
            document.getElementById('time').innerHTML =`Paris, ${time}`;
        }

    setInterval(updateTime, 1000);
    updateTime();

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