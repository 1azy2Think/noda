import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import { ThemeProvider, useThemeMode } from './components/context/ThemeContext';
import './i18n';
import './assets/styles/global.css'

// A small wrapper to inject algorithm into ConfigProvider
function ThemedApp() {
  const { algorithm } = useThemeMode();
  
  return (
    <ConfigProvider 
      theme={{ 
        algorithm,
        // Only add custom tokens if you specifically need to override defaults
        // token: {
        //   colorPrimary: '#1677ff', // This is already Ant Design's default
        // }
      }}
    >
      <App />
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>
);