# README

## TODO
- [ ] User can login
- [ ] CRUD user

### Core
- [x] No Zod, use decoders
- [x] API Contract type to be simpler
- [x] Separate: Allow `array` in `UrlToken`
- [x] Add opaque type

### API
- [ ] GraphQL
- [ ] DB migration: https://flywaydb.org/ or https://www.liquibase.com - Generates types for Kysely
- [ ] Test cases with parallel testing
- [ ] * No runway promises in lint
- [ ] Refresh token - Access Token and Refresh Token
- [ ] Add second table StaticPage
- [x] Local docker setup with database
- [x] Seeding
- [x] Kysely
- [X] Coaxed out Annotation from decoders

### Web
- [ ] Data store
- [ ] No runway promises in lint
- [ ] Refresh token - Inject into API layer to hold request while refreshing
- [x] Setup Vite over Parcel
- [x] Action Updater
- [x] Cmd as a type by itself to resolve State-State.App => Move to Action.ts
- [x] Emit everywhere? Emit cannot be execute in Action which is the most place that developer try to do it wrongly
- [x] A better routing + `UrlToken` => Not a better, just a `simpler` version
 
### Non-Goals
- [ ] Immutable state 
- [x] Not doing maintenance mode and updating of web JS bundle
- [x] Not adding stream API types
- [x] Not replacing React with pureact/snabbdom or https://github.com/typescript-tea/core
- [x] Not doing Deno

### Convention
We need to document all our convention
- [ ] Type Specification
- [ ] FTFC
- [ ] Prefer `function` over `const a = () => {}`
- [ ] Always annotate types in function and variables
- [ ] Immutable and Functional
- [ ] API follow group context base on Restful
- [ ] Files and Folder always use upper case
