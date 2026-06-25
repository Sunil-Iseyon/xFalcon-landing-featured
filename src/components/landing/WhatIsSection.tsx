'use client';

import { useRef, useState } from 'react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface WhatIsSectionProps {
  text: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function WhatIsSection({ text }: WhatIsSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? currentTime / duration : 0;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setCurrentTime(video.currentTime);
  };

  return (
    <section id="what-is-xfalcon" className="scroll-mt-28 px-4 py-16 md:py-20 lg:px-8 lg:py-24" style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <MotionReveal>
            <p className="font-eyebrow"  style={{ color: "var(--accent-glow)" }}>
              What is xFalcon?
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight" style={{ color: "var(--text)" }}>
              Analytics Built for Your Industry,{' '}
              <span className="bg-[linear-gradient(90deg,#06B6D4_0%,#2563EB_100%)] bg-clip-text text-transparent">
                Not Generic AI
              </span>
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.16}>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {text}
            </p>
          </MotionReveal>
        </div>

        {/* Video showcase */}
        <MotionReveal delay={0.24}>
          <div className="relative">
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-4 -top-6 h-24 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.10),transparent_72%)]"
            />

            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid var(--border)" }}>
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 border-b px-4 py-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="mx-auto flex items-center gap-1.5 rounded-full px-4 py-1" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                  <svg aria-hidden="true" className="h-3 w-3 text-[#94A3B8]" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M5.5 8c0-1.38.57-2.63 1.5-3.54M10.5 8c0 1.38-.57 2.63-1.5 3.54M2 8h12M8 2.5C6.5 4 5.5 5.9 5.5 8s1 4 2.5 5.5"
                      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-xs text-[#94A3B8] select-none">xfalcon.ai</span>
                </div>
              </div>

              {/* Video + controls */}
              <div className="relative group">
                <video
                  ref={videoRef}
                  src="/xfalcon-data-model.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block h-auto w-full" style={{ background: "var(--surface-raised)" }}
                  onTimeUpdate={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    setCurrentTime(v.currentTime);
                    if (v.duration && isFinite(v.duration)) setDuration(v.duration);
                  }}
                  onDurationChange={() => {
                    const v = videoRef.current;
                    if (v?.duration && isFinite(v.duration)) setDuration(v.duration);
                  }}
                  onLoadedMetadata={() => {
                    const v = videoRef.current;
                    if (v?.duration && isFinite(v.duration)) setDuration(v.duration);
                  }}
                />

                {/* Control bar — visible on hover */}
                <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                  {/* Dark scrim */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                  <div className="relative px-4 pb-3 pt-10 space-y-2">
                    {/* Progress bar */}
                    <div
                      role="slider"
                      aria-label="Video progress"
                      aria-valuenow={Math.round(progress * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      tabIndex={0}
                      className="h-1.5 w-full rounded-full bg-white/30 cursor-pointer hover:h-2.5 transition-all duration-150"
                      onClick={seek}
                      onKeyDown={(e) => {
                        const video = videoRef.current;
                        if (!video) return;
                        if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + 5);
                        if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 5);
                      }}
                    >
                      <div
                        className="h-full rounded-full bg-linear-to-r from-[#06B6D4] to-[#2563EB] pointer-events-none"
                        style={{ width: `${isFinite(progress) ? progress * 100 : 0}%` }}
                      />
                    </div>

                    {/* Buttons row */}
                    <div className="flex items-center gap-3">
                      {/* Play / Pause */}
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={playing ? 'Pause video' : 'Play video'}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        {playing ? (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                            <rect x="5" y="4" width="3" height="12" rx="1" />
                            <rect x="12" y="4" width="3" height="12" rx="1" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                            <path d="M6.3 4.5a1 1 0 0 1 1.5-.87l8 5a1 1 0 0 1 0 1.74l-8 5A1 1 0 0 1 6.3 14.5v-10Z" />
                          </svg>
                        )}
                      </button>

                      {/* Time */}
                      <span className="text-xs text-white/80 tabular-nums select-none">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>

                      <div className="flex-1" />

                      {/* Sound toggle */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={muted ? 'Unmute video' : 'Mute video'}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        {muted ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

export default WhatIsSection;
