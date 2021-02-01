---
path: /blog/createpwa
date: 2021-01-20T10:12:59.335Z
title: Creating a PWA from a create-react-app project
---

**A little bit about PWA:**

## ![PWA](https://miro.medium.com/max/576/1*uCFGdkCP3P6SKv71HvUUFA.png)

---

Note: This is not a how-to article, there are many approaches for this. I’m explaining my findings and a general approach I took.

---

A Progressive Web App (PWA) is a user experience that is reliable, fast and engaging and brings native-app benefits to web applications.

Reliable in the way it can be run offline if static assets are precached by a Service Worker, as a result it’s faster because the application doesn’t need to download the files it fetches from storage so load times are reduced, and the application is engaging when it can be downloaded on the user’s home screen which can provide a natural feel for the user and even display push notifications from the application.

---

A Service Worker is a script that we’re going to use to convert our React app into a PWA.
We can implement a service worker that will precache static assets which will improve performance and boast a more impressive speed index, time to interaction, first CPU idle, and first meaningful paint (measured by Lighthouse performance tests, more on this later). This also improves the responsiveness of the application and decreases the amount of data we need to grab from an external source.
Service Workers can also act as reverse network proxys, that can queue outgoing calls from our application when there is no connection, and fires off these calls once it has network access again.
A base manifest.json file will allow the user to install the application on their home page, which will work like a native application.

---

I stumbled across a problem with create-react-app (CRA) and service workers. CRA be default uses sw-precache (which is what generates a default service worker for the project) but this comes with limitations. I found that by using a library called react-app-rewired to customize the build configuration within npm ejecting I was able to migrate from sw-precache to workbox. workbox is also built into CRA and allows us to customize routes for our service worker and add regex patterns for different files we may want to precache.

we take two different approaches to caching:

networkFirst: ServiceWorker makes network call to retrieve data, if this fails for whatever reason, it then retrieves the stored data for the appropriate call.

cacheFirst: ServiceWorker checks if data stored within browser storage first, if it can’t retrieve it, it then makes a network call. This is good for static assets that are probably not going to change very often.

staleWhileRevalidate:

---

Repo with files and file structure, including json-server (mock nodeJS server for storing mock data locally) and a CRA-project can be found here

We configure the manifest.json to allow users to download the app onto their home screen. We use the service worker as a reverse network proxy to intercept the call made by the client to the local json-server, by doing this we not only allow the app to be run offline, we allow the app to precache this data, saving speed and bytes in the process. It’s just text here but on a larger scale it’s effective. I applied this on one of my own work projects and used lighthouse to measure webapp metrics. To quickly show:

## ![sw first load](https://miro.medium.com/max/576/1*EdMZ9GEpZPtVeqLBJgk9Xw.png)

## ![sw precache](https://miro.medium.com/max/576/1*osLh7aBVnmmh46E5gxAmlg.png)

I found that lighthouse metrics had improved across the board, lighthouse is a great way of measuring the quality of your web application. More information [on the docs](https://web.dev/lighthouse-performance/#metrics).

## ![metrics](https://miro.medium.com/max/532/1*C1YpW1e_NInB9OMBxwmwWg.png)

---

Perhaps we want to notify the user that their network status is offline, we could use the navigator.onLine approach. This isn’t done in the repo but it’s something to consider as the user may not be aware their internet connection has cut out and a lot of people don’t know webapps can work like native apps and may wonder why only half their site is working. Showing this notification tells them which parts of their website work online only.
