# README

## TODO
- [ ] CRUD user
- [ ] User can login

### Core
- [ ] Iker: Use `zod` over `decoder` without infer
- [x] API Contract type to be simpler
- [x] Separate: Allow `array` in `UrlToken`
- [x] Add opaque type

### API
- [ ] Steven: Use https://kysely.dev/docs/getting-started over `knex`
- [ ] Local docker setup with database
- [ ] Seeding
- [ ] Test cases with parallel testing
- [ ] No runway promises in lint

### Web
- [ ] Steven: Setup Vite over Parcel
- [ ] Cmd as a type by itself to resolve State-State.App
- [ ] Emit everywhere?
- [ ] A better routing + `UrlToken`
- [ ] No runway promises in lint
 
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
