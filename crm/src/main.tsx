import { createRoot } from 'react-dom/client';
import './assets/style/global.less';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
