import { CircleUser, Handbag, Menu, Phone, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Header = () => {
  return (
    <>
      <div className="fixed z-10 top-0 text-gray-100 w-full">
        <div className="hidden md:flex justify-between items-center p-1 bg-amber-950/90 sticky top-0 z-50 backdrop-blur-xs">
          <Link to="/">
            <img src="images/logo.jpg" className="rounded-full h-12" />
          </Link>
          <Link to="/search">
            <SearchBar />
          </Link>

          <div className="flex gap-10">
            <Link to="/menu">
              <div className="flex flex-col items-center">
                <Menu size={20} />
                <p className="text-sm">Menu</p>
              </div>
            </Link>

            <Link to="/cart">
              <div className="flex flex-col items-center">
                <ShoppingCart size={20} />
                <p className="text-sm">Cart</p>
              </div>
            </Link>

            <Link to="/orders">
              <div className="flex flex-col items-center">
                <Handbag size={20} />
                <p className="text-sm">Orders</p>
              </div>
            </Link>

            <Link to="/contact">
              <div className="flex flex-col items-center">
                <Phone size={20} />
                <p className="text-sm">Contact</p>
              </div>
            </Link>

            <Link to="/profile">
              <div className="flex flex-col items-center">
                <CircleUser size={20} />
                <p className="text-sm">Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="fixed z-10 text-gray-100 md:hidden top-0 w-full">
          <div className="px-4 flex justify-between items-center p-1 bg-amber-950/80 sticky top-0 z-50 backdrop-blur-xs">
            <Link to="/">
              <img src="images/logo.jpg" className="rounded-full h-14" />
            </Link>
            <Link to="/search">
              <SearchBar />
            </Link>
          </div>
        </div>

        <div className="fixed z-10 text-gray-100 md:hidden bottom-0 w-full">
          <div className="px-2 text-xs flex justify-evenly items-center p-1 bg-amber-950/80 sticky top-0 z-50 backdrop-blur-xs">
            <Link to="/contact">
              <div className="flex flex-col items-center">
                <Phone size={20} />
                <p>Contact Us</p>
              </div>
            </Link>

            <Link to="/cart">
              <div className="flex flex-col items-center">
                <ShoppingCart size={20} />
                <p>Cart</p>
              </div>
            </Link>

            <Link to="/orders">
              <div className="flex flex-col items-center">
                <Handbag size={20} />
                <p>Orders</p>
              </div>
            </Link>

            <Link to="/menu">
              <div className="flex flex-col items-center">
                <Menu size={20} />
                <p>Menu</p>
              </div>
            </Link>

            <Link to="/profile">
              <div className="flex flex-col items-center">
                <CircleUser size={20} />
                <p>Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
