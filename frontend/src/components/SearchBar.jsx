import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchProduct = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      navigate(`/search`);
    } else {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <div className="border-b border-b-white/35 text-white flex justify-center items-center">
      <input
        type="text"
        placeholder="Search Products..."
        className="outline-0 px-3 py-1 w-64 lg:w-90 text-white"
        value={query}
        onChange={handleSearchProduct}
      />
      <div className="px-2">
        <Search size={18} className="text-white" />
      </div>
    </div>
  );
};

export default SearchBar;
