const audioPlayer = document.querySelector('audio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressBar = document.getElementById('progress');
const volumeSlider = document.getElementById('volumeSlider');
const songImage = document.querySelector('.song-image img');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');

const songs = [
    {
        title: "Tip Tip Barsa Pani",
        artist: "Song by Alka Yagnik and Udit Narayan",
        audioSrc: "/assests/audio-songs/Tip Tip Barsa Pani 2.0 song.mp3",
        albumArt: "/assests/title-images/tip tip barsa pani.jpg"
    },
    {
        title: "Safari",
        artist: "Song by Colombian singer J Balvin",
        audioSrc: "/assests/audio-songs/Safari(PagalWorld).mp3",
        albumArt: "/assests/title-images/safari.jpg"
    },
    {
        title: "Aayi nai",
        artist: "Singer Pawan Singh, Simran Choudhary",
        audioSrc: "/assests/audio-songs/Aayi Nai Stree 2 320 Kbps.mp3",
        albumArt: "/assests/title-images/Aayi-Nai.jpg"
    },
    {
        title: "Aaj ki Raat",
        artist: "Singer Sachin-Jigar, Madhubanti Bagchi",
        audioSrc: "/assests/audio-songs/Aaj Ki Raat Stree 2 320 Kbps.mp3",
        albumArt: "/assests/title-images/aaj ki raat.jpg"
    },
    {
        title: "Khula Hai Maikhana",
        artist: "Singer Nusrat Fateh Ali Khan",
        audioSrc: "/assests/audio-songs/Khula Hai Maikhana (Remix) - Nusrat Fateh Ali Khan.mp3",
        albumArt: "/assests/title-images/Nusrat Fateh Ali Khan.jpg"
    }
];

let currentSongIndex = 0;

function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.audioSrc;
    songImage.src = song.albumArt;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    console.log(`Loaded song: ${song.title}, Source: ${song.audioSrc}`);

    const canPlay = audioPlayer.canPlayType('audio/jpg');
    if (canPlay === '') {
        console.warn(`Browser cannot play this file type for ${song.title}`);
    }
}

playBtn.addEventListener('click', () => {
    audioPlayer.play()
        .then(() => {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            updateProgress();
        })
        .catch(err => console.error('Error playing the audio:', err));
});

pauseBtn.addEventListener('click', () => {
    audioPlayer.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the next song:', err));
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the previous song:', err));
});

audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    if (!isNaN(audioPlayer.duration)) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
}

progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

loadSong(currentSongIndex);

audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the next song after the current one ended:', err));
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
            }).catch(err => console.error('Error playing the audio:', err));
        } else {
            audioPlayer.pause();
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    }
});