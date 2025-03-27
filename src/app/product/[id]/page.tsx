// src/app/product/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchProductById } from '../../../lib/api';
import { Product } from '../../../types/product';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };
    loadProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">Detalle del Producto</h2>
      <div className='product-detail'>
        {(product.imagen_producto || product.imagen_url) && (
          <img 
            src={product.imagen_producto || product.imagen_url} 
            alt={product.nombre_producto} 
            className='product-image max-w-xs mb-4 rounded'
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{product.nombre_producto}</h3>
        <p className="mb-4">{product.descripcion_producto}</p>
        <div className='meta-info text-gray-600 mb-4'>
          {product.fecha_creacion && (
            <p>Creado: {new Date(product.fecha_creacion).toLocaleDateString()}</p>
          )}
          {product.fecha_actualizacion && (
            <p>Última actualización: {new Date(product.fecha_actualizacion).toLocaleDateString()}</p>
          )}
        </div>
        <Link 
          href="/" 
          className='btn-back bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
