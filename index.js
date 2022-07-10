                        const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];
                        const audioTag = document.getElementsByClassName("audioTag")[0];
                        const currentAndTotleTimeTag = document.getElementsByClassName("currentAndTotleTime")[0];
                        const currentProgressTag = document.getElementById("currentProgress");
                        const playButtonTag = document.getElementsByClassName("playButton")[0];
                        const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
                        const previouseButtonTag = document.getElementsByClassName("previousButton")[0];
                        const nextButtonTag = document.getElementsByClassName("nextButton")[0];


                        const tracks = [
                                {trackId: "mp3/track1.mp3", title: "perfect - Ed Sheeran"},
                                {trackId: "mp3/track2.mp3", title: "Love The Way You Lie - Eminem"},
                                {trackId: "mp3/track3.mp3", title: "I Do - 911 Band"},
                                {trackId: "mp3/track4.mp3", title: "Shallow - Lady Gaga,bradley Cooper"},
                                {trackId: "mp3/track5.mp3", title: "Blue Night - Michael learns To Rock"},
                                {trackId: "mp3/track6.mp3", title: "Just Give Me A Reason - Pink"},
                                {trackId: "mp3/track7.mp3", title: "When You're Gone - Shawn Mendes"},
                        ];

                        for(let i = 0; i < tracks.length; i++) {
                        const trackTag = document.createElement("div");
                        trackTag.addEventListener("click", () => {
                        currentPlayingIndex = i;
                        playSong();
                        });
                        trackTag.classList.add("trackItem");
                        const title = (i + 1).toString() + ". " + tracks[i].title;
                        trackTag.textContent = title;
                        playlistContainerTag.append(trackTag);
                        }

                        let duration = 0;
                        let durationText = "=";
                        audioTag.addEventListener("loadeddata", () => {
                        duration = Math.floor(audioTag.duration);
                        durationText = createMinuteAndSecondText(duration);


                        });

                        audioTag.addEventListener("timeupdate", () => {
                                const currentTime = Math.floor(audioTag.currentTime);
                                const currentTimeText = createMinuteAndSecondText(currentTime);
                                const currentTimeTextAndDurationTexxt = currentTimeText + " / " + durationText;
                                currentAndTotleTimeTag.textContent = currentTimeTextAndDurationTexxt;
                                updateCurrentProgress(currentTime);
                        });

                        const updateCurrentProgress = (currentTime) => {
                        const currentProgressWidth = (500 / duration ) * currentTime;
                        currentProgressTag.style.width = currentProgressWidth.toString() + "px";
                        }

                        const createMinuteAndSecondText = (totalSecond) => {
                                const minutes = Math.floor(totalSecond / 60);
                                const seconds = totalSecond % 60;

                                const minuteTag = minutes < 10 ? "0" + minutes.toString() : minutes;
                                const secondTag = seconds < 10 ? "0" + seconds.toString() : seconds;
                                return minuteTag + ":" + secondTag;
                        };

                        let currentPlayingIndex = 0;
                        let isPlaying = false;
                        playButtonTag.addEventListener("click", () => {
                                const currentTime = Math.floor(audioTag.currentTime);
                                isPlaying = true;
                                if(currentTime === 0) {
                                playSong();

                                }else {
                                        audioTag.play();
                                        updatePlayAndPauseButton();

                                }

                        });


                        pauseButtonTag.addEventListener("click", () => {
                                isPlaying = false;
                                audioTag.pause();
                                updatePlayAndPauseButton();
                        });

                        previouseButtonTag.addEventListener("click", () => {
                                if(currentPlayingIndex === 0) {
                                        return;
                                }
                                currentPlayingIndex -= 1;
                                playSong();

                        });


                        nextButtonTag.addEventListener("click", () => {
                                if(currentPlayingIndex === tracks.length - 1) {
                                        return;
                                }
                                currentPlayingIndex += 1;
                                playSong();
                        });

                        const playSong = () => {
                                const songIdToPlay = tracks[currentPlayingIndex].trackId;
                                audioTag.src = songIdToPlay;
                                audioTag.play();
                                isPlaying = true;
                                updatePlayAndPauseButton();
                        }


                        const updatePlayAndPauseButton = () => {
                                if(isPlaying) {
                                        playButtonTag.style.display = "none" ;
                                        pauseButtonTag.style.display = "inline";
                                }else {
                                        playButtonTag.style.display = "inline" ;
                                        pauseButtonTag.style.display = "none";
                                }
                        };
