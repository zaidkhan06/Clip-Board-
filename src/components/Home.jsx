import React, { useState } from "react";
import { Search } from "lucide-react"; // optional icon (npm i lucide-react)
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTopastes, updateToPastes } from "../redux/clipboardSlice";
import toast from "react-hot-toast/headless";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function handleCancel(){
    setTitle('');
    setValue('');
    toast.success("Cancel");
  }

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || 
      Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      dispatch(updateToPastes(paste));

    } else {
      dispatch(addTopastes(paste));

    }

    setTitle('');
    setValue('');
    setSearchParams({});
    

  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 overflow-y-hidden">
      <div className="w-full max-w-md">
        <label className="block text-[#6674CC] text-lg mb-3 mt-16  font-semibold">
          Enter Title
        </label>

        <div className="relative">
          {/* Icon inside input */}
          <span className="absolute inset-y-0 left-4 flex items-center text-[#6674CC] z-1">
            <Search size={20} />
          </span>

          {/* Glassy Input */}
          <input
            type="text"
            required
            placeholder="Type something..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl 
                       bg-white/10 backdrop-blur-md
                       text-white placeholder-blue-200
                       border border-blue-500/30 
                       focus:border-[#6674CC] focus:ring-2 focus:ring-[#6674CC]
                       outline-none transition duration-300 shadow-[0_4px_20px_rgba(0,0,255,0.3)]"
          />
        </div>

        {/* Buttons Row (responsive) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
          onClick={createPaste}
            className="flex-1 py-3 rounded-2xl font-semibold 
                       bg-[#6674CC] text-white 
                       shadow-lg hover:bg-[#5560b5] 
                       active:scale-95 transition-all duration-300 text-sm sm:text-base"
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          <button
          onClick={handleCancel}
            className="flex-1 py-3 rounded-2xl font-semibold 
                       bg-white/10 backdrop-blur-md text-white
                       border border-blue-500/30 
                       shadow-lg hover:border-[#6674CC] hover:shadow-[0_0_15px_#6674CC]
                       active:scale-95 transition-all duration-300 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>

        {/* Glassy Textarea */}
        <div className="mt-6">
          <label className="block text-[#6674CC] text-lg mb-3 font-semibold">
            Enter Content
          </label>
          <textarea
            value={value}
            placeholder="Enter Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl resize-none
                       bg-white/10 backdrop-blur-md
                       text-white placeholder-blue-200
                       border border-blue-500/30 
                       focus:border-[#6674CC] focus:ring-2 focus:ring-[#6674CC]
                       outline-none transition duration-300 shadow-[0_4px_20px_rgba(0,0,255,0.3)] text-sm sm:text-base"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
