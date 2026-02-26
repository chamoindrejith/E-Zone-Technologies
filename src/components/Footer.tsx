import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-glow">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="E-Zone Technologies" className="h-8 w-auto rounded" />
            <span className="text-sm font-semibold text-foreground">
              E-Zone Technologies <span className="text-muted-foreground">(Pvt) Ltd</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} E-Zone Technologies (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
