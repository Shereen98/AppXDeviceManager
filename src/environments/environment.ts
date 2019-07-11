// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlAddress:"http://localhost:4200/",
  firebase : {
    apiKey: "AIzaSyAQ0mFH2OZ7AvlVIfmr4g49H6QSxSKNDks",
    authDomain: "appx-device-manager.firebaseapp.com",
    databaseURL: "https://appx-device-manager.firebaseio.com",
    projectId: "appx-device-manager",
    storageBucket: "",
    messagingSenderId: "67924899594",
    appId: "1:67924899594:web:fdd3b65fd9d5ba88"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
