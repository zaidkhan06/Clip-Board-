import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

function ViewPaste() {
  const { id } = useParams();
  const pastes = useSelector((state) => state.clipboard.pastes);
  const paste = pastes.find((p) => String(p._id) === id);

  const [copied, setCopied] = useState(false);

  if (!paste) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <h1 className="text-2xl font-bold text-red-500">❌ Paste not found</h1>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg hover:shadow-[0_4px_20px_rgba(102,116,204,0.6)] transition">
        {/* Title */}
        <h1 className="text-2xl font-bold text-[#6674CC] mb-2">
          {paste.title}
        </h1>

        {/* Created At */}
        <p className="text-sm text-gray-400 mb-4">
          Created on: {new Date(paste.createdAt).toLocaleString()}
        </p>

        {/* Content */}
        <div className="relative">
          <pre className="whitespace-pre-wrap bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            {paste.content}
          </pre>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-1 right-2 flex items-center gap-2 px-2  cursor-pointer text-white text-sm rounded-lg shadow-md transition"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;
