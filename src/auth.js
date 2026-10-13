import { hasCloudAdmin } from './roles.js';

export function cognitoGroups(claims) {
  const groups = claims?.['cognito:groups'];
  return Array.isArray(groups) ? groups.filter(group => typeof group === 'string') : [];
}

export async function verifiedCognitoAccess(verifier, token, expectedSub) {
  if (typeof token !== 'string' || !token) throw new Error('Cognito access token is required.');
  const claims = await verifier.verify(token);
  if (typeof claims?.sub !== 'string' || !claims.sub || (expectedSub && claims.sub !== expectedSub)) {
    throw new Error('Cognito access token subject does not match the authenticated identity.');
  }
  const groups = cognitoGroups(claims);
  return { sub: claims.sub, groups, admin: hasCloudAdmin(groups) };
}
