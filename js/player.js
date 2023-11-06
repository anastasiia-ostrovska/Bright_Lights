// ---- basic player functionality starts ----
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

    const updateProgress = (currentTime, duration) => {
        // update progresFillWidth:
        const percent = ((currentTime * 100) / duration);
        progressFilledEl.style.width = `${percent}%`;
    }

    const setCurrentTimeInfo = (secs) => {
        // update current Time:
        currentTimeEl.innerHTML = calculateTimeMMSS(secs);
    }

    const handleChangeProgress = () => {
        updateProgress(audioElement.currentTime, audioElement.duration)
        setCurrentTimeInfo(audioElement.currentTime)
    }

    const togglePlayPauseIcon = (isPlaying) => {
        // change icon:
        if (isPlaying === 'true') {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }

    const handlePlayBtnClicked = (e) => {
        // change state:
        if (e.currentTarget.dataset.playing === 'false') {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }

    const activateThumbMoving = (e) => {
        // save changed time after each event:
        let changedCurrentTime;
        let isCursorOutOfBounds;

        // prevent default ommousedown behavior;
        e.preventDefault();

        // disable changing progress elements and time on timeupdate:
        audioElement.removeEventListener('timeupdate', handleChangeProgress);

        const startThumbMoving = (e) => {
            // check if move was rejected by user - out of bounds:
            const cursorY = e.pageY - scrollY;
            const pageBottom = document.documentElement.clientHeight;
            const rejectMovingCondition = cursorY < 0 || cursorY > pageBottom;

            if (rejectMovingCondition) {
                isCursorOutOfBounds = true;
                stopThumbMoving();
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
            setCurrentTimeInfo(changedCurrentTime);
        }
        startThumbMoving(e);

        // add listeners on mousemove 
        document.addEventListener('mousemove', startThumbMoving);

        const stopThumbMoving = () => {
            if (isCursorOutOfBounds && playButton.dataset.playing === 'false') {
                audioElement.currentTime = localStorage.getItem(`${playerId}/currentTime`);
                handleChangeProgress();
            };
            if (!isCursorOutOfBounds) {
                audioElement.currentTime = changedCurrentTime;
            };
            isCursorOutOfBounds = null;
            // add listener handleChangeProgress;
            audioElement.addEventListener('timeupdate', handleChangeProgress);

            // remove listeners on mousemove and mouseup:
            document.removeEventListener('mousemove', startThumbMoving);
            document.removeEventListener('mouseup', stopThumbMoving);
        }

        // add listeners on mouseup
        document.addEventListener('mouseup', stopThumbMoving);
    }

    const resetTrack = () => {
        playButton.dataset.playing = 'false';
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        audioElement.currentTime = 0;
    }

    const initPlayer = () => {
        // set currentTimeState:
        let currentTimeState = localStorage.getItem(`${playerId}/currentTime`);
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
        localStorage.setItem(`${playerId}/currentTime`, audioElement.currentTime);
    });

    // add listeners on play/pause:
    audioElement.onplay = function () {
        playButton.dataset.playing = 'true';
        togglePlayPauseIcon(playButton.dataset.playing);
    }
    audioElement.onpause = function () {
        playButton.dataset.playing = 'false';
        togglePlayPauseIcon(playButton.dataset.playing);
    }

    // add listener on track ended:
    audioElement.addEventListener('ended', resetTrack);

    // add listener on playBtn click: 
    playButton.addEventListener('click', handlePlayBtnClicked);
    // add listeners for progress element:
    progressElContainer.addEventListener('mousedown', activateThumbMoving);
    // prevent default browser behavior on dragstart:
    progressElContainer.ondragstart = () => false;

    // show player init state:
    initPlayer();
}
// ---- basic player functionality ends ----

// ---- playlist functionality starts ----
const activatePlaylist = (playlistId, playerId) => {
    // query elements:
    const playlistContainer = document.querySelector(playlistId);
    const playerContainer = document.querySelector(playerId);
    const audioElement = playerContainer.querySelector('.audio_element');
    const audioSourceEl = audioElement.querySelector('.audiosource');
    const links = playlistContainer.querySelectorAll('.sec_4_track_list_item a');

    let currentTrack;

    const saveCurrentTrackToLocalStorage = (index, src) => {
        const currentTrackInfo = {
            index,
            src,
        };
        localStorage.setItem(`${playerId}/currentTrackInfo`, `${JSON.stringify(currentTrackInfo)}`);
    }

    const resetActiveClass = (link) => {
        // remove class active from all links:
        links.forEach(link => link.classList.remove('active'));
        // add class active to current track:
        link.classList.add('active');
    }

    const switchTrack = (link, index) => {
        // set href to audioElement src + load:
        audioSourceEl.src = link.getAttribute('href');
        audioElement.load();

        // save track info lo localStorage:
        saveCurrentTrackToLocalStorage(index, audioSourceEl.src);
        currentTrack = JSON.parse(localStorage.getItem(`${playerId}/currentTrackInfo`));

        // reset 'active' class:
        resetActiveClass(link);
    }

    const playTrackFromStart = () => {
        // start from 0sec and play:
        audioElement.currentTime = 0;
        audioElement.play();
        // set data-playing 
    }

    const onTrackLinkClick = (e, index) => {
        e.preventDefault();
        // check if clicked link is already active:
        const link = e.currentTarget;
        if (link.classList.contains('active')) return;

        // switch track and play from start: 
        switchTrack(link, index);
        playTrackFromStart();
    }

    const initPlaylist = () => {
        // get index and href of current track:
        currentTrack = JSON.parse(localStorage.getItem(`${playerId}/currentTrackInfo`));

        if (!currentTrack) {
            currentTrack = {
                index: 0,
                src: links[0].getAttribute('href'),
            };
        }

        // set href to audioElement src and load:
        audioSourceEl.src = currentTrack.src;
        audioElement.load();

        // add class active to current track:
        links[currentTrack.index].classList.add('active');
    }

    // add listener on track ended:
    audioElement.addEventListener('ended', () => {
        const index = ++currentTrack.index;
        const link = links[index];
        // switch track and play from start: 
        switchTrack(link, index);
        playTrackFromStart();
    });
    // add listener on link click:
    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            onTrackLinkClick(e, index);
        });
    });

    initPlaylist();
}
// ---- playlist functionality ends ----

// activate basic functionality of players and playlist:
activatePlayer('#sec_1_player');
activatePlaylist('#sec_4_playlist', '#sec_4_player');
activatePlayer('#sec_4_player');