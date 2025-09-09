import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from the JSON file
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  return (
    <div>
      <header>
        <div className="header-content">
          <div className="header-text">
            <h1>Minha Loja</h1>
            <p className="subtitle">Estilo e conforto para o seu dia a dia</p>
          </div>
          <div className="header-logo">
            <img src="assets/logo.jpg" alt="Logo da Loja" />
          </div>
        </div>
      </header>

      <main>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.name} className="product-item">
                <a href={product.link}>
                  <img src={product.image} alt={product.name} />
                </a>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </main>

      <footer>
        <p>© 2025 Lojinha - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;