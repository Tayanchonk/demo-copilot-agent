import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createProduct } from '../../store/productsSlice';
import type { CreateProductData } from '../../types';
import ProductForm from '../../components/forms/ProductForm';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.products);

  const handleSubmit = async (data: CreateProductData) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success('Product created successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add a new product to your inventory
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ProductForm
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Create Product"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;