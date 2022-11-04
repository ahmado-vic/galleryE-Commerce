import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Home/NavBar';
import Cart from './Components/Pages/Cart';
import Home from './Components/Pages/Home';
import { GalleryContext } from './GallryContext';

function App() {
  const { countCartItems } = useContext(GalleryContext);
  console.log(countCartItems);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
