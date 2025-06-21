import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductById, deleteProduct, clearSelectedProduct } from '../../store/productsSlice';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { formatPrice, formatDateTime } from '../../utils/formatters';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await dispatch(deleteProduct(selectedProduct.id)).unwrap();
      toast.success('Product deleted successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error as string);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Product not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-6">
          <Link to="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/products" className="hover:text-gray-700">
              Products
            </Link>
          </li>
          <li>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="text-gray-900 font-medium">{selectedProduct.name}</li>
        </ol>
      </nav>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Product details and information
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedProduct.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {selectedProduct.description}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(selectedProduct.price)}
                </span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {selectedProduct.category}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDateTime(selectedProduct.createdAt)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDateTime(selectedProduct.updatedAt)}
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
          <Link to={`/products/${selectedProduct.id}/edit`}>
            <Button variant="secondary">Edit Product</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProductDetail;