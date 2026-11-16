import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "./searchBar";
import { useState } from "react";
import filter from "@/public/images/Filter icon.png";
import notification from "@/public/images/notification.png";
import profile from "@/public/images/profile.png";
import smallIcon from "@/public/images/smallmenu.png";
import { useMenu } from "@/context/menuContext";

const SmallHeader = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const {showSidebar, setShowSidebar} = useMenu()


  function handleSearch(q: string) {}
  return (
    <div className="relative flex lg:hidden items-center justify-between w-full py-3 lg:pb-0 border-b border-agray-border p-4 2xl:px-8">
      <Image src={smallIcon} alt="" className="w-10" onClick={() => setShowSidebar(!showSidebar)} />
      <div className="flex items-center gap-4">
        <div className=" flex items-center bg-white border border-agray-border rounded-3xl h-11 w-11 px-2 justify-center ">
          <Search size={20} onClick={() => setShowSearch(!showSearch)} />
        </div>
        <div className="flex items-center gap-2 bg-white border border-agray-border rounded-3xl h-11 w-11 justify-center px-2 ">
          <Image src={notification} alt="" className="w-8" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-agray-border rounded-3xl h-11 px-2.5">
          <Image src={profile} alt="" className="w-6" />
          <ChevronDown size={20} />
        </div>
      </div>
      {showSearch && (
        <div className="w-full h-full absolute -bottom-17 left-0 bg-agray/50">
          <div className="w-4/5 m-auto">
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
        </div>
      )}
    </div>
  );
};

export default SmallHeader;
