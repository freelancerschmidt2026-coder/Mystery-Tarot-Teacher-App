import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, CreditCard, Star, ShieldCheck, User, Clock, CheckCircle, AlertCircle, Globe, Lock, Unlock, Trophy } from 'lucide-react';
import './PublicPlatform.css';

const MOCK_PUBLIC_READERS = [
  {
    id: 'pr1',
    name: 'Oracle Elara',
    specialties: ['Ancestral Healing', 'Soul Purpose'],
    rating: 4.9,
    reviews: 342,
    price: 75, // Real currency (simulated)
    certification: 'Grand Master',
    rank: { id: 'master', name: 'Master Reader', index: 4 },
    avatar: 'https://picsum.photos/seed/elara/200',
    bio: 'Bridging the gap between the physical and spiritual realms for over 15 years.',
    isApproved: true
  },
  {
    id: 'pr2',
    name: 'Zenith Thorne',
    specialties: ['Business Intuition', 'Strategic Tarot'],
    rating: 4.7,
    reviews: 156,
    price: 90,
    certification: 'Certified Professional',
    rank: { id: 'expert', name: 'Expert Reader', index: 3 },
    avatar: 'https://picsum.photos/seed/zenith/200',
    bio: 'Helping entrepreneurs align their vision with cosmic timing.',
    isApproved: true
  },
  {
    id: 'pr3',
    name: 'Nova Bloom',
    specialties: ['Love & Alignment', 'Shadow Integration'],
    rating: 5.0,
    reviews: 520,
    price: 120,
    certification: 'Master Reader',
    rank: { id: 'elite', name: 'Luna-Certified Elite', index: 5 },
    avatar: 'https://picsum.photos/seed/nova/200',
    bio: 'Specializing in deep emotional healing and relationship dynamics.',
    isApproved: true
  },
  {
    id: 'pr4',
    name: 'Silas Vane',
    specialties: ['Dream Analysis', 'Lucid Dreaming'],
    rating: 4.5,
    reviews: 42,
    price: 60,
    certification: 'Certified Reader',
    rank: { id: 'skilled', name: 'Skilled Reader', index: 2 },
    avatar: 'https://picsum.photos/seed/silas/200',
    bio: 'Exploring the subconscious through the lens of the Tarot.',
    isApproved: false
  }
];

const PublicPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReader, setSelectedReader] = useState(null);
  const [view, setView] = useState('browse'); // browse, detail, payment, success
  const [isAdmin, setIsAdmin] = useState(false); // For testing approval system
  const [readers, setReaders] = useState(MOCK_PUBLIC_READERS);

  // Check for user's own certified profile to show "Apply for Public Listing"
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

  const isUserCertified = () => {
    if (!userProfile) return false;
    const coursesCompleted = Object.values(courseProgress).filter(v => v === true).length;
    const masteredCards = testHistory.filter(h => h.score >= 80).length; // Simplified check
    const hasPassedExams = testHistory.some(h => h.type === 'Oral Exam') && testHistory.some(h => h.type === 'Written Exam');
    return coursesCompleted === 10 && masteredCards >= 78 && hasPassedExams;
  };

  const filteredReaders = readers
    .filter(r => (isAdmin || r.isApproved) && r.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (b.rank?.index || 0) - (a.rank?.index || 0));

  const handleApprove = (id) => {
    setReaders(prev => prev.map(r => r.id === id ? { ...r, isApproved: true } : r));
  };

  const handleReject = (id) => {
    setReaders(prev => prev.filter(r => r.id !== id));
  };

  const renderAdminView = () => (
    <div className="admin-approval-view">
      <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
        <ShieldCheck className="text-amber-400" />
        Reader Approval Queue
      </h2>
      <div className="approval-list space-y-4">
        {readers.filter(r => !r.isApproved).length === 0 && (
          <p className="opacity-50 italic">No pending applications.</p>
        )}
        {readers.filter(r => !r.isApproved).map(reader => (
          <div key={reader.id} className="approval-item p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={reader.avatar} alt={reader.name} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold">{reader.name}</h4>
                <p className="text-xs opacity-50">{reader.certification}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleApprove(reader.id)} className="px-4 py-2 bg-green-600 rounded-lg text-xs font-bold">Approve</button>
              <button onClick={() => handleReject(reader.id)} className="px-4 py-2 bg-red-600 rounded-lg text-xs font-bold">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="public-browse">
      {isAdmin && renderAdminView()}
      
      <div className="public-hero mt-12">
        <Globe className="hero-icon" size={48} />
        <h1 className="text-5xl font-serif mb-4">The Mystery Marketplace</h1>
        <p className="text-xl opacity-60 max-w-2xl mx-auto">
          Connect with world-class, certified Mystery Tarot Readers. 
          Every reader on this platform has passed the rigorous Luna Mastery Certification.
        </p>
      </div>

      <div className="public-search-container">
        <div className="public-search">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="public-grid">
        {filteredReaders.map(reader => (
          <motion.div 
            key={reader.id} 
            className="public-reader-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setSelectedReader(reader);
              setView('detail');
            }}
          >
            <div className="card-image">
              <img src={reader.avatar} alt={reader.name} referrerPolicy="no-referrer" />
              <div className="card-badge">{reader.certification}</div>
              <div className="card-rank-badge">
                <Trophy size={10} /> {reader.rank?.name}
              </div>
            </div>
            <div className="card-info">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{reader.name}</h3>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star size={14} fill="currentColor" />
                  {reader.rating}
                </div>
              </div>
              <div className="specialties-tags">
                {reader.specialties.map(s => <span key={s}>{s}</span>)}
              </div>
              <div className="card-footer">
                <span className="price-tag">${reader.price} <small>/ session</small></span>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isUserCertified() && (
        <div className="apply-section mt-20 p-10 bg-blue-900/20 border border-blue-400/30 rounded-3xl text-center">
          <h2 className="text-2xl font-serif mb-4">You are eligible for Public Listing!</h2>
          <p className="opacity-70 mb-6">As a Certified Mystery Reader, you can offer your services to the public.</p>
          <button className="apply-btn">Apply for Marketplace Approval</button>
        </div>
      )}
    </div>
  );

  const renderDetail = () => (
    <motion.div 
      className="public-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="back-link" onClick={() => setView('browse')}>← Back to Marketplace</button>
      
      <div className="detail-layout">
        <div className="detail-sidebar">
          <img src={selectedReader.avatar} alt={selectedReader.name} className="main-avatar" referrerPolicy="no-referrer" />
          <div className="stats-box">
            <div className="stat">
              <span className="stat-val">{selectedReader.reviews}</span>
              <span className="stat-label">Reviews</span>
            </div>
            <div className="stat">
              <span className="stat-val">{selectedReader.rating}</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="text-4xl font-serif mb-2">{selectedReader.name}</h2>
          <div className="flex items-center gap-2 text-blue-300 mb-6">
            <ShieldCheck size={18} />
            <span className="font-bold tracking-widest uppercase text-xs">{selectedReader.certification}</span>
          </div>

          <div className="bio-section mb-8">
            <h4 className="text-sm font-bold uppercase opacity-50 mb-3">About the Reader</h4>
            <p className="text-lg leading-relaxed">{selectedReader.bio}</p>
          </div>

          <div className="specialties-section mb-10">
            <h4 className="text-sm font-bold uppercase opacity-50 mb-3">Expertise</h4>
            <div className="flex gap-3 flex-wrap">
              {selectedReader.specialties.map(s => <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">{s}</span>)}
            </div>
          </div>

          <div className="booking-cta">
            <div className="price-display">
              <span className="text-sm opacity-50">Session Fee</span>
              <span className="text-3xl font-bold">${selectedReader.price}</span>
            </div>
            <button className="checkout-btn" onClick={() => setView('payment')}>Proceed to Secure Checkout</button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPayment = () => (
    <div className="payment-view">
      <div className="payment-card">
        <h2 className="text-2xl font-serif mb-8">Secure Checkout</h2>
        
        <div className="order-summary mb-8 p-4 bg-black/20 rounded-xl">
          <div className="flex justify-between mb-2">
            <span>Reading with {selectedReader.name}</span>
            <span>${selectedReader.price}.00</span>
          </div>
          <div className="flex justify-between mb-2 opacity-50 text-sm">
            <span>Service Fee</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between pt-4 border-top border-white/10 font-bold text-xl">
            <span>Total</span>
            <span>${selectedReader.price + 5}.00</span>
          </div>
        </div>

        <div className="payment-form space-y-4">
          <div className="input-group">
            <label>Card Information</label>
            <div className="mock-input">
              <CreditCard size={18} className="opacity-50" />
              <span>•••• •••• •••• 4242</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label>Expiry</label>
              <div className="mock-input">MM / YY</div>
            </div>
            <div className="input-group">
              <label>CVC</label>
              <div className="mock-input">•••</div>
            </div>
          </div>
          <button className="pay-btn" onClick={() => setView('success')}>Pay Now</button>
          <button className="cancel-btn" onClick={() => setView('detail')}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="success-screen">
      <div className="success-circle">
        <CheckCircle size={80} className="text-green-400" />
      </div>
      <h2 className="text-4xl font-serif mb-4 text-center">Booking Confirmed!</h2>
      <p className="text-xl opacity-60 text-center max-w-md mb-10">
        You have successfully booked a session with {selectedReader.name}. 
        A confirmation email with the meeting link has been sent to your inbox.
      </p>
      <button className="home-btn" onClick={() => setView('browse')}>Return to Marketplace</button>
    </div>
  );

  return (
    <div className="public-platform-wrapper">
      <nav className="public-nav">
        <div className="nav-logo">
          <Globe size={24} className="text-blue-400" />
          <span>Mystery Tarot Marketplace</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setIsAdmin(!isAdmin)} className="text-[10px] opacity-30 hover:opacity-100">
            {isAdmin ? 'Admin Mode: ON' : 'Admin Mode: OFF'}
          </button>
        </div>
      </nav>

      <main className="public-main">
        {view === 'browse' && renderBrowse()}
        {view === 'detail' && renderDetail()}
        {view === 'payment' && renderPayment()}
        {view === 'success' && renderSuccess()}
      </main>

      <footer className="public-footer">
        <p>© 2026 Mystery Tarot School. All Readers are Luna-Certified.</p>
      </footer>
    </div>
  );
};

export default PublicPlatform;
