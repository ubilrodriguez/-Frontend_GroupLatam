// src/lib/api.ts
import axios from 'axios';
import { Product, ProductFormData } from '../types/product';

const API_URL = 'http://localhost:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  try {
    const response = await axios.post(`${API_URL}/productos`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: ProductFormData): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}/productos/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/productos/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};