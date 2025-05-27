import { AtSign, Copy, Sparkles } from "lucide-react";
import { useState } from "react";

interface WalletAIBioProps {
  address: string;
  personaTitle: string;
  bio: string;
  handle: string;
}

const WalletAIBio = ({ address, personaTitle, handle, bio }: WalletAIBioProps) => {
  const [copied, setCopied] = useState(false);
  const copyHandle = () => {
    navigator.clipboard.writeText(handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <div className="card p-6 mt-8">
      <div className="flex items-center gap-2 mb-2 text-primary-200 text-lg font-semibold">
        <Sparkles className="h-5 w-5 text-primary-400" />
        AI-generated Social Handle
      </div>
      <div className="flex items-center gap-2 mb-2">
        <AtSign className="h-5 w-5 text-accent-400" />
        <span className="font-mono text-xl">{handle}</span>
        <button
          className="ml-1 text-gray-400 hover:text-primary-400 transition"
          title="Copy handle"
          onClick={copyHandle}
        >
          <Copy className="h-4 w-4" />
        </button>
        {copied && <span className="ml-2 text-green-400 text-xs">Copied!</span>}
      </div>
      <div className="ml-1 text-secondary-200">{bio}</div>
    </div>
  );
};

export default WalletAIBio;