import { RouterProvider } from 'react-router-dom';
import router from './router';
import useLoaderStore from './store/useLoaderStore';
import Loader from './components/ui/Loader/Loader';

function App() {
  const loading = useLoaderStore((state) => state.loading);
  return (
    <div className='App'>
      {loading ? <Loader /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
