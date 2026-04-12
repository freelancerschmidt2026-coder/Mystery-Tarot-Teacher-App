import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  Star, 
  Search, 
  Filter, 
  Heart, 
  MessageSquare, 
  Award, 
  BookOpen, 
  Sparkles, 
  Layout, 
  ArrowRight, 
  X,
  CreditCard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import './marketplace.css';

import { notePadActions } from '../state/NotePadState/notePadActions';

const Marketplace = ({ onNavigate = () => {} }) => {
  const [activeTab, setActiveTab] = useState('services'); // services, goods
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReader, setSelectedReader] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const readers = [
    {
      id: 'r1',
      name: 'Aurelius Night',
      title: 'High Priest of the Void',
      rank: 'Master Reader',
      rating: 5.0,
      reviews: 1240,
      photo: 'https://picsum.photos/seed/reader1/200/200',
      services: [
        { id: 's1', name: 'Deep Shadow Reading', price: 150, description: 'A 60-minute exploration of your hidden subconscious patterns.' },
        { id: 's2', name: 'Ritual Blueprinting', price: 200, description: 'Custom ceremonial design for specific life transitions.' }
      ],
      specialty: 'Shadow Work & Rituals'
    },
    {
      id: 'r2',
      name: 'Luna Selene',
      title: 'Celestial GateKeeper',
      rank: 'Certified Guide',
      rating: 4.9,
      reviews: 856,
      photo: 'https://picsum.photos/seed/reader2/200/200',
      services: [
        { id: 's3', name: 'Dream Mirror Analysis', price: 120, description: 'Decoding the symbolic language of your recent visions.' },
        { id: 's4', name: 'Monthly Intuition Check', price: 80, description: 'A 3-card spread to align your energy for the month ahead.' }
      ],
      specialty: 'Dreamwork & Intuition'
    },
    {
      id: 'r3',
      name: 'Cassian Thorne',
      title: 'Alchemist of Swords',
      rank: 'Senior Practitioner',
      rating: 4.8,
      reviews: 642,
      photo: 'https://picsum.photos/seed/reader3/200/200',
      services: [
        { id: 's5', name: 'Conflict Resolution Spread', price: 100, description: 'Strategic tarot for navigating complex interpersonal dynamics.' }
      ],
      specialty: 'Mental Clarity & Strategy'
    }
  ];

  const digitalGoods = [
    { id: 'g1', name: 'The Obsidian Spread Pack', category: 'Spreads', price: 45, rating: 4.9, image: 'https://picsum.photos/seed/good1/400/300', description: '5 advanced spreads for deep shadow work and emotional excavation.' },
    { id: 'g2', name: 'Celestial Deck Design Kit', category: 'Design', price: 85, rating: 5.0, image: 'https://picsum.photos/seed/good2/400/300', description: 'High-resolution assets and templates for designing your own celestial tarot deck.' },
    { id: 'g3', name: 'Ritual Script: New Moon', category: 'Scripts', price: 25, rating: 4.7, image: 'https://picsum.photos/seed/good3/400/300', description: 'A fully scripted 45-minute ritual for setting intentions and manifesting growth.' },
    { id: 'g4', name: 'Digital Tarot Art: The Star', category: 'Art', price: 60, rating: 4.8, image: 'https://picsum.photos/seed/good4/400/300', description: 'Limited edition digital painting of The Star archetype, optimized for sanctuary displays.' }
  ];

  const handleAddToCart = (item, type) => {
    setCart([...cart, { ...item, type }]);
    alert(`${item.name} added to your marketplace cart.`);
  };

  const handlePurchase = () => {
    notePadActions.saveNote({
      title: `Marketplace Purchase: ${cart.map(i => i.name).join(', ')}`,
      content: `### Marketplace Purchase Receipt\n\n**Items:**\n${cart.map(i => `- ${i.name} (${i.price} MC)`).join('\n')}\n\n**Total:** ${cart.reduce((sum, i) => sum + i.price, 0)} Mystery Credits`,
      category: 'Marketplace Purchases'
    });
    setCart([]);
    setIsCartOpen(false);
    alert('Purchase confirmed. Check your NotePad for receipts and access instructions.');
  };

  return (
    <div className="mystery-marketplace">
      <div className="marketplace-atmosphere">
        <div className="market-glow"></div>
      </div>

      <div className="marketplace-container">
        <header className="marketplace-header">
          <div className="header-info">
            <h1>Mystery Marketplace</h1>
            <p>Exchange wisdom, art, and sacred services within the collective.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search readers or goods..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
          </div>
        </header>

        <nav className="marketplace-tabs">
          <button 
            className={activeTab === 'services' ? 'active' : ''} 
            onClick={() => setActiveTab('services')}
          >
            <User size={18} /> Reader Services
          </button>
          <button 
            className={activeTab === 'goods' ? 'active' : ''} 
            onClick={() => setActiveTab('goods')}
          >
            <Sparkles size={18} /> Digital Goods
          </button>
        </nav>

        <main className="marketplace-content">
          <AnimatePresence mode="wait">
            {activeTab === 'services' ? (
              <motion.div 
                key="services"
                className="readers-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {readers.map(reader => (
                  <div key={reader.id} className="reader-card">
                    <div className="reader-header">
                      <div className="reader-photo">
                        <img src={reader.photo} alt={reader.name} referrerPolicy="no-referrer" />
                        <div className="rank-badge"><Award size={12} /> {reader.rank}</div>
                      </div>
                      <div className="reader-meta">
                        <h3>{reader.name}</h3>
                        <span className="reader-title">{reader.title}</span>
                        <div className="reader-rating">
                          <Star size={14} fill="#fbbf24" color="#fbbf24" />
                          <span>{reader.rating} ({reader.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="reader-specialty">
                      <span className="label">Specialty:</span>
                      <span className="value">{reader.specialty}</span>
                    </div>
                    <div className="reader-services-list">
                      {reader.services.map(service => (
                        <div key={service.id} className="service-item">
                          <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">{service.price} MC</span>
                          </div>
                          <button className="book-btn" onClick={() => handleAddToCart(service, 'service')}>
                            Book Now
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="view-storefront-btn" onClick={() => setSelectedReader(reader)}>
                      View Storefront <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="goods"
                className="goods-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {digitalGoods.map(good => (
                  <div key={good.id} className="good-card">
                    <div className="good-image" onClick={() => setSelectedProduct(good)}>
                      <img src={good.image} alt={good.name} referrerPolicy="no-referrer" />
                      <div className="category-tag">{good.category}</div>
                    </div>
                    <div className="good-info">
                      <div className="info-header">
                        <h3>{good.name}</h3>
                        <div className="good-rating">
                          <Star size={12} fill="#fbbf24" color="#fbbf24" />
                          <span>{good.rating}</span>
                        </div>
                      </div>
                      <p className="good-desc">{good.description}</p>
                      <div className="good-footer">
                        <span className="good-price">{good.price} Mystery Credits</span>
                        <button className="add-cart-btn" onClick={() => handleAddToCart(good, 'good')}>
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Reader Storefront Modal */}
      <AnimatePresence>
        {selectedReader && (
          <div className="modal-overlay" onClick={() => setSelectedReader(null)}>
            <motion.div 
              className="storefront-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedReader(null)}><X size={24} /></button>
              <div className="storefront-content">
                <div className="storefront-sidebar">
                  <img src={selectedReader.photo} alt={selectedReader.name} className="large-photo" referrerPolicy="no-referrer" />
                  <div className="sidebar-stats">
                    <div className="stat">
                      <Award size={18} />
                      <span>{selectedReader.rank}</span>
                    </div>
                    <div className="stat">
                      <MessageSquare size={18} />
                      <span>{selectedReader.reviews} Reviews</span>
                    </div>
                    <div className="stat">
                      <Heart size={18} />
                      <span>Favorite Reader</span>
                    </div>
                  </div>
                </div>
                <div className="storefront-main">
                  <span className="title-tag">{selectedReader.title}</span>
                  <h2>{selectedReader.name}</h2>
                  <p className="bio">A certified GateKeeper with over a decade of experience in shadow work and ritual alchemy. Luna-verified for deep subconscious exploration.</p>
                  
                  <div className="services-section">
                    <h3>Offered Services</h3>
                    <div className="services-detailed">
                      {selectedReader.services.map(s => (
                        <div key={s.id} className="detailed-service">
                          <div className="s-header">
                            <h4>{s.name}</h4>
                            <span className="s-price">{s.price} MC</span>
                          </div>
                          <p>{s.description}</p>
                          <button className="book-large-btn" onClick={() => handleAddToCart(s, 'service')}>
                            Book This Service
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <motion.div 
              className="product-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedProduct(null)}><X size={24} /></button>
              <div className="product-modal-content">
                <div className="p-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} referrerPolicy="no-referrer" />
                </div>
                <div className="p-info">
                  <span className="p-category">{selectedProduct.category}</span>
                  <h2>{selectedProduct.name}</h2>
                  <div className="p-rating">
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span>{selectedProduct.rating} (Verified Purchase)</span>
                  </div>
                  <p className="p-desc">{selectedProduct.description}</p>
                  <div className="p-requirements">
                    <h4>Requirements:</h4>
                    <ul>
                      <li><CheckCircle2 size={14} /> Design Studio Access</li>
                      <li><CheckCircle2 size={14} /> Level 2 Certification</li>
                    </ul>
                  </div>
                  <div className="p-footer">
                    <span className="p-price">{selectedProduct.price} Mystery Credits</span>
                    <button className="p-add-btn" onClick={() => handleAddToCart(selectedProduct, 'good')}>
                      Add to Cart <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
            <motion.div 
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cart-header">
                <h2>Marketplace Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="cart-items">
                {cart.length > 0 ? cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="item-icon">
                      {item.type === 'service' ? <User size={20} /> : <Sparkles size={20} />}
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <span>{item.price} MC</span>
                    </div>
                    <button className="remove-item" onClick={() => setCart(cart.filter((_, i) => i !== idx))}>
                      <X size={14} />
                    </button>
                  </div>
                )) : (
                  <div className="empty-cart">
                    <ShoppingBag size={48} />
                    <p>Your marketplace cart is empty.</p>
                  </div>
                )}
              </div>

              <div className="cart-footer">
                <div className="total-row">
                  <span>Total</span>
                  <span>{cart.reduce((sum, i) => sum + i.price, 0)} Mystery Credits</span>
                </div>
                <button 
                  className="confirm-purchase-btn" 
                  disabled={cart.length === 0}
                  onClick={handlePurchase}
                >
                  <CreditCard size={18} /> Confirm & Pay
                </button>
                <p className="disclaimer">Digital goods are delivered instantly. Services require reader confirmation.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
