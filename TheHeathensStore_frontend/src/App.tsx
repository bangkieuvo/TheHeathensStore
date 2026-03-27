import { useState, useEffect } from 'react';
import './App.css';
//import Header from './components/Header/Header2_copy';

import CartPanel from './components/Header/components/CartPanel'
function App() {
  const [isCartOpen, setIsCartOpen] = useState(true);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { // 27 là mã phím Es
        setIsCartOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>
      <CartPanel isCartOpen = {isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  )
}

export default App
