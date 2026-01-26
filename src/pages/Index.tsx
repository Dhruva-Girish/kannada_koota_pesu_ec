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

  const isVideo = slides[current].type === 'video';

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Auto-slide images
  useEffect(() => {
    if (isVideo) return;

    const timer = setTimeout(nextSlide, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  // Control video
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [current]);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Media Gallery */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg bg-black transition-all duration-500"
            style={{
              backgroundImage: !isVideo
                ? `url(${slides[current].src})`
                : `url(/events/video-poster.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Video always mounted */}
            <video
              ref={videoRef}
              src="/events/home-video.mp4"
              muted
              playsInline
              onEnded={nextSlide}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideo ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
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
