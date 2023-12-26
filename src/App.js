import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './Components.js/List';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
   <div>


<BrowserRouter>
<Routes>
<Route path='/' element={<List/>}/>
</Routes>
<Toaster/>
</BrowserRouter>






   </div>
  );
}

export default App;
