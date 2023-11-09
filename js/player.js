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
    // set key for localStorage savings:
    const currentTimeKey = `${playerId}/currentTime`

    // ---- 

    const saveCurrentTimeToLocalStorage = () => {
        localStorage.setItem(currentTimeKey, audioElement.currentTime);
    }

    const getCurrentTimeFromLocalStorage = () => {
        let currentTime = localStorage.getItem(currentTimeKey);
        if (!currentTime) currentTime = 0;

        return currentTime;
    }

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
        // update progressFillWidth:
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

        // prevent default onmousedown behavior;
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
        document.addEventListener('pointermove', startThumbMoving);

        const stopThumbMoving = () => {
            if (isCursorOutOfBounds && playButton.dataset.playing === 'false') {
                audioElement.currentTime = getCurrentTimeFromLocalStorage();
                handleChangeProgress();
            }
            if (!isCursorOutOfBounds) {
                audioElement.currentTime = changedCurrentTime;
            }
            isCursorOutOfBounds = null;
            // add listener handleChangeProgress;
            audioElement.addEventListener('timeupdate', handleChangeProgress);

            // remove listeners on mousemove and mouseup:
            document.removeEventListener('pointermove', startThumbMoving);
            document.removeEventListener('pointerup', stopThumbMoving);
        }

        // add listeners on mouseup
        document.addEventListener('pointerup', stopThumbMoving);
    }

    const resetTrack = () => {
        playButton.dataset.playing = 'false';
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        audioElement.currentTime = 0;
    }

    const initPlayer = () => {
        // set currentTime due to currentTimeState;
        audioElement.currentTime = getCurrentTimeFromLocalStorage();

        // show audio duration + add listener if metadata didn't load:
        if (audioElement.readyState > 0) {
            showDuration(audioElement.duration);
        } else {
            audioElement.addEventListener('loadedmetadata', () => {
                showDuration(audioElement.duration);
            });
        }
    }

    // ----

    const subscribeOnTimeupdate = () => {
        // add listener on timeupdate:
        audioElement.addEventListener('timeupdate', handleChangeProgress);
        audioElement.addEventListener('timeupdate', () => {
            // save current time state:
            saveCurrentTimeToLocalStorage();
        });
    }

    const subscribeOnPlay = () => {
        audioElement.addEventListener('play', () => {
            playButton.dataset.playing = 'true';
            togglePlayPauseIcon(playButton.dataset.playing);
        });
    }

    const subscribeOnPause = () => {
        audioElement.addEventListener('pause', () => {
            playButton.dataset.playing = 'false';
            togglePlayPauseIcon(playButton.dataset.playing);
        });
    }

    const subscribeOnTrackEnded = () => {
        // only if single track:
        if (audioElement.dataset.playlist === 'single-track') {
            audioElement.addEventListener('ended', resetTrack);
        }
    }

    const subscribeOnPlayBtnClick = () => {
        // add listener on playBtn click: 
        playButton.addEventListener('click', handlePlayBtnClicked);
    }

    const subscribeOnProgressElMousedown = () => {
        // add listeners for progress element:
        progressElContainer.addEventListener('pointerdown', activateThumbMoving);
        // prevent default browser behavior on dragstart:
        progressElContainer.ondragstart = () => false;
    }

    // ----

    // subscribe on events:
    subscribeOnTimeupdate();
    subscribeOnPlay();
    subscribeOnPause();
    subscribeOnTrackEnded();
    subscribeOnPlayBtnClick();
    subscribeOnProgressElMousedown();

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
    // set key for localStorage savings:
    const currentTrackInfoKey = `${playlistId}/currentTrackInfo`;

    // ----

    const setCurrentTrackInfoToLocalStorage = (index, src) => {
        const currentTrackInfo = {
            index,
            src,
        };
        localStorage.setItem(currentTrackInfoKey, `${JSON.stringify(currentTrackInfo)}`);
    }

    const getCurrentTrackInfoFromLocalStorage = () => {
        // get index and href of current track:
        let currentTrack = JSON.parse(localStorage.getItem(currentTrackInfoKey));

        if (!currentTrack) {
            currentTrack = {
                index: 0,
                src: links[0].getAttribute('href'),
            };
        }

        return currentTrack;
    }

    const resetActiveClass = (link) => {
        // remove class active from all links:
        links.forEach(link => link.classList.remove('active'));
        // add class active to current track:
        link.classList.add('active');
    }

    const getAnimationDuration = (link) => {
        // get element width:
        const width = link.offsetWidth;
        // return duration time:
        return width / 50;
    }

    const resetAnimationToCurrentTrack = (link) => {
        // remove class animated from all links + delete additional link:
        links.forEach(link => {
            if (link.classList.contains('animated')) link.nextElementSibling.remove();
            link.classList.remove('animated')
        });

        // add animation if link isn't fully visible:
        if (link.offsetWidth >= link.parentNode.offsetWidth) {
            // add class 'animated' to link:
            link.classList.add('animated');
            // add animation-duration:
            const duration = getAnimationDuration(link);
            link.style.animationDuration = `${duration}s`;
            // duplicate the link:
            const clonedLink = link.cloneNode(true);
            // add cloned link after link:
            link.insertAdjacentElement('afterend', clonedLink);
        }
    }

    const loadAudioSourceElSrc = (src) => {
        // set href to audioElement src + load:
        audioSourceEl.src = src;
        audioElement.load();
    }

    const switchTrack = (index, src, link) => {
        // set audioElement src + load:
        loadAudioSourceElSrc(src);
        resetActiveClass(link);
        resetAnimationToCurrentTrack(link);
        playTrackFromStart();
        // save track info lo localStorage:
        setCurrentTrackInfoToLocalStorage(index, audioSourceEl.src);
    }

    const playTrackFromStart = () => {
        // start from 0sec and play:
        audioElement.currentTime = 0;
        audioElement.play();
    }

    const onTrackLinkClick = (e, index) => {
        e.preventDefault();
        // check if clicked link is already active:
        const link = e.currentTarget;
        if (link.classList.contains('active')) return;

        // switch track and play from start: 
        const src = link.getAttribute('href');
        switchTrack(index, src, link);
    }

    const initPlaylist = () => {
        // get index and href of current track:
        const currentTrack = getCurrentTrackInfoFromLocalStorage();
        const link = links[currentTrack.index];
        // set audioElement src and load:
        loadAudioSourceElSrc(currentTrack.src);
        // add class active to current track:
        resetActiveClass(link);
        // add animation on current track title:
        resetAnimationToCurrentTrack(link);
    }

    // ----

    const subscribeOnTrackEnded = () => {
        // only if multiple tracks in playlist:
        if (audioElement.dataset.playlist === 'multiple-tracks') {
            audioElement.addEventListener('ended', () => {
                const currentTrack = getCurrentTrackInfoFromLocalStorage();
                let index = ++currentTrack.index;
                if (index > (links.length - 1)) index = 0;
                const link = links[index];
                const src = link.getAttribute('href');
                // switch track and play from start: 
                switchTrack(index, src, link);
            });
        }
    }

    const subscribeOnLinkClick = () => {
        // add listener on each link click:
        links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                onTrackLinkClick(e, index);
            });
        });
    }

    // ----

    // subscribe on events:
    subscribeOnTrackEnded();
    subscribeOnLinkClick();

    // show playlist init state:
    initPlaylist();
}
// ---- playlist functionality ends ----

// activate basic functionality of players and playlist:
activatePlayer('#sec_1_player');
activatePlaylist('#sec_4_playlist', '#sec_4_player');
activatePlayer('#sec_4_player');