export declare function cognitoGroups(claims: Record<string, unknown> | null | undefined): string[];
export declare function verifiedCognitoAccess(verifier: { verify(token: string): Promise<{ sub?: unknown; 'cognito:groups'?: unknown }> }, token: string, expectedSub?: string): Promise<{ sub: string; groups: string[]; admin: boolean }>;
