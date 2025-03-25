
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get root element and render app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
