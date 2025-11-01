import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/AuthContext";

// Public Screens
import PublicHome from "../../screens/dashboard_tamu/PublicHome";
import AboutHome from "../../screens/dashboard_tamu/AboutHome";
import Login from "../../screens/Login";
import OrmawaHome from "../../screens/dashboard_tamu/OrmawaHome";
import UkmHome from "../../screens/dashboard_tamu/UkmHome";
import AcaraHome from "../../screens/dashboard_tamu/AcaraHome";

// Admin Screens
import DashboardAdmin from "../../screens/dashboard_admin/DashboardAdmin";
import ProfileAdmin from "../../screens/dashboard_admin/ProfileAdmin";
import CrudAcara from "../../screens/dashboard_admin/crud/CrudAcara";
import CrudMahasiswa from "../../screens/dashboard_admin/crud/CrudMahasiswa";
import CrudAOrmawa from "../../screens/dashboard_admin/crud/CrudOrmawa";
import CrudPengaturan from "../../screens/dashboard_admin/crud/CrudPengaturan";
import CreateOrmawa from "../../screens/dashboard_admin/crud/CreateOrmawa";
import DeleteOrmawa from "../../screens/dashboard_admin/crud/DeleteOrmawa";
import UpdateOrmawa from "../../screens/dashboard_admin/crud/Updateormawa";
import DetailOrmawa from "../../screens/dashboard_admin/crud/DetailOrmawa";

// Mahasiswa Screens
import DashboardMhs from "../../screens/dashboard_mahasiswa/DashboardMhs";
import ProfileMhs from "../../screens/dashboard_mahasiswa/ProfileMhs";
const Stack = createNativeStackNavigator();


const NavMain = () => {
  const { user } = useContext(AuthContext);

  // selalu render satu stack utama
  if (!user) {
    // TAMU
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PublicHome" component={PublicHome} />
        <Stack.Screen name="AboutHome" component={AboutHome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OrmawaHome" component={OrmawaHome} />
          <Stack.Screen name="UkmHome" component={UkmHome} />
          <Stack.Screen name="AcaraHome" component={AcaraHome} />
      </Stack.Navigator>
    );
  }

  if (user.role === "admin") {
    // ADMIN
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} />
        <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />
        <Stack.Screen name="CrudMahasiswa" component={CrudMahasiswa} />
        <Stack.Screen name="CrudOrmawa" component={CrudAOrmawa} />
        <Stack.Screen name="CrudAcara" component={CrudAcara} />
        <Stack.Screen name="CrudPengaturan" component={CrudPengaturan} />
        <Stack.Screen name="CreateOrmawa" component={CreateOrmawa} />
        <Stack.Screen name="DeleteOrmawa" component={DeleteOrmawa} />
        <Stack.Screen name="UpdateOrmawa" component={UpdateOrmawa} />
        <Stack.Screen name="DetailOrmawa" component={DetailOrmawa} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  if (user.role === "mahasiswa") {
    // MAHASISWA
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardMhs" component={DashboardMhs} />
        <Stack.Screen name="ProfileMhs" component={ProfileMhs} />
      </Stack.Navigator>
    );
  }

  return null;
};

export default NavMain;
