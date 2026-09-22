<template>
  <p basics-text>
    A cross-platform React Native application developed for a religious organization.
    It serves as a digital hub where users can access religious books and news articles, as well as live and archived
    video broadcasts.
    The app is integrated with Firebase services and includes RTMP streaming capabilities.
  </p>
  <p basics-text>
    As one of two developers, I started the app from scratch and laid its foundation, integrated Firebase Authentication
    (Google, Facebook, Apple) and push notifications (<ExternalLink :address="links.fcm" label="FCM" />), and
    implemented the core business logic. I also built the RTMP streaming module end to end, from the admin panel and
    backend to the app and nginx configuration, and managed iOS and Android builds for internal testing.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Services: <ExternalLink :address="links.firebase" label="Firebase" /> (<ExternalLink :address="links.firebaseAuth" label="Authentication" />, <ExternalLink :address="links.fcm" label="Cloud Messaging" />)</p>
      <p>Streaming: <ExternalLink :address="links.rtmp" label="RTMP" />, <ExternalLink :address="links.nginx" label="nginx" /></p>
  </div>
</template>
