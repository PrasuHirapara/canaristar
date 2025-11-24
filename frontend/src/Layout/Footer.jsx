import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        {/* Left Side - Logo or Name */}
        <div className="mb-4 md:mb-0">
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            © {year} canaristar. All rights reserved.
          </span>
        </div>

        {/* Middle - Navigation */}
        <div className="flex space-x-6">
          <Link to="/shop">
            <div className="flex flex-col items-center">Shop</div>
          </Link>

          <Link to="/about-us">
            <div className="flex flex-col items-center">About Us</div>
          </Link>

          <Link to="/cart">
            <div className="flex flex-col items-center">Cart</div>
          </Link>

          <Link to="/orders">
            <div className="flex flex-col items-center">Orders</div>
          </Link>

          <Link to="/contact-us">
            <div className="flex flex-col items-center">
              <p>Contact Us</p>
            </div>
          </Link>
        </div>

        {/* Right Side - Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/canaristar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/github.png" alt="GitHub" className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-5 h-5"
            />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=canaristar@gmail.com&su=Contact&body=Hello%20..."
            target="_blank"
            className="hover:text-blue-500 cursor-pointer"
          >
            <img src="/images/gmail.png" alt="Email" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
