import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { SearchBar } from "./searchBar";
import { useState } from "react";
import Image from "next/image";
import filter from "@/public/images/Filter icon.png";
import moon from "@/public/images/Moon.png";
import bulb from "@/public/images/bulb.png";
import notification from "@/public/images/notification.png";
import profile from "@/public/images/profile.png";
import { useMenu } from "@/context/menuContext";

const Header = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { active } = useMenu();

  function handleSearch(q: string) {}
  return (
    <div className="flex items-center justify-between w-full pt-1">
      <p className="w-2/4 capitalize text-dark-gray text-[32px] font-medium font-instrument-sans">
        {active}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-background border border-agray-border rounded-3xl h-11 pl-2 pr-7">
          <Image src={bulb} alt="" className="w-7" />
          <Image src={moon} alt="" className="w-5" />
        </div>
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
        <div className="flex items-center gap-2 bg-white border border-agray-border rounded-3xl h-11 w-16 px-2 ">
          <Image src={notification} alt="" className="w-8" /> 
        </div>
        <div className="flex items-center gap-2 bg-white border border-agray-border rounded-3xl h-11 px-2.5">
          <Image src={profile} alt="" className="w-5" /> 
          <ChevronDown size={35}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
