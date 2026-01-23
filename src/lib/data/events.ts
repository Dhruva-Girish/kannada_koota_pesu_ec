export interface Event {
  id: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  teaser: string;
  image: string;
  location?: string;
  gallery?: string[];
}

/**
 * Date-based logic:
 * - Upcoming events: event.date >= today
 * - Past events:     event.date < today
 *
 * NOTE:
 * For events with no decided date (TBA),
 * a far-future placeholder date is used.
 */

export const events: Event[] = [
  {
    id: '1',
    title: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ Celebration 2025',
    date: '2024-11-07',
    teaser:
      'Join us for a grand celebration of Karnataka Formation Day with cultural performances, traditional food, and community gathering.',
    image: 'Events/202k 1.png',
    location: 'PES University EC MRD',
    gallery: [
      'Events/BK1.png',
      'Events/BK2.png',
      'Events/BK3.png',
    ],
  },
  {
    id: '2',
    title: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ Celebration 2024',
    date: '2024-11-01',
    teaser:
      'Join us for a grand celebration of Karnataka Formation Day with cultural performances, traditional food, and community gathering.',
    image: 'Events/202k 1.png',
    location: 'PES University EC MRD',
    gallery: [
      'Events/BK1.png',
      'Events/BK2.png',
      'Events/BK3.png',
    ],
  },
  {
    id: '3',
    title: 'Kannada Koota X Rotaract',
    date: '2023-09-03',
    teaser:
      'Learn Kannada with us in a fun and engaging way through games, drama, and interactive activities. It’s all about enjoying the language while building connections and culture.',
    image: '/Events/KKEC X RT 1.JPG',
    location: 'Seminar Hall 2',
    gallery: [
      '/Events/KKEC X RT 4.JPG',
      '/Events/KKEC X RT 3.JPG',
      '/Events/KKEC X RT 2.JPG',
    ],
  },
  {
    id: '4',
    title: 'Quadrangle Dance',
    date: '2023-09-10',
    teaser:
      'We performed a lively dance in the quadrangle to welcome the new students and showcase our rich Kannada culture.',
    image: '/Events/KKEC DC 1.jpg',
    location: 'Quadrangle PES EC',
    gallery: [
      '/Events/KKEC DC 2.jpg',
      '/Events/KKEC DC 3.png',
      '/Events/KKEC DC 5.png',
    ],
  },

  /* ---------- TBA EVENT ---------- */
  {
    id: 'club-head',
    title: 'New Club Head',
    date: '2026-02-15', // Placeholder future date
    teaser: 'To be announced soon...',
    image: '/Events/club-head.jpg',
  },
];

/* ---------- DATE HELPERS ---------- */

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getUpcomingEvents = () => {
  const today = getToday();

  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
};

export const getPastEvents = () => {
  const today = getToday();

  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getEventById = (id: string) =>
  events.find(event => event.id === id);
