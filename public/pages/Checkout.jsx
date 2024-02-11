import { useSelector } from "react-redux";

import Banner from "../assets/banner2.png";
import CheckoutItem from "../components/CheckoutItem";
import { selectItems, selectTotal } from "../features/basket/basketSlice";
import { selectUser } from "../features/user/userSlice";
import { signInWithGooglePopup } from "../utils/firebase.config";

export default function Checkout() {
  const checkoutProducts = useSelector(selectItems);
  const user = useSelector(selectUser);

  const total = useSelector(selectTotal);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* <PaymentElement /> */}
      {/* Left */}
      <div className="lg:basis-4/5 basis-full">
        <img src={Banner} alt="Banner" className="w-full mb-5 h-[250px]" />
        <div className="bg-white p-4">
          <h2 className="text-4xl">Shopping Basket</h2>
          <hr className="my-4" />
          <div className="space-y-16 p-4">
            {checkoutProducts.map((product) => (
              <CheckoutItem key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="lg:basis-1/5 lg:ml-4 mt-5 lg:mt-0 bg-white p-4 h-fit">
        <p className="mb-4 text-lg">
          Subtotal ({checkoutProducts.length > 0 ? checkoutProducts.length : 0}{" "}
          items): <strong>${total}</strong>
        </p>
        <button
          onClick={user ? null : signInWithGooglePopup}
          className="btn w-full"
        >
          {user ? "Proceed to checkout" : "Sign in to checkout"}
        </button>
      </div>
    </div>
  );
}
