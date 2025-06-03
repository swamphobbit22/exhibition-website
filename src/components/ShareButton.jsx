import { Share2 } from "lucide-react";
// import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

export default function ShareButton(title) {
  // current url needs changing to source url
  const currentUrl = window.location.href; 

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: "Check out this artwork!",
        imageUrl: currentUrl,
      })
      .then(() => console.log("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  // Social Media Share Links
  // const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
  // const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  // const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex space-x-4">
      {/* Web Share / Copy Link */}
      <button onClick={handleCopyLink} className="p-1 sm:text-sm rounded-full  hover:bg-[var(--accent-hover)]">
        <Share2 className="h-5 w-5 md:h-6 md:w-6 lg:h-6 lg:w-6  text-[var(--text-primary)]" />
      </button>

      {/* X (Twitter) */}
      {/* <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-300">
        <FaXTwitter className="h-5 w-5 md:h-8 md:w-8 lg:h-8 lg:w-8 text-orange-600"/>
      </a> */}

      {/* Facebook */}
      {/* <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-300">
        <FaFacebook className="h-5 w-5 md:h-8 md:w-8 lg:h-8 lg:w-8  text-orange-600" />
      </a> */}

      {/* LinkedIn */}
      {/* <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-300">
        <FaLinkedin className="h-5 w-5 md:h-8 md:w-8 lg:h-8 lg:w-8 text-orange-600 " />
      </a> */}
    </div>
  );
}
