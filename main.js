// Get the elements
const audioPlayer = document.querySelector('audio'); // Target the audio element directly
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressBar = document.getElementById('progress'); // Ensure it matches your HTML ID
const volumeSlider = document.getElementById('volumeSlider');
const songImage = document.querySelector('.song-image img'); // Target song image
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');

// Song list with audio and image sources
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

// Load the current song
function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.audioSrc;
    songImage.src = song.albumArt;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    // Debugging output
    console.log(`Loaded song: ${song.title}, Source: ${song.audioSrc}`);

    // Check if the browser can play the audio type
    const canPlay = audioPlayer.canPlayType('audio/jpg');
    if (canPlay === '') {
        console.warn(`Browser cannot play this file type for ${song.title}`);
    }
}

// Play button
playBtn.addEventListener('click', () => {
    audioPlayer.play()
        .then(() => {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            updateProgress();
        })
        .catch(err => console.error('Error playing the audio:', err));
});

// Pause button
pauseBtn.addEventListener('click', () => {
    audioPlayer.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
});

// Next button
document.getElementById('nextBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to start if at the last song
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the next song:', err));
});

// Previous button
document.getElementById('prevBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop back to end if at the first song
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the previous song:', err));
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    if (!isNaN(audioPlayer.duration)) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
}

// Allow user to change song position by dragging the progress bar
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Load the first song initially
loadSong(currentSongIndex);

// Event listener for when a song ends (auto-play next song)
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    }).catch(err => console.error('Error playing the next song after the current one ended:', err));
});

// Spacebar toggle play/pause functionality
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling the page
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
