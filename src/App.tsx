import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';
import NotFound from './pages/NotFound';

function App() {
  // Use appropriate basename based on deployment environment
  const basename = import.meta.env.NETLIFY ? '/' : '/demo-copilot-agent';
  
  return (
    <Provider store={store}>
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#059669',
              },
            },
            error: {
              style: {
                background: '#DC2626',
              },
            },
          }}
        />
      </Router>
    </Provider>
  );
}

export default App;
