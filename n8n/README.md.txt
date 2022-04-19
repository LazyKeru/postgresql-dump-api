You can use your Postgresql-dump-api worker with `n8n`

## `n8n` setup of the node

- copy `./n8n/node/PostgresBackupApi` in this project to `./packages/nodes-base/nodes/` in your n8n project.
- copy  `./n8n/credentials/PostgresBackupApi.credentials.ts` in this project to  `./packages/nodes-base/credentials` in your n8n project.

then 
- add `"dist/credentials/PostgresBackupApi.credentials.js"` under `n8n.credentials` in `./packages/nodes-base/package.json` of your n8n project
- add `"dist/nodes/PostgresBackupApi/PostgresBackupApi.node.js"` under `n8n.nodes` in `./packages/nodes-base/package.json` of your n8n project