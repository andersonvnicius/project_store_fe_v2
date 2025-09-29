import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Use the environment variable for the API base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch products from the API on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((response) => {
        console.log(response); // Log the full response object
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          // Set the product list from the "data" key in the API response
          setProducts(data.data);
        } else {
          throw new Error("Unexpected API response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch products. Try again later.");
      });
  }, [API_BASE_URL]);

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
          {error ? (
            <p className="error-message">{error}</p>
          ) : products.length > 0 ? (
            products
              .filter((product) => !product.is_deleted) // Exclude deleted products
              .map((product) => (
                <div key={product.item_id} className="product-item">
                  <a href={product.link}  rel="noopener noreferrer">
                    <img
                      src={product.image}
                      alt={product.description.replace(/<br>/g, " ")} // Strip HTML
                    />
                  </a>
                  <h2>{product.description.replace(/<br>/g, " ")}</h2>
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