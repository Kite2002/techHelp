import { Link } from "react-router-dom";

const Navbar = () => {
  return ( 
    <nav className="navbar">
      <h1>techHelp</h1>
      <div className="links">
        <Link to="/">Posts</Link>
        <Link to="/create">Create Posts</Link>
      </div>
    </nav>
   );
}
 
export default Navbar;