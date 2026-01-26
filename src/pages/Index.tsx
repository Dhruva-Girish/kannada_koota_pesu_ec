import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import { useEffect, useRef, useState } from 'react';

const slides = [
  { type: 'image', src: '/events/img1.JPG' },
  { type: 'video', src: '/events/home-video.mp4' },
  { type: 'image', src: '/events/img2.JPG' },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
      setFade(true);
    }, 300);
  };

  // Auto slide for images
  useEffect(() => {
    if (slides[current].type === 'video') return;

    const timer = setTimeout(nextSlide, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  // Play video when active
  useEffect(() => {
    if (slides[current].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [current]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Home Media Gallery */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg bg-black">
            {/* Slide */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slides[current].type === 'image' ? (
                <img
                  src={slides[current].src}
                  alt="Homepage gallery"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={slides[current].src}
                  muted
                  playsInline
                  onEnded={nextSlide}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

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

      {/* About */}
      <AboutSection />
    </div>
  );
};

export default Index;
