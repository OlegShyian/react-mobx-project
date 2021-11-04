import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavPageTitle from './components/NavPageTitle';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavPageTitle />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;