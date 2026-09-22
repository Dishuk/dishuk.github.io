<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        A cross-platform React Native application developed for a religious organization.
        It serves as a digital hub where users can access religious books and news articles, as well as live and archived
        video broadcasts.
        The app is integrated with Firebase services and includes RTMP streaming capabilities.
      </p>
    </template>

    <template #responsibilities>
      <p>Started app development from scratch and established the project foundation</p>
      <p>Integrated Firebase Authentication (Google, Facebook, Apple)</p>
      <p>
        Implemented push notifications (<ExternalLink :address="links.fcm" label="FCM" />)
      </p>
      <p>Developed RTMP streaming module (admin panel, backend, app, nginx config)</p>
      <p>Managed iOS and Android builds for internal testing</p>
      <p>Implemented the app's business logic</p>
    </template>

    <template #team>
      <p>2 developers</p>
    </template>

    <template #tech>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Services: <ExternalLink :address="links.firebase" label="Firebase" /> (<ExternalLink :address="links.firebaseAuth" label="Authentication" />, <ExternalLink :address="links.fcm" label="Cloud Messaging" />)</p>
      <p>Streaming: <ExternalLink :address="links.rtmp" label="RTMP" />, <ExternalLink :address="links.nginx" label="nginx" /></p>
    </template>
  </CaseStudy>
</template>
