import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api';
import './Sidebar.css';
import { LogOut } from 'lucide-react';
import { navItems } from '../navItems';

interface Props {
  user: { first_name: string; last_name: string; profile_image_url?: string } | null;
}

const Sidebar = ({ user }: Props) => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  }

  const fullName = user ? `${user.first_name} ${user.last_name}` : 'User';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/assets/img/Logo (1).png" alt="" />
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.profile_image_url ? (
            <img src={user.profile_image_url} alt={fullName} />
          ) : (
            <div>{user?.first_name?.[0]?.toUpperCase() || 'U'}</div>
          )}
        </div>
        <p className="user-name">{fullName}</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
        <LogOut size={18} />
      </button>
    </aside>
  );
};

export default Sidebar;