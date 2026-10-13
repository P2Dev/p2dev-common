export function isVerifiedEmailClaim(value, { allowString = false } = {}) {
  return value === true || (allowString && value === 'true');
}

export function normalizeCloudEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

export function cloudUserIdentity({ sub, email, name, groups = [] }) {
  if (typeof sub !== 'string' || !sub) throw new Error('Cognito subject is required.');
  const normalizedEmail = normalizeCloudEmail(email);
  if (!normalizedEmail || !normalizedEmail.includes('@')) throw new Error('A verified email is required.');
  return { sub, email: normalizedEmail, name: typeof name === 'string' && name.trim() ? name.trim() : normalizedEmail.split('@')[0], groups: Array.isArray(groups) ? [...groups] : [] };
}
