// import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorBundary } from './components/ErrorBundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBundary>
);
