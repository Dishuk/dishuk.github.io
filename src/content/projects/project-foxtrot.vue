<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        Unity plugin that enables the creation of various AR solutions for WebGL projects. I created a proof of concept
        that includes image recognition and tracking, face recognition and tracking, geolocation tracking, and plane
        detection. However, due to performance limitations, it is currently not very usable.
      </p>
      <p>
        The main challenge was to perform all recognition tasks on the browser side and then transfer the resulting
        matrices and other parameters into Unity. To address this, I created a bridge in C that serializes data on the
        browser side and deserializes it on the Unity side.
      </p>
    </template>

    <template #responsibilities>
      <p>Implemented various recognition modes</p>
      <p>Created a bridge between the browser and the WebGL build</p>
      <p>Developed tools for the Unity editor to facilitate easier project assembly</p>
      <p>Created a web interface tool for generating weights for the neural network and integrating them into Unity</p>
      <p>Produced extensive documentation and a list of demo projects</p>
    </template>

    <template #team>
      <p>1 developer</p>
    </template>

    <template #tech>
      <p>Engine: <ExternalLink :address="links.unity" label="Unity" /> (<ExternalLink :address="links.unityWebgl" label="WebGL build" />)</p>
      <p>Browser: <ExternalLink :address="links.vue" label="Vue" /> (page template and recognition), C bridge to Unity</p>
    </template>
  </CaseStudy>
</template>
