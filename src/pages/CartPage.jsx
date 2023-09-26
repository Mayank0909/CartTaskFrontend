import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cart.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const CartPage = () => {
	const [cart, setCart] = useState([]);
	const [couponsList, setCouponsList] = useState([]);

	const [coupons, setCoupons] = useState(false);
	const getCart = async (id) => {
		if (id) {
			const response = await axios.get(
				`http://localhost:8000/api/basket?couponId=${id}`
			);
			setCart(response?.data);
			toast.success("Coupon Applied");
		} else {
			const response = await axios.get("http://localhost:8000/api/basket");
			setCart(response?.data);
		}
	};
	const handleAddToBasket = async (id, quantity) => {
		// toast.success("Product added");
		try {
			await axios.post("http://localhost:8000/api/basket/add-item", {
				productId: id,
				quantity: quantity,
			});
			getCart();
			console.log("product added");
		} catch (error) {
			console.log(error);
		}
	};
	const getDiscount = async () => {
		const response = await axios.get("http://localhost:8000/api/discount");
		setCouponsList(response?.data);
	};
	const removeItem = async (id) => {
		const response = await axios.delete(
			`http://localhost:8000/api/basket/${id}`
		);
		if (response.data.status === 200) {
			await getCart();
			toast.success(response.data.message);
		}
	};
	useEffect(() => {
		getCart();
		getDiscount();
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
								onClick={() => removeItem(item?.cartItem?.productId?._id)}
								className="removeButton"
							/>
							<div className="product-image">
								<img src={item?.cartItem?.productId?.imgUrl} />
							</div>
							<div className="product-information">
								<h4>{item?.cartItem?.productId?.name}</h4>
								<h5 className="specification">
									₹ {item?.cartItem?.productId?.price}
								</h5>
								<div className="changeQuantityBox">
									{/* Quantity: {item?.cartItem?.quantity} */}
									<button
										className="applybutton"
										onClick={() =>
											handleAddToBasket(item?.cartItem?.productId, +1)
										}
									>
										+
									</button>
									<span>{item?.cartItem?.quantity}</span>
									<button
										className="applybutton"
										onClick={() =>
											handleAddToBasket(item?.cartItem?.productId, -1)
										}
									>
										-
									</button>
								</div>
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
					<div className="couponListItem">
						<div>Coupons</div>
						<div>
							<button
								className="applybutton"
								onClick={() => setCoupons(!coupons)}
							>
								{!coupons ? "Show" : "Hide"}
							</button>{" "}
						</div>
					</div>
					{coupons && (
						<span className="couponList couponListBox">
							{couponsList.map((coupons, index) => {
								return (
									<div key={coupons._id} className="couponListItem">
										<span className="couponList">
											<span className="couponName">Coupon {index + 1}</span>
											<span className="coupontext">
												Coupon's minimum cart value : {coupons?.minCartValue}
											</span>
											<span className="notapplicable">
												{cart.totalPrice <= coupons?.minCartValue
													? "Not Applicable"
													: ""}
											</span>
										</span>
										<button
											className="applybutton"
											onClick={() => getCart(coupons?._id)}
											disabled={cart.totalPrice <= coupons?.minCartValue}
										>
											Apply
										</button>
									</div>
								);
							})}
						</span>
					)}
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
