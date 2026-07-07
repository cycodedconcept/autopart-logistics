import { SlidersHorizontal } from "lucide-react";
import { SearchBar } from "./searchBar";
import { useState } from "react";
import Image from "next/image";
import filter from "@/public/images/Filter icon.png";
import { useMenu } from "@/context/menuContext";

const Header = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const {active} = useMenu()

  function handleSearch(q: string) {}
  return (
    <div className="flex items-center w-full">
        <p className="w-2/4 capitalize text-dark-gray text-[32px] font-medium">{active}</p>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={loading}
        onSubmit={handleSearch}
        trailing={
          <button
            type="button"
            className="ml-1 flex items-center gap-1 text-xs  border-l border-alight-gray-border pl-2"
          >
            <Image src={filter} alt="" className="w-5" />
          </button>
        }
      />
    </div>
  );
};

export default Header;
