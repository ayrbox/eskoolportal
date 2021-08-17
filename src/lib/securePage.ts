import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getSession } from 'next-auth/client';
import { ensureConnection } from '~/database';

export type PageServerSideProps = (
  ctx: GetServerSidePropsContext,
  user: User
) => Promise<Record<string, any>>;

export type SecurePage = (
  pageServerSide?: PageServerSideProps
) => GetServerSideProps;

export const securePage: SecurePage = (pageServerSide) => async (ctx) => {
  const session = await getSession(ctx);

  const user = session?.user;

  if (!session || !user) {
    ctx.res.writeHead(307, { Location: '/login' }); // redirect to login if not authenticated
    ctx.res.end();
    return { props: {} };
  }

  await ensureConnection();

  if (pageServerSide) {
    return {
      props: {
        user,
        ...JSON.parse(JSON.stringify(await pageServerSide(ctx, user))),
      },
    };
  } else {
    return {
      props: {
        user,
      },
    };
  }
};
