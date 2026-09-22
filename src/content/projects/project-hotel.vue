<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        A Python module for a prototype device that handles data retrieval and backend communication. The module acts as
        the device controller, fetching images from the device, processing them, and sending the results to the backend.
        It identifies specific items in the images, tracks their movements, and provides detailed information on their
        state and trajectory.
      </p>
      <p>
        The main challenges were dealing with the device's limited frame rate and its specific frame format. This
        required predicting item positions and calculating collisions to ensure accurate trajectory tracking.
      </p>
    </template>

    <template #responsibilities>
      <p>Implemented an item recognition and tracking system</p>
      <p>
        Developed backend communication using
        <ExternalLink :address="links.rabbitmq" label="RabbitMQ" />
      </p>
      <p>Created comprehensive documentation for operation and easy parameter customization</p>
    </template>

    <template #team>
      <p>1 developer</p>
    </template>

    <template #tech>
      <p>Vision: <ExternalLink :address="links.python" label="Python" />, <ExternalLink :address="links.opencv" label="OpenCV" /></p>
      <p>Messaging: <ExternalLink :address="links.rabbitmq" label="RabbitMQ" /></p>
    </template>
  </CaseStudy>
</template>
