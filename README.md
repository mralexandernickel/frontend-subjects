[![Build Status](https://travis-ci.org/mralexandernickel/frontend-subjects.svg?branch=master)](https://travis-ci.org/mralexandernickel/frontend-subjects)
[![Coverage Status](https://coveralls.io/repos/github/mralexandernickel/frontend-subjects/badge.svg?branch=master)](https://coveralls.io/github/mralexandernickel/frontend-subjects?branch=master)
[![npm version](https://badge.fury.io/js/%40mralexandernickel%2Ffrontend-subjects.svg)](https://www.npmjs.com/@mralexandernickel/frontend-subjects)

Frontend Subjects
=================

This is a collection of helpful utilities I'm using over and over again.
I decided to package them as ng-package, but angular is not needed to use them!

This repository is kind of a workspace, the real library is living inside
`projects/frontend-subjects`.

## How to install

Install this module by adding it as a dependency via yarn, npm or ng:

```shell
yarn add @mralexandernickel/frontend-subjects
npm install @mralexandernickel/frontend-subjects
ng add @mralexandernickel/frontend-subjects
```

## How to use

All public available modules are exported inside the public_api, which is also
the main-property in package.json.

This means, if you want to avoid trouble, you should always include modules via:

```typescript
import { YourDesiredModule } from '@mralexandernickel/frontend-subjects';
```

and never via the internal path:

```typescript
import {
  YourDesiredModule
} from '@mralexandernickel/frontend-subjects/lib/your-desired-module/your-desired-module.ts';
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

Since the app is consuming the library inside of `projects`, you should read
the "Build the library" advice also!

## Build the library

Run `ng build frontend-subjects` to build the library.
The build artifacts will be stored in the `dist/frontend-subjects` directory.

During development you may want to build the library in watch-mode. You can do
so by running `ng build frontend-subjects --watch`.

Builds will automatically have a compressed and uncompressed version inside

## Build the app (demo application)

Run `ng build` to build the app. The build artifacts will be stored in the
`dist/frontend-subjects-demo` directory.
Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test frontend-subjects` to execute the unit tests of the
library. Since builds aren't published if the code-coverage is not reaching
90% at minimum, it would make great sense if you generate a code-coverage
reports locally before you push your changes! For this you should run:

`ng test frontend-subjects --watch=false --code-coverage`

Run `ng test` to execute the unit tests of the demo-application.

Both of them are running tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
