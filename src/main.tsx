
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { NotificationProvider } from './components/Notifications/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </NotificationProvider>
);