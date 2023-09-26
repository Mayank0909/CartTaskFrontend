import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../custom.css";
import { toast } from "react-toastify";

const Products = () => {
	const [products, setProducts] = useState([]);

	const handleAddToBasket = async (id) => {
		toast.success("Product added");

		try {
			await axios.post("http://localhost:8000/api/basket/add-item", {
				productId: id,
				quantity: 1,
			});
			console.log("product added");
		} catch (error) {
			console.log(error);
		}
	};
	const prod = async () => {
		try {
			const productsResponse = await axios.get(
				"http://localhost:8000/api/products"
			);

			console.log(productsResponse, "productsResponse");

			setProducts(productsResponse?.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		prod();
	}, []);

	return (
		<div>
			<h1>Products</h1>
			{/* <Link to="/add-product">Add Product</Link>
			<Link to="/cart">Go to cart</Link> */}

			<div className="container">
				<div className="productList">
					{products.map((product) => (
						<div className="card" key={product?._id}>
							<div className="product">
								<div className="product-image">
									<img src={product.imgUrl} />
								</div>
								<div className="product-imformation">
									<h4>{product.name}</h4>
									<h6 className="specification">{product.description}</h6>
									<span>₹ {product.price}</span>
								</div>
							</div>
							<button
								className="addbutton"
								onClick={() => {
									handleAddToBasket(product?._id);
								}}
							>
								Add to cart
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Products;
