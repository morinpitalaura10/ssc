import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/AuthContext";

// Public Screens
import PublicHome from "../../screens/dashboard_tamu/PublicHome";
import AboutHome from "../../screens/dashboard_tamu/AboutHome";
import Login from "../../screens/Login";
import ReadOrmawaHome from "../../screens/dashboard_tamu/ReadOrmawaHome";
import ReadUkmHome from "../../screens/dashboard_tamu/ReadUkmHome";
import ReadAcaraHome from "../../screens/dashboard_tamu/ReadAcaraHome";
import Pendaftaran from "../../screens/dashboard_tamu/pendaftaran";

// Admin Screens
import DashboardAdmin from "../../screens/dashboard_admin/DashboardAdmin";
import ProfileAdmin from "../../screens/dashboard_admin/ProfileAdmin";
import CrudAcara from "../../screens/dashboard_admin/crud/CrudAcara";
import CreateAcara from "../../screens/dashboard_admin/crud/CreateAcara";
import ReadAcara from "../../screens/dashboard_admin/crud/ReadAcara";
import UpdateAcara from "../../screens/dashboard_admin/crud/UpdateAcara";
import CrudMahasiswa from "../../screens/dashboard_admin/crud/CrudMahasiswa";
import CreateMahasiswa from "../../screens/dashboard_admin/crud/CreateMahasiswa";
import ReadMahasiswa from "../../screens/dashboard_admin/crud/ReadMahasiswa";
import UpdateMahasiswa from "../../screens/dashboard_admin/crud/UpdateMahasiswa";
import CrudAOrmawa from "../../screens/dashboard_admin/crud/CrudOrmawa";
import CrudUKM from "../../screens/dashboard_admin/crud/CrudUKM";
import CreateUKM from "../../screens/dashboard_admin/crud/CreateUKM";
import ReadUKM from "../../screens/dashboard_admin/crud/ReadUKM";
import UpdateUKM from "../../screens/dashboard_admin/crud/UpdateUKM";
import CrudPengaturan from "../../screens/dashboard_admin/crud/CrudPengaturan";
import CreateOrmawa from "../../screens/dashboard_admin/crud/CreateOrmawa";
import UpdateOrmawa from "../../screens/dashboard_admin/crud/UpdateOrmawa";
import ReadOrmawa from "../../screens/dashboard_admin/crud/ReadOrmawa";
import EditProfileAdmin from "../../screens/dashboard_admin/EditProfileAdmin";

// Mahasiswa Screens
import DashboardMhs from "../../screens/dashboard_mahasiswa/DashboardMhs";
import ProfileMhs from "../../screens/dashboard_mahasiswa/ProfileMhs";
import UpdateProfileMhs from "../../screens/dashboard_mahasiswa/UpdateProfileMhs";
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
        <Stack.Screen name="ReadOrmawaHome" component={ReadOrmawaHome} />
        <Stack.Screen name="ReadUkmHome" component={ReadUkmHome} />
        <Stack.Screen name="ReadAcaraHome" component={ReadAcaraHome} />
        <Stack.Screen name="pendaftaran" component={Pendaftaran} />
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
        <Stack.Screen name="CreateMahasiswa" component={CreateMahasiswa} />
        <Stack.Screen name="ReadMahasiswa" component={ReadMahasiswa} />
        <Stack.Screen name="UpdateMahasiswa" component={UpdateMahasiswa} />
        <Stack.Screen name="CrudOrmawa" component={CrudAOrmawa} />
        <Stack.Screen name="CrudAcara" component={CrudAcara} />
        <Stack.Screen name="CreateAcara" component={CreateAcara} />
        <Stack.Screen name="ReadAcara" component={ReadAcara} />
        <Stack.Screen name="UpdateAcara" component={UpdateAcara} />
        <Stack.Screen name="CrudUKM" component={CrudUKM} />
        <Stack.Screen name="CreateUKM" component={CreateUKM} />
        <Stack.Screen name="ReadUKM" component={ReadUKM} />
        <Stack.Screen name="UpdateUKM" component={UpdateUKM} />
        <Stack.Screen name="CrudPengaturan" component={CrudPengaturan} />
        <Stack.Screen name="CreateOrmawa" component={CreateOrmawa} />
        <Stack.Screen name="UpdateOrmawa" component={UpdateOrmawa} />
        <Stack.Screen name="ReadOrmawa" component={ReadOrmawa} />
        <Stack.Screen name="EditProfileAdmin" component={EditProfileAdmin} />

      </Stack.Navigator>
    );
  }

  if (user.role === "mahasiswa") {
    // MAHASISWA
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardMhs" component={DashboardMhs} />
        <Stack.Screen name="ProfileMhs" component={ProfileMhs} />
        <Stack.Screen name="UpdateProfileMhs" component={UpdateProfileMhs} />

      </Stack.Navigator>
    );
  }

  return null;
};

export default NavMain;
