// src/types/product.ts
export interface Product {
    identificador: string;
    nombre_producto: string;
    descripcion_producto: string;
    imagen_producto?: string;
    imagen_url?: string;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
  }
  
  export interface ProductFormData {
    nombre_producto: string;
    descripcion_producto: string;
    imagen_url?: string;
  }