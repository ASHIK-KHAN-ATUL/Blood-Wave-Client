import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useDonor from "../../Hooks/useDonor";
import useMember from "../../Hooks/useMember";
import { CgMenuGridR } from "react-icons/cg";

const DashboardLay = () => {
  const [isAdmin] = useAdmin();
  const [isDonor] = useDonor();
  const [isMember] = useMember();

  return (
    <div className="drawer bg-[#fff1f1] relative">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex">
        {/* Page content here */}
        <div className="fixed top-1 left-1 z-20 border-2 rounded-md border-red-500">
          <label
            htmlFor="my-drawer"
            className="btn p-2 drawer-button bg-gradient-to-l from-red-100 to-rose-200 border-none"
          >
            <img
              className=" h-7 sm:h-10"
              src="https://i.ibb.co.com/wZWjWsKG/logo-blood-wave.png"
              alt="logo"
            />
          </label>
        </div>
        <div className="w-full py-20">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gradient-to-br to-rose-200 from-red-300  min-h-full w-80 p-4 ">
          {/* Sidebar content here */}

          {isMember && (
            <div className="flex flex-col gap-5 mt-10 text-base font-semibold ">
              <NavLink
                to={"/dashboard/profile"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to={"/dashboard/becomeDonor"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Becamoe Donor
              </NavLink>

              <NavLink
                to={"/dashboard/my-blood-request"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                My Request
              </NavLink>

              <NavLink
                to={"/dashboard/bloodRecive/member"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Blood Recive
              </NavLink>
            </div>
          )}

          {isDonor && (
            <div className="flex flex-col gap-5 mt-10 text-base font-semibold ">
              <NavLink
                to={"/dashboard/profile"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to={"/dashboard/blood-request"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Blood Request
              </NavLink>

              <NavLink
                to={"/dashboard/blood-request-status"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Request Status
              </NavLink>

              <NavLink
                to={"/dashboard/mytask"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                My Task
              </NavLink>

              <NavLink
                to={"/dashboard/task/completed"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                My Completed Task
              </NavLink>
            </div>
          )}
          {isAdmin && (
            <div className="flex flex-col gap-5 mt-10 text-base font-semibold ">
              <NavLink
                to={"/dashboard/profile"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to={"/dashboard/overView/admin"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                OverView
              </NavLink>
              <NavLink
                to={"/dashboard/alluser/admin"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                AllUser
              </NavLink>
              <NavLink
                to={"/dashboard/manegeDonor/admin"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                Manage Donor
              </NavLink>
              <NavLink
                to={"/dashboard/completedDonation/admin"}
                className={({ isActive }) =>
                  ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                    isActive
                      ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                      : ""
                  }`
                }
              >
                All Donation
              </NavLink>
            </div>
          )}

          <div className="flex flex-col gap-5 mt-20 text-base font-semibold ">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                  isActive
                    ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                    : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/donors"}
              className={({ isActive }) =>
                ` duration-300 cursor-pointer bg-gradient-to-l from-red-500/50 to-rose-500/80 p-2 rounded-lg ${
                  isActive
                    ? "font-bold text-black scale-x-90 border-b-2 border-red-600 "
                    : ""
                }`
              }
            >
              Find Donor
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLay;
