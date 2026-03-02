import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const VideoModal = ({ team, onClose }) => {
    const videoRef = useRef(null);

    // ESC key handler
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    // Safe body scroll lock + ESC listener + autoplay
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        // Start playback from 0:00
        const video = videoRef.current;
        if (video) {
            const tryPlay = async () => {
                try {
                    video.currentTime = 0;
                    await video.play();
                } catch {
                    // Autoplay blocked — controls visible, user can press Play
                }
            };
            tryPlay();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [handleKeyDown]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-off-white/70 hover:text-off-white text-sm font-secondary tracking-widest uppercase transition-colors duration-200"
                    aria-label="Close video"
                >
                    Close ✕
                </button>

                {/* Video container */}
                <div className="relative w-full aspect-video bg-black rounded overflow-hidden">
                    <video
                        ref={videoRef}
                        src={team.videoSrc}
                        poster={team.poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                    />

                    {/* Watermark — bottom right in modal */}
                    <img
                        src={team.logo}
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 pointer-events-none select-none grayscale"
                        style={{ width: '15%', opacity: 0.09 }}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VideoModal;
