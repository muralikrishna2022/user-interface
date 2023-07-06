import './App.css';
import Navbar from './Navbar';
import './styles/friends_font.css'
import { UserProvider } from './usercontext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
<Routes>
<Route path="/" element={<Navbar />}>
     </Route>
</Routes>
</BrowserRouter>
</UserProvider>
    </div>
  );
}

export default App;
