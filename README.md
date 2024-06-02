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
- [x] Local docker setup with database
- [x] Seeding
- [x] Kysely
- [ ] Refresh token - Access Token and Refresh Token
- [ ] * No runway promises in lint
- [ ] Test cases with parallel testing
- [X] Coaxed out Annotation from decoders
- [ ] src/data/handler.ts publicApi contract GET should not have BodyParams but it still have because of type Api

### Web
- [x] Setup Vite over Parcel
- [x] Action Updater
- [x] Cmd as a type by itself to resolve State-State.App => Move to Action.ts
- [x] Emit everywhere? Emit cannot be execute in Action which is the most place that developer try to do it wrongly
- [x] A better routing + `UrlToken` => Not a better, just a `simpler` version
- [ ] No runway promises in lint
- [ ] Data store
- [ ] Refresh token - Inject into API layer to hold request while refreshing
 
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
