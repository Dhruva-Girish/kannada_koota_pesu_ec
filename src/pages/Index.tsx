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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto slide for images
  useEffect(() => {
    if (slides[current].type === 'video') return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [current]);

  // Play video when slide is active
  useEffect(() => {
    if (slides[current].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Home Media Gallery */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[450px]">
            {slides[current].type === 'image' ? (
              <img
                src={slides[current].src}
                alt="Homepage gallery"
                className="w-full h-full object-cover"
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
        </div>
      </section>

      {/* About */}
      <AboutSection />
    </div>
  );
};

export default Index;
