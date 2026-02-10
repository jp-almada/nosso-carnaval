document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Grid de Posts (Busca img/dias/diaX-1.png) ---
    const dias = [
        "Quarta", "Quinta", "Sexta", "Sábado", 
        "Domingo", "Segunda", "Terça", "Quarta", 
        "Quinta", "Sexta", "Sábado"
    ];
    const gridContainer = document.getElementById('grid-posts');

    dias.forEach((dia, index) => {
        const diaNumero = index + 1; 
        const link = document.createElement('a');
        link.href = `dia${diaNumero}.html`; 
        link.className = 'grid-item pulse-click';
        link.style.animation = `fadeUp 0.5s ease forwards ${0.2 + (index * 0.05)}s`;
        link.style.opacity = '0'; 
        
        // ATUALIZADO PARA PNG
        link.innerHTML = `
            <img src="img/dias/dia${diaNumero}-1.png" alt="${dia}">
            <div class="day-overlay">${dia}</div>
        `;
        gridContainer.appendChild(link);
    });

    // --- 2. Stories (Atualizado para PNG e 3 fotos) ---
    const storiesData = {
        'eu': [
            'img/destaques/eu-1.jpeg',
            'img/destaques/eu-2.jpeg',
            'img/destaques/eu-3.jpeg'
        ],
        'te': [
            'img/destaques/te-1.jpeg',
            'img/destaques/te-2.jpeg',
            'img/destaques/te-3.jpeg'
        ],
        'amo': [
            'img/destaques/amo-1.jpeg',
            'img/destaques/amo-2.jpeg',
            'img/destaques/amo-3.jpeg'
        ]
    };

    // --- Lógica do Modal (Sem alterações) ---
    const storyModal = document.getElementById('storyModal');
    const storyImage = document.getElementById('storyImage');
    const progressContainer = document.getElementById('progressContainer');
    const closeStoryBtn = document.getElementById('closeStoryBtn');
    const tapLeft = document.getElementById('tapLeft');
    const tapRight = document.getElementById('tapRight');

    let currentStoryGroup = [];
    let currentImageIndex = 0;

    function openStory(groupName) {
        currentStoryGroup = storiesData[groupName];
        currentImageIndex = 0;
        if (!currentStoryGroup || currentStoryGroup.length === 0) return;
        updateStoryImage();
        createProgressBars();
        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeStory() {
        storyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateStoryImage() {
        storyImage.src = currentStoryGroup[currentImageIndex];
        const bars = document.querySelectorAll('.progress-fill');
        bars.forEach((bar, index) => {
            if (index < currentImageIndex) bar.style.width = '100%';
            else if (index === currentImageIndex) bar.style.width = '100%';
            else bar.style.width = '0%';
        });
    }

    function createProgressBars() {
        progressContainer.innerHTML = '';
        currentStoryGroup.forEach(() => {
            const barBg = document.createElement('div');
            barBg.className = 'progress-bar';
            barBg.innerHTML = '<div class="progress-fill"></div>';
            progressContainer.appendChild(barBg);
        });
    }

    tapRight.addEventListener('click', () => {
        if (currentImageIndex < currentStoryGroup.length - 1) {
            currentImageIndex++;
            updateStoryImage();
        } else {
            closeStory();
        }
    });

    tapLeft.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateStoryImage();
        }
    });

    document.querySelectorAll('.highlight').forEach(highlight => {
        highlight.addEventListener('click', function() {
            const storyType = this.getAttribute('data-story');
            openStory(storyType);
        });
    });

    closeStoryBtn.addEventListener('click', closeStory);
});