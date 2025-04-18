import './App.css'
import AppRoutes from './AppRoutes';
import Preloader from './components/Preloader';

function App() {
    return (
      <>
      <Preloader />
      <AppRoutes/>
      </>
    );
}

export default App
