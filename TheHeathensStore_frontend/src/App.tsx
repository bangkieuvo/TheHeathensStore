import './App.css';
import Header from "./components/Header/Header.tsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./components/Index/Index.tsx";




function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <main className="App">
                    <Routes>
                        <Route path="/index" element={<Index/>}  />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    )
}

export default App
