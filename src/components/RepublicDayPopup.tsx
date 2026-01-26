import { useEffect, useState } from "react";

export default function RepublicDayPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date();
    const isRepublicDay =
      today.getDate() === 26 && today.getMonth() === 0; // Jan = 0

    if (isRepublicDay) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-black rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-white text-xl font-bold hover:opacity-70"
        >
          ×
        </button>

        {/* Image */}
        <img
          src="/republic-day.png"
          alt="Happy Republic Day"
          className="w-full object-cover"
        />

        {/* Text */}
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-yellow-400">
            🇮🇳 Happy Republic Day 🇮🇳
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Celebrating the spirit of our Constitution
          </p>
        </div>
      </div>
    </div>
  );
}
