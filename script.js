document.addEventListener('DOMContentLoaded', () => {
    const nameDisplay = document.getElementById('name-display');
    const fieldDisplay = document.getElementById('field-display');
    const photoPreview = document.getElementById('photo-preview');
    const zoomWrapper = document.getElementById('zoom-wrapper');

    const nameInput = document.getElementById('name-input');
    const fieldInput = document.getElementById('field-input');
    const photoInput = document.getElementById('photo-input');
    const downloadBtn = document.getElementById('download-btn');

    const xPosSlider = document.getElementById('x-pos-slider');
    const yPosSlider = document.getElementById('y-pos-slider');
    const zoomSlider = document.getElementById('zoom-slider');

    nameInput.addEventListener('input', () => {
        nameDisplay.textContent = nameInput.value.toUpperCase() || 'NAMA LENGKAP';
    });

    fieldInput.addEventListener('change', () => {
        fieldDisplay.textContent = fieldInput.value.toUpperCase() || 'BIDANG';
    });

    const updatePhotoPosition = () => {
        photoPreview.style.objectPosition = `${xPosSlider.value}% ${yPosSlider.value}%`;
    };

    const updatePhotoZoom = () => {
        zoomWrapper.style.transform = `scale(${zoomSlider.value})`;
    };

    photoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                xPosSlider.value = 50;
                yPosSlider.value = 50;
                zoomSlider.value = 1;
                updatePhotoPosition();
                updatePhotoZoom();
            };
            reader.readAsDataURL(file);
        }
    });

    xPosSlider.addEventListener('input', updatePhotoPosition);
    yPosSlider.addEventListener('input', updatePhotoPosition);
    zoomSlider.addEventListener('input', updatePhotoZoom);

    downloadBtn.addEventListener('click', () => {
        const card = document.getElementById('card-design');

        html2canvas(card, {
            useCORS: true,
            scale: window.devicePixelRatio * 3
        }).then(canvas => {
            const link = document.createElement('a');
            
            const nameValue = nameInput.value.trim();
            const fieldName = fieldInput.value.trim();
            const fileName = nameValue ? nameValue.replace(/\s+/g, '-') : 'kartu';
            
            link.download = `${fileName}_${fieldName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});
