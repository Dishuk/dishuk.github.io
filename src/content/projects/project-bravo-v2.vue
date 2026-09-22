<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        In this iteration of the project, new features were added to the device, eliminating the need for a second
        device in parallel. Additionally, several fixes were implemented based on the testing of app v1.
      </p>
    </template>

    <template #responsibilities>
      <p>Migrated the application to the new React Native architecture</p>
      <p>
        Integrated
        <ExternalLink :address="links.kissfft" label="KISS FFT" /> and moved FFT calculations from JavaScript to
        native modules (using Turbo Native Modules)
      </p>
      <p>Refactored the FFT graph controls to resemble those used in oscilloscopes</p>
      <p>Implemented filtering and parsing of CAN bus frames</p>
      <p>Refactored the test bench to meet all the required conditions for testing</p>
    </template>

    <template #team>
      <p>1 developer</p>
    </template>

    <template #tech>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" /> (<ExternalLink :address="links.rnNewArchitecture" label="New Architecture" />, <ExternalLink :address="links.turboModules" label="Turbo Native Modules" />), <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.kotlin" label="Kotlin" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Signal processing: <ExternalLink :address="links.kissfft" label="KISS FFT" /></p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" />, <ExternalLink :address="links.canBus" label="CAN bus" /></p>
    </template>
  </CaseStudy>
</template>
