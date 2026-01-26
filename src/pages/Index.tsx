import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import { useEffect, useRef, useState } from 'react';

const slides = [
  { type: 'image', src: '/events/img1.jpg' },
  { type: 'video', src: '/events/home-video.mp4' },
  { type: 'image', src: '/events/img2.jpg' },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ---------- PRELOAD ALL MEDIA ---------- */
  useEffect(() => {
    slides.forEach(slide => {
      if (slide.type === 'image') {
        const img = new Image();
        img.src = slide.src;
      } else {
        const video = document.createElement('video');
        video.src = slide.src;
        video.preload = 'auto';
      }
    });
  }, []);

  const goTo = (index: number) => {
    setNext(index);
    setShowNext(true);

    setTimeout(() => {
      setCurrent(index);
      setShowNext(false);
    }, 400);
  };

  const nextSlide = () => {
    goTo((current + 1) % slides.length);
  };

  const prevSlide = () => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  };

  /* ---------- AUTO SLIDE FOR IMAGES ---------- */
  useEffect(() => {
    if (slides[current].type === 'video') return;

    const timer = setTimeout(nextSlide, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  /* ---------- VIDEO CONTROL ---------- */
  useEffect(() => {
    if (slides[current].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [current]);

  const renderSlide = (index: number, ref?: any) => {
    const slide = slides[index];
    if (slide.type === 'image') {
      return (
        <img
          src={slide.src}
          className="w-full h-full object-cover"
          alt="Homepage gallery"
        />
      );
    }
    return (
      <video
        ref={ref}
        src={slide.src}
        muted
        playsInline
        onEnded={nextSlide}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Home Gallery */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg">

            {/* Current slide (always visible) */}
            <div className="absolute inset-0">
              {renderSlide(current, videoRef)}
            </div>

            {/* Next slide (crossfade layer) */}
            {showNext && (
              <div className="absolute inset-0 animate-fade-in">
                {renderSlide(next)}
              </div>
            )}

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              ›
            </button>

          </div>
        </div>
      </section>

      <AboutSection />
    </div>
  );
};

export default Index;
