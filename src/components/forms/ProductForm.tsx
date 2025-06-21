import { useForm } from 'react-hook-form';
import type { CreateProductData } from '../../types';
import Button from '../ui/Button';
import SelectInput, { type Option } from '../ui/SelectInput';

interface ProductFormProps {
  initialData?: Partial<CreateProductData>;
  onSubmit: (data: CreateProductData) => void;
  loading?: boolean;
  submitText?: string;
}

const ProductForm = ({
  initialData,
  onSubmit,
  loading = false,
  submitText = 'Save Product',
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProductData>({
    defaultValues: initialData,
  });

  const categories = [
    'Electronics',
    'Home & Kitchen',
    'Sports',
    'Home & Office',
    'Books',
    'Clothing',
    'Health & Beauty',
    'Toys',
  ];

  const categoryOptions: Option[] = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Product name is required',
            minLength: {
              value: 2,
              message: 'Product name must be at least 2 characters',
            },
          })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.name ? 'border-red-300' : ''
          }`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.description ? 'border-red-300' : ''
          }`}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            {...register('price', {
              required: 'Price is required',
              min: {
                value: 0.01,
                message: 'Price must be greater than 0',
              },
              valueAsNumber: true,
            })}
            className={`block w-full pl-7 pr-12 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.price ? 'border-red-300' : ''
            }`}
            placeholder="0.00"
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <SelectInput
          name="category"
          control={control}
          options={categoryOptions}
          label="Category"
          placeholder="Select a category"
          required
          error={errors.category?.message}
        />
      </div>

      <div className="flex items-center">
        <input
          id="inStock"
          type="checkbox"
          {...register('inStock')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
          In Stock
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" variant="primary" loading={loading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;