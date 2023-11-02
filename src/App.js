import './styles/App.css';
import Wrapper from "./Components/Wrapper";
import Navbar from './Components/Navbar';
import MyRoutes from './Components/MyRoutes';
import { CartProvider } from './Components/CardContext';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Wrapper>
        <CartProvider>
          <MyRoutes />
        </CartProvider>
      </Wrapper>
    </div>
  );
}

export default App;
