import { Logo, LogoutBtn, Container } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ].filter((item) => item.active);

  return (
    <header className="py-4 shadow-md bg-gray-900">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo width="140px" />
          </Link>

          {/* Navigation Items */}
          <ul className="flex flex-wrap items-center gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="px-5 py-2 text-gray-300 bg-gray-800 rounded-md shadow-sm transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-500/50"
                >
                  {item.name}
                </button>
              </li>
            ))}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="px-5 py-2 text-gray-300 bg-red-600 rounded-md shadow-sm transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none focus:ring focus:ring-red-500/50" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
