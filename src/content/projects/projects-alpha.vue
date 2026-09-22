<template>
  <p basics-text>
    Mobile applications for both Android and iOS platforms using
    <ExternalLink :address="links.reactNative" label="React Native" />. The main function is to communicate with a
    device via
    <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /> (BLE) and perform over-the-air firmware
    updates (OTA DFU).
  </p>
  <p basics-text>The main challenge across these projects was the lack of direct access to the physical devices, which made it
    difficult to test and validate the custom services.</p>
  <p basics-text>
    Working in teams of one to four developers, I was responsible for BLE communication and firmware updates (DFU). I
    implemented standard BLE services such as UART, CTS, DFU and SMP alongside device-specific custom services, and
    built modules that simplified device interaction for the rest of the team.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.java" label="Java" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /></p>
  </div>
</template>
