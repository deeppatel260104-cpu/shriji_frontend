import { useState } from 'react';
import { Menu, X,LayoutTemplate, Bookmark, Image, Video, LogOut, LayoutDashboard, Package, CircleHelp } from 'lucide-react';
import Logo from "../../assets/Logo/shriji_logo_black.png"
import { Link, Outlet, useLocation, useNavigate,  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const DashboardConfig = () => {

  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login', { replace: true });
  };

  const adminMenus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Hero Section", path: "/admin/hero-section", icon: LayoutTemplate },
    { name: "Category", path: "/admin/category", icon: Bookmark },
    { name: "Images", path: "/admin/image", icon: Image },
    { name: "Video", path: "/admin/video", icon: Video },
    { name: "Packages", path: "/admin/packages", icon: Package },
    { name: "Package Add-ons", path: "/admin/package-addons", icon: Package },
    { name: "Package FAQs", path: "/admin/package-faqs", icon: CircleHelp },
  ];

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <div
        className={`${isOpen ? "w-64" : "w-20"} flex flex-col transition-all duration-300`}
        style={{ backgroundColor: '#f7f3ee', borderRight: '1px solid #2c2420' }}
      >
        <div
          className="p-6 flex items-center justify-between"
          style={{ borderBottom: '1px solid #2c2420' }}
        >
          <div className={`flex items-center gap-2 ${isOpen ? "" : "hidden"}`}>
            <img src={Logo} />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#2c2420' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8e2da'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {adminMenus.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center ${isOpen ? "gap-3" : "justify-center"} px-4 py-3 rounded-lg transition-colors`}
                    style={{
                      backgroundColor: isActive ? '#2c2420' : 'transparent',
                      color: isActive ? '#f7f3ee' : '#2c2420',
                    }}
                    title={!isOpen ? item.name : ""}
                  >
                    <Icon className="w-5 h-5" />
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid #2c2420' }}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isOpen ? "gap-3" : "justify-center"} px-4 py-3 rounded-lg transition-colors`}
            style={{ color: '#0d0b08' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8e2da'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1" style={{ backgroundColor: '#f7f3ee' }}>
        <div className="space-y-6 overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardConfig;
