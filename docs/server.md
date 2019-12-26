# Server contribution guide
## Clean architecture
`@visi/server` adopts Uncle bob's "Clean architecture" design pattern. Here's the directory structure

### Directory structure
```
- server/src
  - application    - Application Bussiness rules
  - domain         - Enterprise Bussiness rules
  - infrastructure - Frameworks and Drivers
  - adapters       - Interface Adapters
  - locales        - i18n locale files
```
