// src/app/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, uploadImage } from '../../lib/api';
import ProductForm from '../components/ProductForm';
import { ProductFormData } from '../../types/product';

export default function ProductCreate() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (formData: ProductFormData, file?: File) => {
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.nombre_producto.trim()) {
        throw new Error('El nombre del producto es requerido');
      }

      // Upload image if file exists
      let imageUrl = formData.imagen_url;
      if (file) {
        imageUrl = await uploadImage(file);
        if (!imageUrl) return;
      }

      // Create product
      await createProduct({
        ...formData,
        imagen_url: imageUrl
      });

      router.push('/');
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <ProductForm 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
}