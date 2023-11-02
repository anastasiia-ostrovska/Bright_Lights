// get sec-1-player container:
const playerContainer = document.querySelector('#sec-1-player');
// query elements:
const audioElement = playerContainer.querySelector('.audio_element');
const playButton = playerContainer.querySelector('.play_button');
const playIcon = playerContainer.querySelector('.play_icon');
const progressEl = playerContainer.querySelector('.player_progress');
const progressFilledEl = progressEl.querySelector('.player_progress_filled');
const progressThumb = progressEl.querySelector('.player_progress_thumb_container');
const currentTimeEl = playerContainer.querySelector('.current_time');
const durationEl = playerContainer.querySelector('.duration');


const calculateTimeMMSS = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
}

const showDuration = (duration) => {
    durationEl.innerHTML = calculateTimeMMSS(duration);
}

const progressUpdate = (duration, currentTime) => {
    // update progresFillWidth:
    const percent = (currentTime * 100) / duration;
    progressFilledEl.style.width = `${percent}%`

    // update current Time:
    currentTimeEl.innerHTML = calculateTimeMMSS(currentTime);
}

const trackReset = () => {
    playButton.dataset.playing = 'false';
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audioElement.currentTime = 0;
}

const handlePlayBtnClicked = (e) => {
    // change state:
    if (e.currentTarget.dataset.playing === 'false') {
        e.currentTarget.dataset.playing = 'true';
        audioElement.play();
    } else {
        e.currentTarget.dataset.playing = 'false';
        audioElement.pause();
    }
    // change icon:
    playIcon.classList.toggle('fa-play');
    playIcon.classList.toggle('fa-pause');
}

audioElement.currentTime = 170;

// show audio duration + add listener if metadata didn't load:
if (audioElement.readyState > 0) {
    showDuration(audioElement.duration);
} else {
    audioElement.addEventListener('loadedmetadata', () => {
        showDuration(audioElement.duration);
    });
}
// add listener on timeupdate:
audioElement.addEventListener('timeupdate', () => {
    progressUpdate(audioElement.duration, audioElement.currentTime);
});
// add listener on track ended:
audioElement.addEventListener('ended', trackReset);
// add listener on playBtn click: 
playButton.addEventListener('click', handlePlayBtnClicked);

