// src/app/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductById, updateProduct } from '../../../lib/api';
import ProductForm from '../../components/ProductForm';
import { Product, ProductFormData } from '../../../types/product';

interface ProductEditProps {
  params: {
    id: string;
  };
}

export default function ProductEdit({ params }: ProductEditProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductById(params.id);
      setProduct(fetchedProduct);
    };
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (formData: ProductFormData) => {
    setLoading(true);
    setError('');

    try {
      await updateProduct(params.id, formData);
      router.push('/');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <ProductForm 
        initialData={{
          nombre_producto: product.nombre_producto,
          descripcion_producto: product.descripcion_producto,
          imagen_url: product.imagen_url || product.imagen_producto
        }}
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
}