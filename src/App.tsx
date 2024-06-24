import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { AuthGoogleProvider } from './context/AuthGoogleContext';

function App() {
  return (
    <>
      <AuthGoogleProvider>
        <RouterProvider router={ router }/>
      </AuthGoogleProvider>
    </>
  )
}

export default App
