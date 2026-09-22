<template>
  <p basics-text>
    Unity plugin that enables the creation of various AR solutions for WebGL projects. I created a proof of concept
    that includes image recognition and tracking, face recognition and tracking, geolocation tracking, and plane
    detection. However, due to performance limitations, it is currently not very usable.
  </p>
  <p basics-text>
    The main challenge was to perform all recognition tasks on the browser side and then transfer the resulting
    matrices and other parameters into Unity. To address this, I created a bridge in C that serializes data on the
    browser side and deserializes it on the Unity side.
  </p>
  <p basics-text>
    As the sole developer, I implemented the recognition modes and the bridge between the browser and the WebGL build,
    built Unity editor tools that simplify project assembly, and created a web tool for generating neural network
    weights and bringing them into Unity. I also wrote extensive documentation and a set of demo projects.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Engine: <ExternalLink :address="links.unity" label="Unity" /> (<ExternalLink :address="links.unityWebgl" label="WebGL build" />)</p>
      <p>Browser: <ExternalLink :address="links.vue" label="Vue" /> (page template and recognition), C bridge to Unity</p>
  </div>
</template>
