// import './assets/styles/global.css';
import { RouterProvider } from 'react-router';
import { router, routerDev } from './routes/route';
import { devMode } from './dev/devConfig';

function App() {

  return (
      <div className="App">
        <RouterProvider router={devMode ? routerDev : router} />
      </div>
  );
}

export default App;
