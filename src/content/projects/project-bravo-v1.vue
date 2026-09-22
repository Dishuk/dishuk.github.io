<template>
  <p basics-text>
    Mobile application for Android and iOS using
    <ExternalLink :address="links.reactNative" label="React Native" />. The main function is to connect two devices
    in parallel using
    <ExternalLink :address="links.ble" label="Bluetooth Low Energy" /> and
    <ExternalLink :address="links.bluetoothClassic" label="Bluetooth Classic" />. The application retrieves a large amount of
    data from both devices, syncs this data, performs a fast Fourier transform (FFT), and visualizes the results through
    interactive graphs.
  </p>
  <p basics-text>
    The main challenges of the project were implementing optimized FFT calculations, creating interactive graphs,
    synchronizing two Bluetooth devices, and building an additional hardware test bench using Arduino to test the
    entire system.
  </p>
  <p basics-text>
    As one of two developers, I tested the device prototype and defined the data the app needed and its format. I
    implemented firmware updates (DFU) and a set of standard and custom BLE services, integrated a third-party C SDK
    through Java and Objective-C bridges, and built the FFT processing with windowing and averaging, along with a fully
    custom interactive graph.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Mobile: <ExternalLink :address="links.reactNative" label="React Native" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Native: <ExternalLink :address="links.java" label="Java" /> (Android), <ExternalLink :address="links.objectiveC" label="Objective-C" /> (iOS)</p>
      <p>Connectivity: <ExternalLink :address="links.ble" label="Bluetooth Low Energy" />, <ExternalLink :address="links.bluetoothClassic" label="Bluetooth Classic" /></p>
      <p>Test bench: <ExternalLink :address="links.arduino" label="Arduino" /></p>
  </div>
</template>
