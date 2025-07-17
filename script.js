document.addEventListener('DOMContentLoaded', () => {
    // Elemen Tampilan
    const nameDisplay = document.getElementById('name-display');
    const fieldDisplay = document.getElementById('field-display');
    const photoPreview = document.getElementById('photo-preview');
    const zoomWrapper = document.getElementById('zoom-wrapper');

    // Elemen Input Formulir
    const nameInput = document.getElementById('name-input');
    const fieldInput = document.getElementById('field-input');
    const photoInput = document.getElementById('photo-input');
    const downloadBtn = document.getElementById('download-btn');

    // Elemen Slider
    const xPosSlider = document.getElementById('x-pos-slider');
    const yPosSlider = document.getElementById('y-pos-slider');
    const zoomSlider = document.getElementById('zoom-slider');

    // --- FUNGSI UPDATE ---
    nameInput.addEventListener('input', () => {
        nameDisplay.textContent = nameInput.value || 'NAMA LENGKAP';
    });

    fieldInput.addEventListener('input', () => {
        fieldDisplay.textContent = fieldInput.value || 'BIDANG';
    });

    const updatePhotoPosition = () => {
        photoPreview.style.objectPosition = `${xPosSlider.value}% ${yPosSlider.value}%`;
    };

    const updatePhotoZoom = () => {
        zoomWrapper.style.transform = `scale(${zoomSlider.value})`;
    };

    // --- EVENT LISTENERS ---
    photoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                // Reset semua slider ke posisi default
                xPosSlider.value = 50;
                yPosSlider.value = 50;
                zoomSlider.value = 1;
                
                // Terapkan posisi & zoom default
                updatePhotoPosition();
                updatePhotoZoom();
            };
            reader.readAsDataURL(file);
        }
    });

    xPosSlider.addEventListener('input', updatePhotoPosition);
    yPosSlider.addEventListener('input', updatePhotoPosition);
    zoomSlider.addEventListener('input', updatePhotoZoom);

    // Fungsi unduh
    downloadBtn.addEventListener('click', () => {
        html2canvas(document.getElementById('card-design'), {
            useCORS: true,
            scale: 2 // Meningkatkan resolusi gambar hasil unduhan
        }).then(canvas => {
            const link = document.createElement('a');
            
            // Membuat nama file dinamis, jika nama kosong gunakan 'panitia'
            const fileName = nameInput.value.trim() ? nameInput.value.trim().replace(/\s+/g, '-') : 'panitia';
            link.download = `kartu-${fileName}.png`;
            
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});