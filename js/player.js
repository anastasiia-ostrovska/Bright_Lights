const activatePlayer = (playerId) => {
    // get sec-1-player container:
    const playerContainer = document.querySelector(playerId);
    // query elements:
    const audioElement = playerContainer.querySelector('.audio_element');
    const playButton = playerContainer.querySelector('.play_button');
    const playIcon = playerContainer.querySelector('.play_icon');
    const progressElContainer = playerContainer.querySelector('.player_progress_container');
    const progressEl = playerContainer.querySelector('.player_progress');
    const progressFilledEl = progressEl.querySelector('.player_progress_filled');
    const currentTimeEl = playerContainer.querySelector('.current_time');
    const durationEl = playerContainer.querySelector('.duration');

    let currentTimeState;

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

    const progressUpdate = (currentTime, duration) => {
        // update progresFillWidth:
        const percent = ((currentTime * 100) / duration);
        progressFilledEl.style.width = `${percent}%`;
    }

    const setSurrentTimeInfo = (secs) => {
        // update current Time:
        currentTimeEl.innerHTML = calculateTimeMMSS(secs);
    }

    const handleChangeProgress = () => {
        progressUpdate(audioElement.currentTime, audioElement.duration)
        setSurrentTimeInfo(audioElement.currentTime)
    }

    const handlePlayBtnClicked = (e) => {
        // change state:
        if (e.currentTarget.dataset.playing === 'false') {
            e.currentTarget.dataset.playing = 'true';
            audioElement.play();
            audioElement.currentTime = currentTimeState;
        } else {
            e.currentTarget.dataset.playing = 'false';
            audioElement.pause();
            audioElement.currentTime = currentTimeState;

        }
        // change icon:
        playIcon.classList.toggle('fa-play');
        playIcon.classList.toggle('fa-pause');
    }

    const activateThumbMoving = (e) => {
        // save changed time after each event:
        let changedCurrentTime;
        let moveRejected;

        // prevent default ommousedown behavior;
        e.preventDefault();

        // disable changing progress elements and time on timeupdate:
        audioElement.removeEventListener('timeupdate', handleChangeProgress);

        const moveThumb = (e) => {
            // check if move was rejected by user:
            const cursorY = e.pageY - scrollY;
            const pageBottom = document.documentElement.clientHeight;
            const rejectionCondition = cursorY < 0 || cursorY > pageBottom;

            if (rejectionCondition) {
                moveRejected = true;
                stopMoving();
            }

            // get coordinates of click:
            const progressElWidth = progressEl.clientWidth;
            const progressLeft = progressEl.getBoundingClientRect().left;

            // get percent of audio due to cursor position:
            const cursorX = e.pageX - progressLeft;
            let percent = (cursorX * 100) / progressElWidth;
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;

            // update progressFilledEl width and currentTimeEl due to percent:
            progressFilledEl.style.width = `${percent}%`
            changedCurrentTime = (percent * audioElement.duration) / 100;
            setSurrentTimeInfo(changedCurrentTime);
        }
        moveThumb(e);

        // add listeners on mousemove 
        document.addEventListener('mousemove', moveThumb);

        const stopMoving = () => {
            if (moveRejected && playButton.dataset.playing === 'false') {
                audioElement.currentTime = currentTimeState;
                handleChangeProgress();
            };
            if (!moveRejected) {
                audioElement.currentTime = changedCurrentTime;
            };
            moveRejected = null;
            // add listener handleChangeProgress;
            audioElement.addEventListener('timeupdate', handleChangeProgress);

            // remove listeners on mousemove and mouseup:
            document.removeEventListener('mousemove', moveThumb);
            document.removeEventListener('mouseup', stopMoving);
        }

        // add listeners on mouseup
        document.addEventListener('mouseup', stopMoving);
    }

    const trackReset = () => {
        playButton.dataset.playing = 'false';
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        audioElement.currentTime = 0;
    }

    const playerInit = () => {
        // set currentTimeState:
        currentTimeState = localStorage.getItem(`${playerId}/currentTime`);
        if (!currentTimeState) currentTimeState = 0;
        // set currentTime due to currentTimeState;
        audioElement.currentTime = currentTimeState;

        // show audio duration + add listener if metadata didn't load:
        if (audioElement.readyState > 0) {
            showDuration(audioElement.duration);
        } else {
            audioElement.addEventListener('loadedmetadata', () => {
                showDuration(audioElement.duration);
            });
        }
    }

    // add listener on timeupdate:
    audioElement.addEventListener('timeupdate', handleChangeProgress);
    audioElement.addEventListener('timeupdate', () => {
        // save currentime state:
        currentTimeState = audioElement.currentTime;
        localStorage.setItem(`${playerId}/currentTime`, currentTimeState);
    });

    // add listener on track ended:
    audioElement.addEventListener('ended', trackReset);

    // add listener on playBtn click: 
    playButton.addEventListener('click', handlePlayBtnClicked);
    // add listeners for progress element:
    progressElContainer.addEventListener('mousedown', activateThumbMoving);
    // prevent default browser behavior on dragstart:
    progressElContainer.ondragstart = () => false;

    // show player init state:
    playerInit();
}

activatePlayer('#sec-1-player');
activatePlayer('#sec-4-player');



