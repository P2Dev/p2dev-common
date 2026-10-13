export declare function isVerifiedEmailClaim(value: unknown, options?: { allowString?: boolean }): boolean;
export declare function normalizeCloudEmail(value: unknown): string;
export type CloudUserIdentity = { sub: string; email: string; name: string; groups: string[] };
export declare function cloudUserIdentity(value: { sub: unknown; email: unknown; name?: unknown; groups?: unknown }): CloudUserIdentity;
