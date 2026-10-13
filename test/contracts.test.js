import assert from 'node:assert/strict';
import test from 'node:test';
import { appRoleForGroups, cloudRoleKeys, hasCloudAdmin, managedCloudRoles } from '../src/roles.js';
import { cognitoGroups, verifiedCognitoAccess } from '../src/auth.js';
import { cloudUserIdentity, isVerifiedEmailClaim } from '../src/users.js';

test('managed groups preserve canonical order and ignore foreign groups', () => {
  assert.deepEqual(managedCloudRoles(['User', 'External', 'Admin']), ['Admin', 'User']);
  assert.equal(cloudRoleKeys.length, 4);
  assert.equal(hasCloudAdmin(['Developer']), false);
  assert.equal(appRoleForGroups(['Admin']), 'admin');
  assert.equal(appRoleForGroups(['User'], { memberRole: 'write' }), 'write');
});

test('verified email claims preserve each app strictness', () => {
  assert.equal(isVerifiedEmailClaim(true), true);
  assert.equal(isVerifiedEmailClaim('true'), false);
  assert.equal(isVerifiedEmailClaim('true', { allowString: true }), true);
  assert.equal(isVerifiedEmailClaim('true ' , { allowString: true }), false);
  assert.deepEqual(cloudUserIdentity({ sub: 'sub', email: ' Member@Example.COM ', groups: ['User'] }),
    { sub: 'sub', email: 'member@example.com', name: 'member', groups: ['User'] });
});

test('access-token identity is bound to the authenticated UserInfo subject', async () => {
  const verifier = { verify: async () => ({ sub: 'one', 'cognito:groups': ['Admin', 4, 'User'] }) };
  assert.deepEqual(cognitoGroups(await verifier.verify()), ['Admin', 'User']);
  assert.deepEqual(await verifiedCognitoAccess(verifier, 'token', 'one'), { sub: 'one', groups: ['Admin', 'User'], admin: true });
  await assert.rejects(verifiedCognitoAccess(verifier, 'token', 'two'), /subject/);
});
