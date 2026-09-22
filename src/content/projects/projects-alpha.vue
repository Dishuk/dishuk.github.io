<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        Mobile applications for both Android and iOS platforms using
        <ExternalLink :address="links.reactNative" label="React Native" />. The main function is to communicate with a
        device via
        <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /> (BLE) and perform over-the-air firmware
        updates (OTA DFU).
      </p>
      <p>The main challenge across these projects was the lack of direct access to the physical devices, which made it
        difficult to test and validate the custom services.</p>
    </template>

    <template #responsibilities>
      <p>Developed and managed BLE communication and device firmware update (DFU) procedures</p>
      <p>Created modules that simplify device interactions for developers</p>
      <p>
        Implemented a range of standard BLE services (e.g., BLE UART, CTS, DFU, SMP) along with custom services
        specific to each device
      </p>
    </template>

    <template #team>
      <p>1–4 developers</p>
    </template>

    <template #tech>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.java" label="Java" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /></p>
    </template>
  </CaseStudy>
</template>
