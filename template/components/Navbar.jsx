const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="container header-wrap">
      <nav className="navbar" aria-label="Main navigation">
        <div className="brand" aria-label="AgroMill brand">
          AgroMill
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link active">
              {item.label}
            </a>
          ))}
        </div>

        <a href="#booking" className="nav-cta">
          Book a Table
        </a>
      </nav>
    </header>
  );
}
