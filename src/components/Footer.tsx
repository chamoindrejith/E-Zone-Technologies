import logo from "@/assets/logo.jpeg";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/ezoneanuradhapura" },
  { name: "Instagram", url: "https://www.instagram.com/ezonetech.lk?igsh=MW9zcmdzcWNnemRtaQ==" },
  { name: "LinkedIn", url: null },
  {name: "TikTok", url: "https://www.tiktok.com/@ezone_technology?_r=1&_t=ZS-94SMvyoQ2vX"}
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-glow">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="E Zone Technologies" className="h-8 w-auto rounded" />
            <span className="text-sm font-semibold text-foreground">
              E Zone Technologies <span className="text-muted-foreground">(Pvt) Ltd</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} E Zone Technologies (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link) =>
              link.url ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-not-allowed opacity-50"
                >
                  {link.name}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
