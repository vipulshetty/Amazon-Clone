import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaBars, FaShoppingCart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../assets/logo.png";

import { auth, signInWithGooglePopup } from "../utils/firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { selectItems } from "../features/basket/basketSlice";
import { selectUser, setUser } from "../features/user/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(selectItems);
  const user = useSelector(selectUser);

  // On user sign in & out state changes
  useEffect(() => {
    let userInfo = {};
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userInfo = {
          accessToken: user.accessToken,
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        dispatch(setUser(userInfo));
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <header className="flex flex-col">
      {/* Top */}
      <div className="flex sm:items-center flex-col sm:flex-row py-2 px-4 sm:space-x-6 bg-amazonDarkBlue space-y-2 sm:space-y-0">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex py-1 sm:py-0">
            <Link to="/" className="sm:hidden">
              <FaBars className="mr-1 text-2xl text-white" />
            </Link>
            <Link to="/" className="hoverOutline">
              <img
                src={Logo}
                alt="Logo"
                className="sm:h-7 h-6 w-24 object-contain"
              />
            </Link>
          </div>
          <div className="flex sm:hidden items-center space-x-8">
            <button
              className="flex items-center text-white text-sm"
              onClick={!user ? signInWithGooglePopup : handleSignOut}
            >
              {user ? `Hello, ${user.displayName}` : "Sign In"}
            </button>
            <Link
              to="/checkout"
              className="flex items-end text-white hoverOutline relative"
            >
              <span className="absolute top-0 left-3 bg-yellow-500 text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {products.length}
              </span>
              <span className="text-xs font-medium">
                <FaShoppingCart className="text-2xl mr-1" />
              </span>
              <span className="font-bold">Cart</span>
            </Link>
          </div>
        </div>
        {/* Center */}
        <div className="flex flex-grow sm:mx-3 my-1 sm:my-0">
          {/* Searchbar */}
          <input
            type="text"
            className="flex-auto h-10 rounded-tl-md rounded-bl-md p-3"
          />
          <button className="bg-amazonOrange flex items-center rounded-tr-md rounded-br-md px-3">
            <FaSearch className="text-lg" />
          </button>
        </div>
        {/* Right */}
        <div className="sm:flex items-center space-x-4 hidden">
          {/* Sign In */}
          {user ? (
            <button
              className="flex flex-col text-white hoverOutline"
              onClick={handleSignOut}
            >
              <span className="text-xs font-medium">
                Hello, {user.displayName}
              </span>
              <span className="text-sm font-bold">Account & Lists</span>
            </button>
          ) : (
            <button
              className="flex flex-col text-white hoverOutline"
              onClick={signInWithGooglePopup}
            >
              <span className="text-xs font-medium">Hello, Sign in</span>
              <span className="text-sm font-bold">Account & Lists</span>
            </button>
          )}
          {/* Returns & Orders */}
          <Link to="/" className="flex flex-col text-white hoverOutline">
            <span className="text-xs font-medium">Returns</span>
            <span className="text-sm font-bold">&amp; Orders</span>
          </Link>
          {/* Cart */}
          <Link
            to="/checkout"
            className="flex items-end text-white hoverOutline relative"
          >
            <span className="absolute top-0 left-3 bg-yellow-500 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {products.length}
            </span>
            <span className="text-xs font-medium">
              <BsCart3 className="text-3xl" />
            </span>
            <span className="text-sm font-bold">Cart</span>
          </Link>
        </div>
      </div>
      {/* Bottom */}
      <ul className="bg-amazonLightBlue py-1 px-3 flex sm:space-x-3 text-white sm:text-sm overflow-x-auto">
        <li className="hoverOutline whitespace-nowrap hidden sm:block">
          <Link className="flex items-center" to="/">
            <FaBars className="mr-1 text-lg" /> All
          </Link>
        </li>
        <li className="hoverOutline whitespace-nowrap mr-3 sm:mr-0">
          <Link to="/">Today's Deals</Link>
        </li>
        <li className="hoverOutline whitespace-nowrap mr-3 sm:mr-0">
          <Link to="/">Customer Service</Link>
        </li>
        <li className="hoverOutline whitespace-nowrap mr-3 sm:mr-0">
          <Link to="/">Registry</Link>
        </li>
        <li className="hoverOutline whitespace-nowrap mr-3 sm:mr-0">
          <Link to="/">Gift Cards</Link>
        </li>
        <li className="hoverOutline whitespace-nowrap">
          <Link to="/">Sell</Link>
        </li>
      </ul>
    </header>
  );
}
