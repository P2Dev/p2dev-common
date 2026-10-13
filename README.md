# P2.Dev Common

Framework-neutral identity, role and theme contracts for P2.Dev apps. The package does not create users, hold credentials or assume a particular host. Apps keep their own sessions, storage and standalone login; Cloud deployments opt into Cognito.

Import only the needed subpath:

```js
import { managedCloudRoles, appRoleForGroups } from '@p2dev/common/roles';
import { verifiedCognitoAccess } from '@p2dev/common/auth';
import { isVerifiedEmailClaim } from '@p2dev/common/users';
import '@p2dev/common/theme.css';
```

`verifiedCognitoAccess` expects an app-configured cryptographic verifier. The app must validate its issuer, client and token use; the helper binds the verified access-token subject to UserInfo and extracts groups. It never decodes an unverified token. Dashboard can retain its stricter ID-token check, while Tack permits Cognito's documented string `email_verified` claim using `{ allowString: true }`.

Theme CSS exports neutral semantic primitives. An app can opt into the Cloud palette with `data-p2-theme="cloud"`; otherwise its standalone palette remains its own.

Install a pinned Git commit or release tag, run `npm test`, and update each app only after its own tests pass. Public, immutable GitHub tarballs work for standalone builds without an organization credential. Avoid a floating branch dependency. Changes to role names or identity validation require a package version change and coordinated adoption.
