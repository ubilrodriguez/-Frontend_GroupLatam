// src/app/components/ProductForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Product, ProductFormData } from '../../types/product';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (formData: ProductFormData, file?: File) => Promise<void>;
  loading?: boolean;
}

export default function ProductForm({ 
  initialData = {
    nombre_producto: '',
    descripcion_producto: '',
    imagen_url: ''
  }, 
  onSubmit, 
  loading = false 
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialData.imagen_url || '');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData, file || undefined);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label className="block mb-2">Nombre del Producto:</label>
        <input
          type="text"
          name="nombre_producto"
          value={formData.nombre_producto}
          onChange={handleInputChange}
          disabled={loading}
          required
          className="w-full p-2 border rounded"
        />
        {!formData.nombre_producto.trim() && (
          <small className="text-red-500">Este campo es requerido</small>
        )}
      </div>

      <div className="form-group">
        <label className="block mb-2">Descripción:</label>
        <textarea
          name="descripcion_producto"
          value={formData.descripcion_producto}
          onChange={handleInputChange}
          disabled={loading}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="form-group">
        <label className="block mb-2">Subir imagen:</label>
        <div className="image-upload-container">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*"
            disabled={loading}
            className="mb-2"
          />
          {preview && (
            <div className="image-preview mt-2">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-xs max-h-48 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        className='btn-save bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}