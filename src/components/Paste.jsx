import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/clipboardSlice";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ yaha se hook lena hai

const Paste = () => {
  const pastes = useSelector((state) => state.clipboard.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ hook call

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    
  }

  return (
    <div className="sm:max-w-4xl mx-auto w-[90%] pt-20 ">
      {/* Search bar */}
      <input
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2  rounded-lg border border-gray-400 focus:ring-2 focus:ring-[#6674CC] focus:outline-none mb-6"
      />

      {/* Paste list */}
      <AnimatePresence>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <motion.div
              key={paste?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 text-white p-4 rounded-xl mb-4 shadow-lg hover:shadow-[0_4px_20px_rgba(102,116,204,0.6)] transition"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-[#6674CC]">
                {paste.title}
              </h2>

              {/* Content */}
              <p className="text-gray-300 mt-2 max-h-40 overflow-y-auto break-words">
                {paste.content}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4 flex-wrap">
                <button className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-[#6674CC] transition">
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                  className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-[#6674CC] transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-3 py-1 bg-[#6674CC] rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="px-3 py-1 bg-[#6674CC] rounded-lg hover:bg-green-700 transition"
                >
                  Copy
                </button>
                <button className="px-3 py-1 bg-[#6674CC] rounded-lg hover:bg-blue-700 transition">
                  Share
                </button>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 mt-3">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found...</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Paste;
