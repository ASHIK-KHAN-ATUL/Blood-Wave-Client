import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from '../Layout/HomeLayout/HomeLayout';
import Home from '../Pages/Home/Home';
import Register from '../Shared/Register/Register';
import Login from '../Shared/Login/Login';
import BecomeDonor from '../Pages/BecomeDonor/BecomeDonor';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import FindDonor from '../Pages/FindDonor/FindDonor';
import PrivetRoute from './PrivetRoute';
import ProfilePage from '../Pages/DashboardPages/ProfilePage/ProfilePage';
import EditProfile from '../Pages/DashboardPages/EditProfile/EditProfile';
import AllUser from '../Pages/DashboardPages/AdminDashPages/AllUser/AllUser';
import ManageDonor from '../Pages/DashboardPages/AdminDashPages/ManageDonor/ManageDonor';
import MyBloodRequest from '../Pages/DashboardPages/MemberDashPage/MyBloodRequest/MyBloodRequest';
import BloodRequest from '../Pages/DashboardPages/DonorDashPage/BloodRequest/BloodRequest';
import RequestStatus from '../Pages/DashboardPages/DonorDashPage/RequestStatus/RequestStatus';
import DashboardLay from '../Layout/DashboardLayout/DashboardLay';
import MyTask from '../Pages/DashboardPages/DonorDashPage/MyTask/MyTask';
import MyCompletedTask from '../Pages/DashboardPages/DonorDashPage/MyCompletedTask/MyCompletedTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/donors',
            element: <FindDonor></FindDonor>
        }
    ]
  },
  {
    path:"/dashboard",
    element: <PrivetRoute><DashboardLay></DashboardLay></PrivetRoute>,
    children: [
      {
        path:'profile',
        element:<ProfilePage></ProfilePage>
      },
      {
        path:'my-blood-request',
        element:<MyBloodRequest></MyBloodRequest>

      },
      {
        path:'alluser/admin',
        element: <AllUser></AllUser>
      },
      {
        path:'manegeDonor/admin',
        element: <ManageDonor></ManageDonor>
      },
      {
        path:'becomeDonor',
        element:<BecomeDonor></BecomeDonor>
      },
      {
        path:'profile/edit',
        element:<EditProfile></EditProfile>
      },
      {
        path: 'blood-request',
        element: <BloodRequest></BloodRequest>
      },
      {
        path: 'blood-request-status',
        element: <RequestStatus></RequestStatus>
      },
      {
        path: 'mytask',
        element: <MyTask></MyTask>
      },
      {
        path: 'task/completed',
        element: <MyCompletedTask></MyCompletedTask>
      }
    ]
  }
]);

export default router;