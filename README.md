# touring-calculations
Touring calculations repository

## Prerequisites

In order to publish to the `touring-calculations` private npm package, you must first create a GitHub personal access 
token (PAT) and perform an `npm login` (you will need to login once, each time you get a new PAT). Note that a PAT is 
different from an `SSH` key pair. You need to get a "[New personal access token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)" and it is
recommended that you get set it to expire in 90-days. For scopes choose two from the top level: `repo` and `write:packages`.

You can find more information at: https://unitedtalent.atlassian.net/wiki/spaces/E/pages/224198657/Using+private+repos+in+an+organisation+as+a+dependency

**Note:** The private npm registry is served by GitHub and the package is associated with the `touring-calculations` repo.
