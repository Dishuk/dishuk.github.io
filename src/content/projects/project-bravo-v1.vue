<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        Mobile application for Android and iOS using
        <ExternalLink :address="links.reactNative" label="React Native" />. The main function is to connect two devices
        in parallel using
        <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /> and
        <ExternalLink :address="links.bluetoothClassic" label="Bluetooth Classic" />. The application retrieves a large amount of
        data from both devices, syncs this data, performs a fast Fourier transform (FFT), and visualizes the results through
        interactive graphs.
      </p>
      <p>
        The main challenges of the project were implementing optimized FFT calculations, creating interactive graphs,
        synchronizing two Bluetooth devices, and building an additional hardware test bench using Arduino to test the
        entire system.
      </p>
    </template>

    <template #responsibilities>
      <p>Tested the device prototype and defined the data the app required and its format</p>
      <p>
        Implemented device firmware update (DFU) functionality and multiple BLE services, both standard and
        custom
      </p>
      <p>
        Integrated a third-party C SDK through Java and Objective-C bridges to interact with one of the devices
      </p>
      <p>Implemented FFT with windowing and averaging</p>
      <p>Created a fully custom and interactive graph to visualize data</p>
    </template>

    <template #team>
      <p>2 developers</p>
    </template>

    <template #tech>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.java" label="Java" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" />, <ExternalLink :address="links.bluetoothClassic" label="Bluetooth Classic" /></p>
      <p>Test bench: <ExternalLink :address="links.arduino" label="Arduino" /></p>
    </template>
  </CaseStudy>
</template>
