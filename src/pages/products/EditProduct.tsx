import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductById, updateProduct, clearSelectedProduct } from '../../store/productsSlice';
import type { CreateProductData } from '../../types';
import ProductForm from '../../components/forms/ProductForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (data: CreateProductData) => {
    if (!selectedProduct) return;

    try {
      await dispatch(updateProduct({ id: selectedProduct.id, ...data })).unwrap();
      toast.success('Product updated successfully');
      navigate(`/products/${selectedProduct.id}`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  if (loading && !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">Product not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The product you're trying to edit doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const initialData = {
    name: selectedProduct.name,
    description: selectedProduct.description,
    price: selectedProduct.price,
    category: selectedProduct.category,
    inStock: selectedProduct.inStock,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update product information for "{selectedProduct.name}"
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Update Product"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;