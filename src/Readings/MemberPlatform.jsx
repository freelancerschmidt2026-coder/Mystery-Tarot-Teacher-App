import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, CreditCard, Star, ShieldCheck, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { TAROT_CARDS } from '../FlashCards/TarotData';
import './MemberPlatform.css';

const MOCK_READERS = [
  {
    id: 'r1',
    name: 'Seraphina Moon',
    pronouns: 'She/Her',
    specialties: ['Past Life', 'Karmic Debt'],
    rating: 4.9,
    reviews: 124,
    tokenPrice: 50,
    certification: 'Master Reader',
    avatar: 'https://picsum.photos/seed/seraphina/200',
    bio: 'Guiding souls through the veil for over a decade.'
  },
  {
    id: 'r2',
    name: 'Caspian Night',
    pronouns: 'He/Him',
    specialties: ['Career', 'Manifestation'],
    rating: 4.8,
    reviews: 89,
    tokenPrice: 40,
    certification: 'Certified Reader',
    avatar: 'https://picsum.photos/seed/caspian/200',
    bio: 'Practical wisdom meets mystical insight.'
  },
  {
    id: 'r3',
    name: 'Lyra Star',
    pronouns: 'They/Them',
    specialties: ['Relationships', 'Shadow Work'],
    rating: 5.0,
    reviews: 210,
    tokenPrice: 60,
    certification: 'Grand Master',
    avatar: 'https://picsum.photos/seed/lyra/200',
    bio: 'Illuminating the shadows to find your true light.'
  }
];

const MemberPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedReader, setSelectedReader] = useState(null);
  const [bookingStep, setBookingStep] = useState('browse'); // browse, detail, booking, success
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('finder_tokens');
    return saved ? parseInt(saved) : 500; // Start with some tokens for demo
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('reader_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('luna_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem('finder_course_progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Check if user is certified to show them in the list (optional feature)
  const totalCards = TAROT_CARDS.length;
  const masteredCards = TAROT_CARDS.filter(card => 
    testHistory.some(h => h.cardId === card.id && h.score >= 80)
  ).length;
  const coursesCompleted = Object.values(courseProgress).filter(v => v === true).length;
  const hasPassedExams = testHistory.some(h => h.type === 'Oral Exam') && testHistory.some(h => h.type === 'Written Exam');
  const isUserCertified = masteredCards === totalCards && coursesCompleted === 10 && hasPassedExams;

  const specialties = ['All', ...new Set(MOCK_READERS.flatMap(r => r.specialties))];

  const filteredReaders = MOCK_READERS.filter(reader => {
    const matchesSearch = reader.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || reader.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleBooking = (reader) => {
    if (tokens < reader.tokenPrice) {
      alert("Insufficient tokens. Visit the Sanctuary to earn more.");
      return;
    }
    setSelectedReader(reader);
    setBookingStep('booking');
  };

  const confirmBooking = () => {
    const newBalance = tokens - selectedReader.tokenPrice;
    setTokens(newBalance);
    localStorage.setItem('finder_tokens', newBalance.toString());
    setBookingStep('success');
  };

  const renderBrowse = () => (
    <div className="platform-browse">
      <div className="platform-controls">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search readers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-chips">
          {specialties.map(s => (
            <button 
              key={s} 
              className={`filter-chip ${selectedSpecialty === s ? 'active' : ''}`}
              onClick={() => setSelectedSpecialty(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="readers-grid">
        {filteredReaders.map(reader => (
          <motion.div 
            key={reader.id} 
            className="reader-card"
            whileHover={{ y: -5 }}
            onClick={() => {
              setSelectedReader(reader);
              setBookingStep('detail');
            }}
          >
            <div className="reader-avatar-wrapper">
              <img src={reader.avatar} alt={reader.name} referrerPolicy="no-referrer" />
              <div className="reader-rating">
                <Star size={12} fill="currentColor" />
                <span>{reader.rating}</span>
              </div>
            </div>
            <div className="reader-info">
              <h3 className="reader-name">{reader.name}</h3>
              <div className="reader-cert">
                <ShieldCheck size={14} />
                <span>{reader.certification}</span>
              </div>
              <div className="reader-specialties">
                {reader.specialties.slice(0, 2).map(s => <span key={s}>{s}</span>)}
              </div>
              <div className="reader-footer">
                <span className="token-price">{reader.tokenPrice} Tokens</span>
                <button className="view-btn">View Profile</button>
              </div>
            </div>
          </motion.div>
        ))}

        {isUserCertified && userProfile && (
          <div className="reader-card user-reader-card">
            <div className="reader-avatar-wrapper">
              <div className="user-avatar-placeholder">
                <User size={40} />
              </div>
              <div className="reader-rating">
                <Star size={12} fill="currentColor" />
                <span>New</span>
              </div>
            </div>
            <div className="reader-info">
              <h3 className="reader-name">{userProfile.name} (You)</h3>
              <div className="reader-cert">
                <ShieldCheck size={14} />
                <span>{userProfile.certificationLevel}</span>
              </div>
              <p className="text-[10px] opacity-50 italic mt-2">Your profile is visible to other members.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDetail = () => (
    <motion.div 
      className="reader-detail-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <button className="back-btn" onClick={() => setBookingStep('browse')}>← Back to Readers</button>
      
      <div className="detail-header">
        <img src={selectedReader.avatar} alt={selectedReader.name} className="detail-avatar" referrerPolicy="no-referrer" />
        <div className="detail-main">
          <h2 className="text-3xl font-serif">{selectedReader.name}</h2>
          <p className="opacity-60">{selectedReader.pronouns}</p>
          <div className="detail-badges">
            <span className="cert-badge"><ShieldCheck size={16} /> {selectedReader.certification}</span>
            <span className="rating-badge"><Star size={16} fill="currentColor" /> {selectedReader.rating} ({selectedReader.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-bio">
          <h3>About the Reader</h3>
          <p>{selectedReader.bio}</p>
        </div>
        <div className="detail-specialties">
          <h3>Specialties</h3>
          <div className="tags">
            {selectedReader.specialties.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <div className="price-info">
          <span className="label">Session Price</span>
          <span className="value">{selectedReader.tokenPrice} Tokens</span>
        </div>
        <button className="book-now-btn" onClick={() => handleBooking(selectedReader)}>Book Reading</button>
      </div>
    </motion.div>
  );

  const renderBooking = () => (
    <motion.div 
      className="booking-modal"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="booking-card">
        <h2 className="text-2xl font-serif mb-6">Confirm Your Reading</h2>
        <div className="booking-summary">
          <div className="summary-item">
            <User size={18} />
            <span>Reader: {selectedReader.name}</span>
          </div>
          <div className="summary-item">
            <Clock size={18} />
            <span>Duration: 30 Minute Deep Dive</span>
          </div>
          <div className="summary-item">
            <CreditCard size={18} />
            <span>Cost: {selectedReader.tokenPrice} Tokens</span>
          </div>
        </div>

        <div className="token-balance-check">
          <div className="flex justify-between mb-2">
            <span>Current Balance:</span>
            <span className="font-bold">{tokens} Tokens</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>After Booking:</span>
            <span className="font-bold">{tokens - selectedReader.tokenPrice} Tokens</span>
          </div>
        </div>

        <div className="booking-actions">
          <button className="confirm-btn" onClick={confirmBooking}>Confirm & Pay</button>
          <button className="cancel-btn" onClick={() => setBookingStep('detail')}>Cancel</button>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div 
      className="success-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="success-icon">
        <CheckCircle size={64} className="text-green-400" />
      </div>
      <h2 className="text-3xl font-serif mb-4">Reading Booked!</h2>
      <p className="opacity-70 mb-8 text-center">
        Your session with {selectedReader.name} has been scheduled. Check your NotePad for the meeting link and preparation guide.
      </p>
      <button className="return-btn" onClick={() => setBookingStep('browse')}>Return to Platform</button>
    </motion.div>
  );

  return (
    <div className="member-platform-container">
      <header className="platform-header">
        <div className="header-left">
          <h1 className="text-4xl font-serif text-blue-200">Member Readings</h1>
          <p className="opacity-50">Connect with certified Mystery Tarot Readers.</p>
        </div>
        <div className="token-display">
          <div className="token-icon">
            <Star size={20} fill="#fbbf24" className="text-amber-400" />
          </div>
          <div className="token-info">
            <span className="token-count">{tokens}</span>
            <span className="token-label">Tokens</span>
          </div>
        </div>
      </header>

      <div className="platform-content">
        {bookingStep === 'browse' && renderBrowse()}
        {bookingStep === 'detail' && renderDetail()}
        {bookingStep === 'booking' && renderBooking()}
        {bookingStep === 'success' && renderSuccess()}
      </div>
    </div>
  );
};

export default MemberPlatform;
