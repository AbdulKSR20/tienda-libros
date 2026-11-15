import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'


async function iniciarAplicacion(){
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js');
    await worker.start({onUnhandledRequest: 'bypass'});
  }

  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

}



iniciarAplicacion().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
});
