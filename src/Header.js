import React from "react";
import "./custom.css";
function Header() {
	return (
		<div className="header dflex sticky">
			<div>
				<a className="navlogo" href="/">
					<img
						src="https://stockarea.io/blogs/wp-content/uploads/2021/11/flipkart-logo-39906.png"
						width="147"
						alt="logo"
					/>
				</a>
			</div>
			<div className="headdiv1">
				<div>
					<a href="/">Home</a>
				</div>
				<div>
					<a href="/">Products</a>
				</div>
				<div className="headdiv2">
					<div>
						<a href="/cart">
							<img
								src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
								alt=""
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
