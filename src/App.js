import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/CartPage";
import AddProduct from "./pages/AddProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
function App() {
	return (
		<>
			<ToastContainer autoClose={1000}></ToastContainer>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProductsPage />} />
					<Route path="/add-product" element={<AddProduct />} />
					<Route path="/cart" element={<BasketPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
