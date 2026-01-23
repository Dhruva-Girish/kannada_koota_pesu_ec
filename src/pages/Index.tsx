import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Home Page Video Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <video
              src="/home-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default Index;
