import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cart.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const CartPage = () => {
	const [cart, setCart] = useState([]);

	const getCart = async () => {
		const response = await axios.get("/api/basket");
		setCart(response?.data);
		console.log("response", response.data);
	};
	const removeItem = async (id) => {
		const response = await axios.delete(`/api/basket/${id}`);
		console.log("response", response);
		if (response.data.status === 200) {
			await getCart();
			toast.success(response.data.message);
		}
	};
	useEffect(() => {
		getCart();
	}, []);

	return (
		<div>
			<h1>Cart</h1>

			<div className="cart_container">
				<div className="product-list">
					<h1>Cart</h1>
					{cart?.data?.map((item, index) => (
						<div className="product" key={item?.cartItem._id}>
							<AiOutlineCloseCircle
								onClick={() => removeItem(item?.cartItem.productId._id)}
								className="removeButton"
							/>
							<div className="product-image">
								<img src={item?.cartItem.productId.imgUrl} />
							</div>
							<div className="product-information">
								<h4>{item?.cartItem.productId.name}</h4>
								<h5 className="specification">
									₹ {item?.cartItem.productId.price}
								</h5>
								<h5 className="specification">
									Quantity: {item?.cartItem.quantity}
								</h5>
							</div>
							<div className="product-information">
								<h5>Total: ₹ {item?.totalItemPrice}</h5>
								<h5>
									Discount: - ₹{" "}
									{item?.totalDiscountedAmount
										? item?.totalDiscountedAmount
										: "0"}
								</h5>
								<h5>
									Net: ₹{" "}
									{item?.totalDiscountedPrice
										? item?.totalDiscountedPrice
										: item?.totalItemPrice}
								</h5>
							</div>
						</div>
					))}
				</div>
				<div className="cart-summary">
					<h1>Cart Summary</h1>
					<div>
						<p>Total Price:</p>
						<p className="total">{cart.totalPrice}</p>
					</div>
					<div>
						<p>Total Item Discount:</p>
						<p className="discount">
							-
							{cart.totalItemDiscountAmount
								? cart.totalItemDiscountAmount
								: "0"}
						</p>
					</div>
					<div>
						<p>Total Price After Item Discount:</p>
						<p>{cart.totalPriceAfterItemDiscount}</p>
					</div>
					<div>
						<p>Min Cart Discount:</p>
						<p className="discount">
							-{cart.totalDiscountedPrice ? cart.minCartValueDiscount : "0"}
						</p>
					</div>
					<div>
						<p>Final Amount To Pay:</p>
						<h3 className="final-amount">
							{cart.totalDiscountedPrice
								? cart.totalDiscountedPrice
								: cart.totalPriceAfterItemDiscount}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../cart.css";

// const CartPage = () => {
// 	const [cart, setCart] = useState([]);
// 	useEffect(() => {
// 		const getCart = async () => {
// 			const response = await axios.get("/api/basket");
// 			setCart(response?.data);
// 			console.log("response", response.data);
// 		};

// 		getCart();
// 	}, []);

// 	return (
// 		<div className="cart">
// 			<h1>Cart</h1>

// 			<table className="cart-table">
// 				<thead>
// 					<tr>
// 						<th>Product</th>
// 						<th>Quantity</th>
// 						<th>Price</th>
// 						<th>Total</th>
// 						<th>Discount</th>
// 						<th>Net</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{cart?.data?.map((item, index) => (
// 						<tr key={item?.cartItem._id}>
// 							<td>{item?.cartItem.productId.name}</td>
// 							<td>{item?.cartItem.quantity}</td>
// 							<td>{item?.cartItem.productId.price}</td>
// 							<td>{item?.totalItemPrice}</td>
// 							<td>
// 								{item?.totalDiscountedAmount
// 									? item?.totalDiscountedAmount
// 									: "na"}
// 							</td>
// 							<td>{item?.totalDiscountedPrice}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>

// 			<div className="cart-summary">
// 				<h2>Summary</h2>

// 				<table>
// 					<tbody>
// 						<tr>
// 							<td>Total Price:</td>
// 							{/* <td>{totalPrice}</td> */}
// 						</tr>
// 						<tr>
// 							<td>Total Discount:</td>
// 							{/* <td>{totalDiscount}</td> */}
// 						</tr>
// 						<tr>
// 							<td>Net Total:</td>
// 							{/* <td>{totalPrice - totalDiscount}</td> */}
// 						</tr>
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

// export default CartPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CartPage = () => {
// 	const [basket, setBasket] = useState([]);
// 	const [totalPrice, setTotalPrice] = useState(0);

// 	const getCartData = async () => {
// 		try {
// 			const response = await axios.get("/api/basket");
// 			setBasket(response.data);

// 			// Calculate the total price of the basket.
// 			const total = response.data.items.reduce(
// 				(total, item) => total + item.price * item.quantity,
// 				0
// 			);
// 			setTotalPrice(total);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		getCartData();
// 	}, []);
// 	console.log("basket", basket);

// 	const handleQuantityChange = (item, quantity) => {
// 		// Update the quantity of the item in the basket.
// 		const newBasket = basket.map((item) => {
// 			if (item.productId === item.productId) {
// 				item.quantity = quantity;
// 			}
// 			return item;
// 		});

// 		setBasket(newBasket);

// 		// Update the total price of the basket.
// 		const total = newBasket.items.reduce(
// 			(total, item) => total + item.price * item.quantity,
// 			0
// 		);
// 		setTotalPrice(total);

// 		// Update the basket on the backend.
// 		axios.put("/api/basket", {
// 			items: newBasket.items,
// 		});
// 	};

// 	return (
// 		<div>
// 			<h1>Cart</h1>
// 			<ul>
// 				{basket?.items?.map((item) => (
// 					<li key={item.productId}>
// 						{item.productName}
// 						<button
// 							onClick={() => handleQuantityChange(item, item.quantity - 1)}
// 						>
// 							-
// 						</button>
// 						{item.quantity}
// 						<button
// 							onClick={() => handleQuantityChange(item, item.quantity + 1)}
// 						>
// 							+
// 						</button>
// 					</li>
// 				))}
// 			</ul>

// 			<h3>Total Price: ₹{totalPrice}</h3>
// 		</div>
// 	);
// };

// export default CartPage;
