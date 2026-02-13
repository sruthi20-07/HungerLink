import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/surplus">Surplus</Link>
      <Link to="/notifications">Notifications</Link>
    </nav>
  );
}
