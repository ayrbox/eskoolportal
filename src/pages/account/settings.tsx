import React from "react";
import Layout from "~/components/Layout";
import { securePage } from "~/lib/securePage";
import { Img } from "react-image";

import UserAvatar from "~/components/UserAvatar";
import { PagePropsWithUser } from "~/types/PagePropsWithUser";
import prisma from "~/lib/prisma";

export interface ProfileProps extends PagePropsWithUser {
  profile: Record<string, any>;
}

const Profile = ({ profile, user }: ProfileProps) => {
  return (
    <Layout user={user} title="Account Profile">
      <div className="d-flex">
        <Img
          alt="User Profile Image"
          className="rounded-circle m-3"
          src={profile.avatar}
          loader={<UserAvatar name={profile.name} />}
          unloader={<UserAvatar name={profile.name} />}
        />
        <div>
          <h2>{profile.name}</h2>
          <h4>{profile.email}</h4>
        </div>
      </div>
      <h1>Underconstruction</h1>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = securePage(async (_, user) => {
  const profile = await prisma.user.findFirst({
    where: {
      email: user.email as string,
    },
  });

  return {
    profile,
  };
});
