<template>
  <p basics-text>
    A Python module for a prototype device that handles data retrieval and backend communication. The module acts as
    the device controller, fetching images from the device, processing them, and sending the results to the backend.
    It identifies specific items in the images, tracks their movements, and provides detailed information on their
    state and trajectory.
  </p>
  <p basics-text>
    The main challenges were dealing with the device's limited frame rate and its specific frame format. This
    required predicting item positions and calculating collisions to ensure accurate trajectory tracking.
  </p>
  <p basics-text>
    As the sole developer, I implemented item recognition and tracking, built the backend communication over
    <ExternalLink :address="links.rabbitmq" label="RabbitMQ" />, and wrote documentation covering operation and
    parameter tuning.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Vision: <ExternalLink :address="links.python" label="Python" />, <ExternalLink :address="links.opencv" label="OpenCV" /></p>
      <p>Messaging: <ExternalLink :address="links.rabbitmq" label="RabbitMQ" /></p>
  </div>
</template>
