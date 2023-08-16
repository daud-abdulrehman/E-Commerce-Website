import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AuthRoutes from './routes/Auth';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Seller from './Component/Seller';
import { Counter } from './features/counter/Counter';
import ProductPage from './Component/ProductPage/ProductPage';
 

function App() {
  const user = null
  //debugger

  return (
   <div className="App">
     <Router>{user ? <ProtectedRoutes /> : <AuthRoutes />}</Router>
     {/* <Seller/> */}
     {/* <Counter/>
     {/* <ProductPage/> */}
   </div>
  );
}

export default App;

// import React from "react";
// import Seller from "./Component/Seller";
// function App() {
//   // Your Seller component logic here
  
//   return (
//     <div>
//       {/* Your Seller component UI */}
//       {/* Use the GetOrders component here */}
//       <Seller/>
//       {/* Add other components or content as needed */}
//     </div>
//   );
// }

// export default App;
