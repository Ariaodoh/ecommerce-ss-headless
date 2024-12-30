/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { getServerSession } from 'next-auth';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { authOptions } from '../api/auth/[...nextauth]';
import { signOut } from 'next-auth/react';

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default async function StudioPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return(
      <div>
        <h2>You are not authorized to access this page</h2>
      </div>
    )
  }
  return(
    <div>
      <button onClick={() => signOut({ callbackUrl: '/aith/login'})}>Sign Out</button>
      <NextStudio config={config} />
    </div>
  );
}
