<template>
  <p basics-text>
    Web-based multiplayer game designed as part of a brand promotional campaign. This engaging experience allows
    users to explore locations and interact with non-player characters (NPCs) and other players through a variety of
    animations and emojis. The gameplay features a timer that triggers the opening of a portal to a second location,
    where players can watch a presentation video. Throughout the campaign, the game attracted over 3,000 unique
    users.
  </p>
  <p basics-text>
    The main challenge of this project was the limited timeframe, as it had to be developed in just three weeks.
  </p>
  <p basics-text>
    As the sole developer, I designed the architecture and built both the frontend and backend, including real-time
    multiplayer over WebSockets. I also created a simple system for editing scenes without code and integrated the
    designers' assets: models, animations, sounds and promotional materials.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" />, <ExternalLink :address="links.three" label="Three.js" /></p>
      <p>Backend: <ExternalLink :address="links.nodejs" label="Node.js" />, <ExternalLink :address="links.express" label="Express" />, <ExternalLink :address="links.websocket" label="WebSocket" /></p>
  </div>
</template>
