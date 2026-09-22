<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        Web-based multiplayer game designed as part of a brand promotional campaign. This engaging experience allows
        users to explore locations and interact with non-player characters (NPCs) and other players through a variety of
        animations and emojis. The gameplay features a timer that triggers the opening of a portal to a second location,
        where players can watch a presentation video. Throughout the campaign, the game attracted over 3,000 unique
        users.
      </p>
      <p>
        The main challenge of this project was the limited timeframe, as it had to be developed in just three weeks.
      </p>
    </template>

    <template #responsibilities>
      <p>Designed the project architecture</p>
      <p>Fully developed both the frontend and backend components</p>
      <p>Built real-time multiplayer over WebSockets</p>
      <p>Designed a simple yet effective system for editing scenes without the need for coding</p>
      <p>Integrated assets from designers, including models, animations, sounds, and promotional materials</p>
    </template>

    <template #team>
      <p>1 developer</p>
    </template>

    <template #tech>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" />, <ExternalLink :address="links.three" label="Three.js" /></p>
      <p>Backend: <ExternalLink :address="links.nodejs" label="Node.js" />, <ExternalLink :address="links.express" label="Express" />, <ExternalLink :address="links.websocket" label="WebSocket" /></p>
    </template>
  </CaseStudy>
</template>
