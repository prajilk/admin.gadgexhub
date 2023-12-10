import Nav from "@/components/nav/nav";
import AdminDetails from "@/components/settings/admin-details";
import Profile from "@/components/settings/profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Settings = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Nav>
      <div className="px-3">
        <Profile session={session} />
        <AdminDetails />
      </div>
    </Nav>
  );
};

export default Settings;
