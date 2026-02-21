  (function() {
        let currentPlaylistIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        const tabs = document.querySelectorAll('.tab');
        const playlistsWrapper = document.getElementById('playlistsWrapper');
        const dots = document.querySelectorAll('.dot');
        const swipeArea = document.getElementById('swipeArea');

        function setActivePlaylist(index) {
            if (index < 0 || index >= tabs.length || index === currentPlaylistIndex) return;

            currentPlaylistIndex = index;
            playlistsWrapper.style.transform = `translateX(-${index * 100}%)`;

            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                setActivePlaylist(index);
            });
        });

        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            if (Math.abs(e.touches[0].clientX - touchStartX) > 20) {
                e.preventDefault();
            }
        }

        function handleTouchEnd(e) {
            if (touchStartX === 0) return;
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0 && currentPlaylistIndex < tabs.length - 1) {
                    setActivePlaylist(currentPlaylistIndex + 1);
                } else if (diff < 0 && currentPlaylistIndex > 0) {
                    setActivePlaylist(currentPlaylistIndex - 1);
                }
            }
            touchStartX = 0;
            touchEndX = 0;
        }
        document.querySelectorAll('.play-pause').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('played') 
                    ? this.classList.remove('paused') 
                    : this.classList.add('paused');
            });
        });

        swipeArea.addEventListener('touchstart', handleTouchStart, { passive: false });
        swipeArea.addEventListener('touchmove', handleTouchMove, { passive: false });
        swipeArea.addEventListener('touchend', handleTouchEnd);

        window.addEventListener('resize', () => {
            playlistsWrapper.style.transform = `translateX(-${currentPlaylistIndex * 100}%)`;
        });
    })();
