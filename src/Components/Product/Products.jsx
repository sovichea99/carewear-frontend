import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FadeLeft } from "../../ultility/animation";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer";
import { CartContext } from "../../Contexts/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md"; // Import the cart icon
import api from "../../Service/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);
        const normalizedProducts = productsRes.data.data.map((product) => ({
          ...product,
          id: product.id,
          category_id: product.category_id,
          variants: (product.variants || []).map((variant) => ({
            size: variant.size,
            stock: Number(variant.stock) || 0,
          })),
          stock: product.stock,
        }));
        // Normalize categories to ensure consistent _id
        const normalizedCategories = categoriesRes.data.map((category) => ({
          ...category,
          _id: category._id || category.id,
          uses_sizes:
            category.uses_sizes !== undefined ? category.uses_sizes : true, // Default to true for backward compatibility
        }));
        // Ensure products is always an array
        setProducts(normalizedProducts);
        setCategories(normalizedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category_id === selectedCategory);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      <div className="container pt-1 pb-2">
        <h1 className="text-center text-2xl font-bold mb-6 pt-28">
          Our Products
        </h1>

        {/* Category Menu */}
        <div className="flex justify-center lg:space-x-16 space-x-2 text-sm mb-10">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`text-lg font-semibold py-1 px-3 ${
                selectedCategory === category._id
                  ? "text-pink-600"
                  : "text-gray-700"
              } hover:text-pink-600 hover:shadow-[0_3px_0_-1px_#ec4899]`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-8 md:gap-10 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                variants={FadeLeft(product.delay)}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.08 }}
                key={product._id}
                className="relative bg-white w-[220px] rounded-3xl px-4 py-4 shadow-[0_0_22px_0_rgba(0,0,0,0.15)] flex flex-col items-center"
              >
                <Link to={`/products/${product.id || product._id}`}>
                  <motion.div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[80px] h-[80px] object-cover -translate-y-6 scale-150 mb-4"
                    />

                    <div className="text-center">
                      <h1 className="text-lg font-semibold">{product.name}</h1>
                      <p className="text-lg font-semibold text-pink-400">
                        {product.price}$
                      </p>
                    </div>
                  </motion.div>
                </Link>

                {/* Small Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() => addToCart(product)}
                  className="absolute bottom-3 right-3 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-700"
                >
                  <MdOutlineShoppingCart size={20} />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found!</p>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Products;
