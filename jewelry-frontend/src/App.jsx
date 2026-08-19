import "./App.css"
import { useEffect, useState } from "react"

const API_URL = "https://jewelry-backend-project.onrender.com/api/products/"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const isInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id)
  }

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id)

      if (exists) {
        return current.filter((item) => item.id !== product.id)
      }

      return [...current, product]
    })
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">LUXORA</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </div>

        <button
          className="cart"
          onClick={() => setShowWishlist(true)}
          title="Wishlist"
        >
          {wishlist.length > 0 ? `♥ ${wishlist.length}` : "♡"}
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">TIMELESS ELEGANCE</p>

          <h1>
            Jewellery That
            <br />
            Tells Your Story
          </h1>

          <p className="hero-text">
            Discover beautifully crafted jewellery designed
            <br />
            to make every moment unforgettable.
          </p>

          <a href="#products" className="shop-button">
            Shop Collection
          </a>
        </div>

        <div className="hero-jewel">
          ✦
        </div>
      </section>

      <section className="categories" id="categories">
        <p className="section-label">EXPLORE</p>
        <h2>Our Collections</h2>

        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">💍</div>
            <h3>Rings</h3>
            <p>Elegant designs for every occasion</p>
          </div>

          <div className="category-card">
            <div className="category-icon">✨</div>
            <h3>Earrings</h3>
            <p>Beautiful pieces that complete your look</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📿</div>
            <h3>Necklaces</h3>
            <p>Timeless pieces with modern elegance</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⌚</div>
            <h3>Bracelets</h3>
            <p>Delicate jewellery for every style</p>
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <p className="section-label">OUR COLLECTION</p>
        <h2>Featured Jewellery</h2>

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="loading">No products available.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                    />
                  ) : (
                    <span>✦</span>
                  )}
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category_name}
                  </p>

                  <h3>{product.name}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-bottom">
                    <strong>₹{product.price}</strong>

                    <div className="product-actions">
                      <button
                        className={`wishlist-button ${
                          isInWishlist(product) ? "active" : ""
                        }`}
                        onClick={() => toggleWishlist(product)}
                        title="Add to wishlist"
                      >
                        {isInWishlist(product) ? "♥" : "♡"}
                      </button>

                      <button
                        onClick={() => setSelectedProduct(product)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="about" id="about">
        <div>
          <p className="section-label">ABOUT LUXORA</p>

          <h2>Made to shine with you.</h2>

          <p>
            We bring together timeless designs and modern elegance to
            create jewellery that becomes part of your most special moments.
          </p>
        </div>
      </section>

      <footer>
        <div className="logo">LUXORA</div>
        <p>© 2026 Luxora Jewellery. All rights reserved.</p>
      </footer>

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className="modal-image">
              {selectedProduct.image_url ? (
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                />
              ) : (
                <span>✦</span>
              )}
            </div>

            <div className="modal-content">
              <p className="product-category">
                {selectedProduct.category_name}
              </p>

              <h2>{selectedProduct.name}</h2>

              <p>{selectedProduct.description}</p>

              <strong>₹{selectedProduct.price}</strong>

              <button
                className="modal-wishlist"
                onClick={() => toggleWishlist(selectedProduct)}
              >
                {isInWishlist(selectedProduct)
                  ? "♥ Remove from Wishlist"
                  : "♡ Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showWishlist && (
        <div
          className="modal-overlay"
          onClick={() => setShowWishlist(false)}
        >
          <div
            className="wishlist-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowWishlist(false)}
            >
              ×
            </button>

            <h2>My Wishlist</h2>

            {wishlist.length === 0 ? (
              <div className="empty-wishlist">
                <div>♡</div>
                <h3>Your wishlist is empty</h3>
                <p>Add your favourite jewellery to your wishlist.</p>
              </div>
            ) : (
              <div className="wishlist-list">
                {wishlist.map((product) => (
                  <div
                    className="wishlist-item"
                    key={product.id}
                  >
                    <div className="wishlist-image">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                        />
                      ) : (
                        <span>✦</span>
                      )}
                    </div>

                    <div className="wishlist-details">
                      <p className="product-category">
                        {product.category_name}
                      </p>

                      <h3>{product.name}</h3>

                      <strong>₹{product.price}</strong>

                      <div className="wishlist-actions">
                        <button
                          onClick={() => {
                            setSelectedProduct(product)
                            setShowWishlist(false)
                          }}
                        >
                          View
                        </button>

                        <button
                          onClick={() => toggleWishlist(product)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App