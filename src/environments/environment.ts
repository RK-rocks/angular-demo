/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // appInsights: {
  //   instrumentationKey: "c219e8a2-7676-4c9d-8eeb-3f17eecf9b83"
  // },
  production: false,
  apiUrl: "http://localhost:4065",
  pfdUrl:'http://localhost:4065/pdf/terms-and-conditions-template.pdf',
  userUrl:'http://localhost:4065/users/',
  productImage: 'http://localhost:4065/products/',
  productImages: 'http://localhost:4065/productimages/'
};
