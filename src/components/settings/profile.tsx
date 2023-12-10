import { Avatar, Badge, Image } from "@nextui-org/react";
import { Session } from "next-auth";
import EditProfile from "../dialog/edit-profile";

const Profile = ({ session }: { session: Session | null }) => {
  return (
    <>
      <h1 className="mb-3 text-xl font-medium text-zinc-400">Profile</h1>
      <div className="flex rounded-xl bg-white p-5 shadow-md dark:bg-dark">
        <Badge
          content=""
          color="success"
          shape="circle"
          placement="bottom-right"
          classNames={{
            badge: "right-4",
          }}
        >
          <Avatar
            radius="full"
            className="h-20 w-20 text-large"
            showFallback
            classNames={{
              fallback: "w-full h-full",
            }}
            fallback={<Image src="/avatar.jpg" alt="avatar" radius="full" />}
            src={session?.user.image || ""}
          />
        </Badge>
        <div className="ms-3 space-y-1.5">
          <h1 className="text-lg font-semibold">{session?.user.name}</h1>
          <p className="text-xs text-zinc-400">
            Role:{" "}
            <span className="font-medium text-success">
              {session?.user.role}
            </span>
          </p>
          <p className="text-xs text-zinc-400">
            Email:{" "}
            <span className="font-medium text-black dark:text-white">
              {session?.user.email}
            </span>
          </p>
        </div>
        <EditProfile />
      </div>
    </>
  );
};

export default Profile;
