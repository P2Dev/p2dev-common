export declare const cloudRoleKeys: readonly ['Admin', 'Developer', 'ProjectOwner', 'User'];
export type CloudRole = typeof cloudRoleKeys[number];
export declare const cloudRoleLabels: Readonly<Record<CloudRole, string>>;
export declare function managedCloudRoles(groups: readonly string[] | null | undefined): CloudRole[];
export declare function hasCloudAdmin(groups: readonly string[] | null | undefined, adminGroup?: string): boolean;
export declare function appRoleForGroups<A extends string = 'admin', M extends string = 'user'>(groups: readonly string[] | null | undefined, options?: { adminGroup?: string; adminRole?: A; memberRole?: M }): A | M;
