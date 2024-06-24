document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.querySelector('.nav-link[href="#about"]');
    const requestLink = document.querySelector('.nav-link[href="#request"]');
    const aboutModal = new bootstrap.Modal(document.getElementById('about'));
    const requestModal = new bootstrap.Modal(document.getElementById('request'));
    
    aboutLink.addEventListener('click', function() {
        aboutModal.show();
    });
    
    requestLink.addEventListener('click', function() {
        requestModal.show();
    });
});

    
    const songs = [
        './songs/Pagode/Churrasquinho do Menos é Mais - Melhor eu ir_Ligando os Fatos_Sonho de Amor_Deixa eu te querer.mp3',
        './songs/Pagode/Grupo Menos é Mais - Ficadinha.mp3',
        './songs/Sertanejo/Chitãozinho & Xororó - Galopeira [DVD 50 Anos Ao Vivo no Radio City Music Hall - NY].mp3',
        './songs/Sertanejo/Estrada de Cho.mp3',
        './songs/Sertanejo/RAM TCHUM.mp3',
        './songs/Trap/Borges - Loucura ft. Cabelinho & Veigh.mp3',
        './songs/Trap/Mc Daniel x Mc Paulin da Capital - Renasci das cinzas - Lyons produções.mp3',
        './songs/Trap/Poesia Acústica #15 - Mc Poze, Luiz Lins, MC Hariel, Azzy, JayA, Oruam,Slipmami, MC Cabelinho,Chefin.mp3'
    ];
    
    let currentSongIndex = 0;
    const audioPlayer = document.getElementById('audio-player');
    
    function loadSong() {
        audioPlayer.src = songs[currentSongIndex];
    }
    
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            document.getElementById('play-pause-btn').innerText = 'Pause';
        } else {
            audioPlayer.pause();
            document.getElementById('play-pause-btn').innerText = 'Play';
        }
    }
    
    function changeSong(index) {
        currentSongIndex = index;
        loadSong();
        audioPlayer.play();
    }
    
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong();
        audioPlayer.play();
    }
    
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong();
        audioPlayer.play();
    }
    
    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    document.getElementById('next-btn').addEventListener('click', nextSong);
    document.getElementById('prev-btn').addEventListener('click', prevSong);
    
    // Adiciona evento de clique para cada link de música na lista de reprodução
    const songLinks = document.querySelectorAll('.song-link');
    songLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            changeSong(index);
        });
    });
    
    loadSong();
