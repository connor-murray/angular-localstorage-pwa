# Angular Progressive Web App with Local Storage

A progressive web app using local storage and Angular Service Worker. 
 - All TODO's will be saved to local storage
 - If a new version of the application becomes available a snack will appear to provide option to update. Alternatively the new version will be used next time the application is loaded.
 - The app can be installed to chrome apps home screen and a desktop shortcut created.

## Serve production version of application
Run `yarn run serve-prod-ngsw`

This will build a production version of the application and serve it using http-server:

`ng build --prod && http-server dist -c-1`

The -c-1 option will disable server caching. The server will run on port 8080 by default.

## Progressive Web App (PWA)

Enable support of mobile/native application capabilities such as:
  - offline support
  - app download, install, versioning
  - background sync
  - notification
 
A Service Worker is like a background process that sits between a web application and the network, intercepting all HTTP requests made by the application.
The same Service Worker instance is shared across multiple tabs of the same application. 
 
The browser that at any time will decide if the Service Worker should be running, this is so to spare resources, especially on mobile.
So if we are not doing any HTTP requests for a while or not getting any notifications, it's possible that the browser will shut down the Service Worker.
If we do trigger an HTTP request that should be handled by the Service Worker, the browser will activate it again, in case it was not yet running. 

## Configuration

ngsw-config.json
 
This is the runtime configuration file, that the Angular Service worker will use.

The files under the app section are the application: a single page is made of the combination of its index.html plus its CSS and Js bundles. These files are needed for every single page of the application and cannot be lazy loaded.
In the case of these files, we want to cache them as early and permanently as possible, and this is what the app caching configuration does.
The app files are going to be proactively downloaded and installed in the background by the Service Worker, and that is what the install mode prefetch means.
The Service worker will not wait for these files to be requested by the application, instead, it will download them ahead of time and cache them so that it can serve them the next time that they are requested.
This is a good strategy to adopt for the files that together make the application itself (the index.html, CSS and Javascript bundles) because we already know that we will need them all the time.
 
On the other hand, the assets files are cached only if they are requested (meaning the install mode is lazy), but if they were ever requested once, and if a new version is available then they will be downloaded ahead of time (which is what update mode prefetch means).
Again this is a great strategy for any assets that get downloaded in a separate HTTP request such as images because they might not always be needed depending on the pages the user visits.
But if they were needed once then its likely that we will need the updated version as well, so we might as well download the new version ahead of time.

The Angular Service Worker is going to load these files either proactively in the case of install mode prefetch, or as needed in the case of install mode lazy, and it will also store the files in Cache Storage.
This loading is going to happen in the background, as the user first loads the application. The next time that the user refreshes the page, then the Angular Service Worker is going to intercept the HTTP requests, and will serve the cached files instead of getting them from the network.
Note that each asset will have a hash entry in the hash table. If we do any modification to any of the files listed there (even if its only one character), we will have a completely different hash in the following Angular CLI build.
The Angular Service Worker will then know that this file has a new version available on the server that needs to be loaded at the appropriate time.

How does the Angular Service Worker install new application versions?
Every time that the user reloads the application, the Angular Service Worker will check to see if there is a new ngsw.json file available on the server.
This is for consistency with the standard Service Worker behavior, and to avoid having stale versions of the application running for a long time. Stale versions could potentially contain bugs or even be completely broken, so its essential to check frequently if a new application version is available on the server.
In our case, the previous and the new versions of the ngsw.json file will be compared, and the new CSS bundle will be downloaded and installed in the background.
The next time the user reloads the page, the new application version will be shown!
What we mean by that is that most likely no "Install To Home Screen" button will be shown to the user, and this is because the heurestic for displaying this button to the user was not met yet.
But we can trigger the button with the Chrome Dev Tools, in the Manifest tab using the Add To Home Screen option:
