import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "About Us", to: "/about" },
  { label: "Menu", to: "/menu" },
  { label: "Contact", to: "/contact" },
];

export default function Layout() {
  return (
    <div className="restaurant-page">
      <header className="container header-wrap">
        <nav className="navbar" aria-label="Main navigation">
          <NavLink to="/" end className="brand" aria-label="AgroMill home">
            AgroMill
          </NavLink>

          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <NavLink to="/contact" className="nav-cta">
            Book a Table
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
