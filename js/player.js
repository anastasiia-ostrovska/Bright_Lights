// get sec-1-player container:
const playerContainer = document.querySelector('#sec-1-player');
// query elements:
const playButton = playerContainer.querySelector('.play_button');
const playIcon = playerContainer.querySelector('.play_icon');

const handlePlayBtnClicked = (e) => {
    // get icon:
    const icon = e.currentTarget.querySelector('.play_icon');

    // change state:
    if (e.currentTarget.dataset.playing === 'true') {
        e.currentTarget.dataset.playing = 'false';
    } else {
        e.currentTarget.dataset.playing = 'true';
    }
    // change icon:
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
}

// add listener on playBtn click: 
playButton.addEventListener('click', handlePlayBtnClicked);

