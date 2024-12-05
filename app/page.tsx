"use client";
import React, { useState } from "react";
import products from "./ProductData.json";
import Image from "next/image";
type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
};

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="text-center py-10 bg-custom-radial">
      <h2 className="text-2xl font-bold mb-6">Product Catalog</h2>

      {/* Search Bar */}
      <div className="mb-6 px-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a product..."
          className="w-full sm:w-1/2 p-2 border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} onClick={() => handleCardClick(product)}>
            <div className=" p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <Image
                width={320}
                height={320}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md text-left">
            <h3 className="text-xl text-black font-semibold mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-800">{selectedProduct.description}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCatalog;
