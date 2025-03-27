'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts, deleteProduct } from '../lib/api';
import { Product } from '../types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      
      // Select first 3 products for featured section
      setFeaturedProducts(fetchedProducts.slice(0, 3));
    };
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
      setProducts(products.filter(product => product.identificador !== id));
    }
  };

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr>
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Descripción</th>
            <th className="border p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.identificador}>
              <td className="border p-2">{product.nombre_producto}</td>
              <td className="border p-2">{product.descripcion_producto}</td>
              <td className="border p-2 space-x-2">
                <Link 
                  href={`/product/${product.identificador}`} 
                  className="btn-view text-blue-600 hover:underline"
                >
                  Ver
                </Link>
                <Link 
                  href={`/edit/${product.identificador}`} 
                  className="btn-edit text-green-600 hover:underline"
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(product.identificador)} 
                  className="btn-delete text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-4">Productos Destacados</h3>
      <div className="grid grid-cols-3 gap-4">
        {featuredProducts.map(product => (
          <div 
            key={product.identificador} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {(product.imagen_producto || product.imagen_url) ? (
              <img 
                src={product.imagen_producto || product.imagen_url} 
                alt={product.nombre_producto} 
                className='product-image max-w-full h-48 object-cover mb-4 rounded'
              />
            ) : (
              <div className="bg-gray-100 h-48 mb-4 rounded flex items-center justify-center text-gray-500">
                Imagen no subida
              </div>
            )}
            <h4 className="font-bold text-lg mb-2">{product.nombre_producto}</h4>
            <p className="text-gray-600 mb-2 flex-grow">{product.descripcion_producto}</p>
            <Link 
              href={`/product/${product.identificador}`} 
              className="text-blue-600 hover:underline self-start"
            >
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}