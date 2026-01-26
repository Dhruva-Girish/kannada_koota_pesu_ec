import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import { useEffect, useState } from 'react';

const slides = [
  { type: 'image', src: '/events/img1.JPG' },
  { type: 'video', poster: '/events/video-poster.png', src: '/events/home-video.mp4' },
  { type: 'image', src: '/events/img2.JPG' },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (slides[current].type === 'video') return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setPlayVideo(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setPlayVideo(false);
  };

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg bg-black">

            {slides[current].type === 'image' ? (
              <img
                src={slides[current].src}
                className="w-full h-full object-cover"
                alt="Homepage gallery"
              />
            ) : playVideo ? (
              <video
                src={slides[current].src}
                muted
                autoPlay
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${slides[current].poster})` }}
              >
                <button
                  onClick={() => setPlayVideo(true)}
                  className="bg-black/60 text-white px-6 py-3 rounded-full text-lg"
                >
                  ▶ Play Video
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      <AboutSection />
    </div>
  );
};

export default Index;
