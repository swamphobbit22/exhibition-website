import { Share2 } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

export default function ShareButton({title, url}) {
  // current url needs changing to source url
  // const currentUrl = window.location.href; 

  const shareUrl = url || window.location.href;
  

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || "MuseoNet Artwork",
        text: "Check out this artwork on MuseoNet Virtual Museum!",
        url: shareUrl,
      })
      .then(() => console.log("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  // Social Media Share Links
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-row items-center justify-between max-w-full">
      {/* Web Share / Copy Link */}
      <button aria-label="share this page" onClick={handleShare} className="px-3 py-3 sm:text-sm rounded-full  hover:bg-[var(--accent-secondary)]">
        <Share2 className="h-6 w-6 md:h-6 md:w-6 lg:h-6 lg:w-6  text-[var(--text-primary)]" />
      </button>

      {/* X (Twitter) */}
      <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--accent-secondary)]" aria-label="Share on X (Twitter)">
        <FaXTwitter className="h-6 w-6  md:h-8 md:w-8 lg:h-8 lg:w-8 text-[var(--text-primary)]"/>
      </a>

      {/* Facebook */}
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--accent-secondary)]" aria-label="Share on Facebook">
        <FaFacebook className="h-6 w-6  md:h-8 md:w-8 lg:h-8 lg:w-8  text-[var(--text-primary)]" />
      </a>

      {/* LinkedIn */}
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--accent-secondary)]" aria-label="Share on X (Twitter)">
        <FaLinkedin className="h-6 w-6  md:h-8 md:w-8 lg:h-8 lg:w-8 text-[var(--text-primary)]" />
      </a>
    </div>
  );
}
