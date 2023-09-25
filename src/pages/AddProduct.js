import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../custom.css";

const AddProduct = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [discount, setDiscount] = useState(0);
	const [minQuantity, setMinQuantity] = useState(1);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!name || !price || !description || !minQuantity) {
			toast.error("Please fill in all required fields.");
			return;
		}

		// Send the product data to the backend.
		try {
			await axios.post("/api/products/add", {
				name,
				price,
				description,
				discount,
				minQuantity,
			});

			navigate("/");

			toast.success("Product successfully added!");
			setName("");
			setPrice(0);
			setDescription("");
			setDiscount(0);
			setMinQuantity(1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="add-product-form">
			<h1>Add Product</h1>

			<label htmlFor="name">Name</label>
			<input
				type="text"
				id="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label htmlFor="price">Price</label>
			<input
				type="number"
				id="price"
				placeholder="Price"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>

			<label htmlFor="description">Description</label>
			<input
				type="text"
				id="description"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<label htmlFor="discount">Discount</label>
			<input
				type="number"
				id="discount"
				placeholder="Discount"
				value={discount}
				onChange={(e) => setDiscount(e.target.value)}
			/>

			<label htmlFor="minQuantity">Minimum Quantity</label>
			<input
				type="number"
				id="minQuantity"
				placeholder="Minimum Quantity"
				value={minQuantity}
				onChange={(e) => setMinQuantity(e.target.value)}
			/>

			<button type="submit" onClick={handleSubmit}>
				Add Product
			</button>
		</div>
	);
};

export default AddProduct;
