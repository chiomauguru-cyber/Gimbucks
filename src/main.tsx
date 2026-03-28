import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Main.tsx: Root element not found!');
  document.body.innerHTML = '<h1 style="color: red;">ROOT NOT FOUND</h1>';
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  // console.log('Main.tsx: Render called.');
}
