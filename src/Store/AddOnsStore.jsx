import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Star, 
  Search, 
  Filter, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  Layers, 
  Palette, 
  Type, 
  Layout, 
  History
} from 'lucide-react';
import './addOnsStore.css';

import { notePadActions } from '../state/NotePadState/notePadActions';

const AddOnsStore = ({ onNavigate = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Upgrades', icon: <ShoppingBag size={14} /> },
    { id: 'templates', name: 'Deck Templates', icon: <Layers size={14} /> },
    { id: 'palettes', name: 'Color Palettes', icon: <Palette size={14} /> },
    { id: 'fonts', name: 'Font Packs', icon: <Type size={14} /> },
    { id: 'rituals', name: 'Ritual Add-Ons', icon: <Sparkles size={14} /> },
    { id: 'themes', name: 'Sanctuary Themes', icon: <Layout size={14} /> }
  ];

  const products = [
    { id: 1, name: 'Golden Dawn Template', category: 'templates', price: 450, rating: 4.9, image: 'https://picsum.photos/seed/tarot1/400/500', description: 'A classic esoteric template inspired by the Golden Dawn tradition.' },
    { id: 2, name: 'Neon Void Palette', category: 'palettes', price: 120, rating: 4.7, image: 'https://picsum.photos/seed/tarot2/400/500', description: 'Vibrant, electric colors for a modern, futuristic deck design.' },
    { id: 3, name: 'Ancient Serif Pack', category: 'fonts', price: 85, rating: 4.8, image: 'https://picsum.photos/seed/tarot3/400/500', description: 'A collection of hand-lettered fonts from the 15th century.' },
    { id: 4, name: 'Full Moon Ritual Pack', category: 'rituals', price: 250, rating: 5.0, image: 'https://picsum.photos/seed/tarot4/400/500', description: 'Advanced ceremonial scripts and animations for lunar rituals.' },
    { id: 5, name: 'Obsidian Sanctuary', category: 'themes', price: 600, rating: 4.9, image: 'https://picsum.photos/seed/tarot5/400/500', description: 'A deep, dark theme for your Sanctuary with floating obsidian shards.' },
    { id: 6, name: 'Cybernetic Arcana', category: 'templates', price: 500, rating: 4.6, image: 'https://picsum.photos/seed/tarot6/400/500', description: 'High-tech, sci-fi inspired tarot templates with animated circuits.' }
  ];

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handlePurchase = () => {
    notePadActions.saveNote({
      title: `Store Receipt: ${cart.map(p => p.name).join(', ')}`,
      content: `### Store Receipt\n\n**Items:**\n${cart.map(p => `- ${p.name} (${p.price} MC)`).join('\n')}\n\n**Total:** ${cart.reduce((sum, p) => sum + p.price, 0)} Mystery Credits`,
      category: 'Store Receipts'
    });

    notePadActions.saveNote({
      title: `Purchased Add-Ons: ${cart.map(p => p.name).join(', ')}`,
      content: `### New Add-Ons Unlocked\n\n${cart.map(p => `- **${p.name}**: ${p.description}`).join('\n')}`,
      category: 'Purchased Add-Ons'
    });

    setCart([]);
    setIsCheckoutOpen(false);
    alert('Purchase complete! Your upgrades are now available in the Design Studio.');
  };

  return (
    <div className="addons-store">
      <div className="store-atmosphere">
        <div className="store-nebula"></div>
      </div>

      <div className="store-container">
        <header className="store-header">
          <div className="header-info">
            <h1>BackPocket Mystery Store</h1>
            <p>Premium upgrades for your sacred creative journey.</p>
          </div>
          <div className="store-actions">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search upgrades..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="cart-btn" onClick={() => setIsCheckoutOpen(true)}>
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </header>

        <nav className="store-categories">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>

        <main className="product-grid">
          {filteredProducts.map(product => (
            <motion.div 
              key={product.id} 
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
            >
              <div className="product-image" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} referrerPolicy="no-referrer" />
                <div className="image-overlay">
                  <button className="quick-view">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <div className="info-top">
                  <span className="category-tag">{product.category}</span>
                  <div className="rating">
                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <h3>{product.name}</h3>
                <div className="info-bottom">
                  <span className="price">{product.price} <span className="currency">MC</span></span>
                  <button className="add-btn" onClick={() => handleAddToCart(product)}>
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </main>
      </div>

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
              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} referrerPolicy="no-referrer" />
                </div>
                <div className="modal-info">
                  <span className="category-tag">{selectedProduct.category}</span>
                  <h2>{selectedProduct.name}</h2>
                  <div className="rating-row">
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span>{selectedProduct.rating} (124 reviews)</span>
                  </div>
                  <p className="description">{selectedProduct.description}</p>
                  <div className="features">
                    <div className="feature"><CheckCircle2 size={16} /> Instant Activation</div>
                    <div className="feature"><CheckCircle2 size={16} /> Design Studio Compatible</div>
                    <div className="feature"><CheckCircle2 size={16} /> Lifetime Updates</div>
                  </div>
                  <div className="modal-footer">
                    <span className="price">{selectedProduct.price} Mystery Credits</span>
                    <button className="buy-now-btn" onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
            <motion.div 
              className="checkout-modal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="checkout-header">
                <h2>Your Cart</h2>
                <button onClick={() => setIsCheckoutOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="cart-items">
                {cart.length > 0 ? cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                    <div className="item-info">
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
                    <p>Your cart is empty.</p>
                  </div>
                )}
              </div>

              <div className="checkout-footer">
                <div className="total-row">
                  <span>Total</span>
                  <span>{cart.reduce((sum, p) => sum + p.price, 0)} Mystery Credits</span>
                </div>
                <button 
                  className="purchase-btn" 
                  disabled={cart.length === 0}
                  onClick={handlePurchase}
                >
                  <CreditCard size={18} /> Complete Purchase
                </button>
                <p className="footer-note">Purchases are non-refundable digital upgrades.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddOnsStore;
