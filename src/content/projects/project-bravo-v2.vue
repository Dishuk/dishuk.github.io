<template>
  <p basics-text>
    In this iteration of the project, new features were added to the device, eliminating the need for a second
    device in parallel. Additionally, several fixes were implemented based on the testing of app v1.
  </p>
  <p basics-text>
    As the sole developer, I migrated the app to the new React Native architecture and moved the FFT calculations from
    JavaScript to native code using <ExternalLink :address="links.kissfft" label="KISS FFT" /> and Turbo Native Modules.
    I also reworked the graph controls to behave like an oscilloscope, implemented CAN bus frame filtering and parsing,
    and adapted the test bench to cover all required test conditions.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" /> (<ExternalLink :address="links.rnNewArchitecture" label="New Architecture" />, <ExternalLink :address="links.turboModules" label="Turbo Native Modules" />), <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.kotlin" label="Kotlin" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Signal processing: <ExternalLink :address="links.kissfft" label="KISS FFT" /></p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" />, <ExternalLink :address="links.canBus" label="CAN bus" /></p>
  </div>
</template>
