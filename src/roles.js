export const cloudRoleKeys = Object.freeze(['Admin', 'Developer', 'ProjectOwner', 'User']);
export const cloudRoleLabels = Object.freeze({ Admin: 'Admin', Developer: 'Developer', ProjectOwner: 'Project Owner', User: 'User' });

export function managedCloudRoles(groups) {
  const values = Array.isArray(groups) ? groups : [];
  return cloudRoleKeys.filter(role => values.includes(role));
}

export function hasCloudAdmin(groups, adminGroup = 'Admin') {
  return Array.isArray(groups) && groups.includes(adminGroup);
}

export function appRoleForGroups(groups, { adminGroup = 'Admin', adminRole = 'admin', memberRole = 'user' } = {}) {
  return hasCloudAdmin(groups, adminGroup) ? adminRole : memberRole;
}
