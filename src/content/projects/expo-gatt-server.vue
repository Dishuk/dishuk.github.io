<template>
  <p basics-text>
    GitHub:
    <ExternalLink :address="links.expoGattServerGithub" label="https://github.com/Dishuk/expo-gatt-server" />
  </p>
  <p basics-text>
    While working on one of my commercial projects, I needed an
    <ExternalLink :address="links.expo" label="Expo" /> package that turns the device into a
    <ExternalLink :address="links.ble" label="BLE" /> server. There are a few solid packages for acting as a
    client, but none for acting as a server, so I wrote this one.
  </p>
  <p basics-text>
    An Expo module that puts a <ExternalLink :address="links.reactNative" label="React Native" /> app in peripheral
    mode. Define services and characteristics, advertise them, answer read and write requests, and push
    notifications, all from JavaScript. iOS goes through CoreBluetooth and Android through BluetoothGattServer, behind
    one API.
  </p>
  <h2 basics-heading basics-text>Tech Stack</h2>
  <div basic-list>
      <p>Module: <ExternalLink :address="links.expoModules" label="Expo Modules API" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>iOS: <ExternalLink :address="links.swift" label="Swift" />, <ExternalLink :address="links.coreBluetooth" label="CoreBluetooth" /></p>
      <p>Android: <ExternalLink :address="links.kotlin" label="Kotlin" />, <ExternalLink :address="links.bluetoothGattServer" label="BluetoothGattServer" /></p>
  </div>
</template>
