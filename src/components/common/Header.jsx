import { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { MdOutlineWbSunny } from 'react-icons/md';
import { IoMoonOutline } from 'react-icons/io5';
import { DataContext } from '../contexts/DataContext';

function Header() {
  const { isDark, handleDark } = useContext(DataContext);
  const { user, logOut, userLoading } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const menu = (
    <ul className="flex flex-col lg:flex-row gap-3 font-bold lg:gap-8">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/all-artifacts">All artifacts</NavLink>
      <NavLink to="/add-artifacts">Add artifacts</NavLink>
      <div
        className="w-fit relative"
        onMouseEnter={() => setIsHovered(true)} // when mouse enters, set isHovered to true
        onMouseLeave={() => setIsHovered(false)} // when mouse leaves, set isHovered to false
      >
        <p className="cursor-pointer">My Profile</p>
        <ul
          className={`lg:absolute w-[145px] ml-1 ${
            isHovered ? 'lg:flex' : 'lg:hidden'
          } flex-col p-2 gap-4 backdrop-blur-xl `}
        >
          <NavLink
            className="w-fit block mb-2 lg:mb-0"
            to="/my-loved-artifacts"
          >
            My Loved Profile
          </NavLink>

          <NavLink className="w-fit" to="/my-added-artifacts">
            My Added artifacts
          </NavLink>
        </ul>
      </div>
    </ul>
  );

  return (
    <div className={`w-full h-[10vh] flex justify-center items-center`}>
      <div
        className={`navbar z-40 fixed mid h-[10vh] backdrop-blur-xl ${
          isDark ? 'bg-black/30' : 'bg-white/30'
        } `}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm ${
                !isDark ? 'bg-[#FAF7F7]' : 'bg-[#181717]'
              } dropdown-content mid p-4 rounded-box z-[1] mt-6 w-52 shadow`}
            >
              {menu}
            </ul>
          </div>
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/medieval-knight-shield-3d-icon-download-in-png-blend-fbx-gltf-file-formats--armor-weapon-pack-sports-games-icons-9555744.png?f=webp"
              alt="logo"
              className="w-10"
            />{' '}
            <span className="text-xl ml-2 font-bold font-mono">Auvral</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center justify-between">
            {!user ? (
              <div
                className={`${
                  userLoading && 'invisible'
                } navbar-end space-x-3 flex ml-2`}
              >
                <div className="flex justify-center items-center">
                  <p
                    className={`hover:cursor-pointer ${
                      isDark ? 'rotate-90' : 'rotate-0'
                    } transition-transform duration-300 ease-in-out`}
                    onClick={() => handleDark()}
                  >
                    {isDark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
                  </p>
                </div>
                <Link to="/login" className="btn mid btn-success">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden btn btn-outline btn-success"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div
                className={`${
                  userLoading && 'invisible'
                } items-center space-x-3 flex ml-4 mr-2`}
              >
                <div>
                  <p
                    className={`hover:cursor-pointer ${
                      isDark ? 'rotate-90' : 'rotate-0'
                    } transition-transform duration-300 ease-in-out`}
                    onClick={() => handleDark()}
                  >
                    {isDark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
                  </p>
                </div>
                <div
                  onMouseEnter={() => setIsPhotoHovered(true)} // when mouse enters, set isHovered to true
                  onMouseLeave={() => setIsPhotoHovered(false)} // when mouse leaves, set isHovered to false
                  className="relative mx-3 px-3"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-[50px] h-[50px] rounded-xl"
                  />
                  <div
                    className={`absolute w-[300px] rounded-md ${
                      !isDark ? 'bg-[#FAF7F7]' : 'bg-[#181717]'
                    } right-0 space-y-2 -ml-[60px] p-2 ${
                      isPhotoHovered ? 'flex-col' : 'hidden'
                    }`}
                  >
                    <p className="mx-2 font-semibold text-md lg:text-xl flex">
                      {user.displayName}
                    </p>
                    <p
                      onClick={logOut}
                      className={`self-center btn ${
                        isDark ? 'mid' : 'bg-white text-black hover:bg-gray-200'
                      }`}
                    >
                      LogOut
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
