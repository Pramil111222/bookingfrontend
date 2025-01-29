// import 'bootswatch/dist/Cosmo/bootstrap.min.css';
// // import 'bootswatch/dist/Yeti/bootstrap.min.css';
import 'bootswatch/dist/Sandstone/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HotelLogin from './Pages/HotelRegistration/Hotel Auths/Hotel Login/HotelLogin';
import HotelSignUp from './Pages/HotelRegistration/Hotel Auths/Hotel Signup/HotelSignUp';
import ReqOtp from './Pages/HotelRegistration/Hotel Auths/Password Recovery/ReqOtp';
import PassOtp from './Pages/HotelRegistration/Hotel Auths/Password Recovery/PassOtp';
import ResetPassword from './Pages/HotelRegistration/Hotel Auths/Password Recovery/ResetPassword';

import HotelDetails from './Pages/HotelRegistration/HotelDetails/HotelDetails';
import RoomDetailsForm from './Pages/RoomDetails/RoomDetails';
import Facilities from './Pages/Hotel/Facilities';
import Activities from './Pages/Hotel/Activities';

import Dashboard from './Pages/Dashboard/Dashboard';
import Bookings from './Pages/Dashboard/Bookings';
import Packages from './Pages/Dashboard/Packages';
import Rooms from './Pages/Dashboard/Rooms';
import Settings from './Pages/Dashboard/Settings/Settings';
import Feed from './Pages/Dashboard/Feed';
import PrivacyPolicy from './Pages/HotelRegistration/Hotel Auths/Hotel Signup/Rules/PrivacyPolicy';
import TermsAndConditions from './Pages/HotelRegistration/Hotel Auths/Hotel Signup/Rules/TermsAndConditions';
import SignIn from "./Pages/HotelRegistration/Hotel Auths/Hotel Login/SignIn";
import GoogleCallback from "./Pages/HotelRegistration/Hotel Auths/Hotel Login/GoogleCallback";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HotelLogin />} />
          <Route path="/signUp" element={<HotelSignUp />} />
          <Route path="/reqOtp" element={<ReqOtp />} />
          <Route path="/passOtp" element={<PassOtp />} />
          <Route path="/restPass" element={<ResetPassword />} />
          
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />


          <Route path="/hotelDetails" element={<HotelDetails />} />
          <Route path="/roomDetails" element={<RoomDetailsForm />} />
          <Route path="/hotelFacilities" element={<Facilities />} />
          <Route path="/activity" element={<Activities />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/package" element={<Packages />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/auth/google" element={<GoogleCallback />}></Route>          

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
