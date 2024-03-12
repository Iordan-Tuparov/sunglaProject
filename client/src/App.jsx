import { Routes, Route } from "react-router-dom"

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Create from "./components/create/Create";
import Login from "./components/auth/login/Login";
import ErrorPage from "./components/404/ErrorPage";
import Register from "./components/auth/register/Register";
import Detaitls from "./components/details/Details";
import Edit from "./components/edit/Edit";
import Delete from "./components/delete/Delete";
import Logout from "./components/auth/logout/Logout";
import MyProfile from "./components/my-profile/MyProfile";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";

import { AuthProvider } from "../context/authContext";
import { SunglassesProvider } from "../context/sunglassesContext";
import PrivateRoute from "./components/common/PrivetRoute";
import SunglassesOwner from "./components/common/SunglassesOwner";
import IsAlreadyAuth from "./components/common/isAlreadyAuth";

function App() {

  return (
    <AuthProvider>
      <SunglassesProvider>

        <main>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
            <Route path="/sunglasses/catalog" element={<Catalog />} />
            <Route path="/sunglasses/create" element={<PrivateRoute><Create /></PrivateRoute>} />
            <Route path="/auth/login" element={<IsAlreadyAuth><Login /></IsAlreadyAuth>} />
            <Route path="/auth/register" element={<IsAlreadyAuth><Register /></IsAlreadyAuth>} />
            <Route path="/sunglasses/:sunglassesId/details" element={<Detaitls />} />
            <Route path="/sunglasses/:sunglassesId/edit" element={<SunglassesOwner><Edit /></SunglassesOwner>} />
            <Route path="/sunglasses/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
            <Route path="/sunglasses/:sunglassesId/delete" element={<SunglassesOwner><Delete /></SunglassesOwner>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <Footer />
        </main>

      </SunglassesProvider>
    </AuthProvider>
  )
}

export default App
