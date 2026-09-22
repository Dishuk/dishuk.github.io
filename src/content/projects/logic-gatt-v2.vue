<template>
  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Why a Rewrite</h2>
    <p basics-text>
      The <RouterLink basics-link decorated internal to="/logic-gatt">first version</RouterLink>'s scope kept growing
      while I built it, and my view on how it should work changed, so I rewrote it.
    </p>
    <p basics-text>
      <RouterLink basics-link decorated internal to="/logic-gatt">v1</RouterLink> could only act as a peripheral
      through a microcontroller running its UART firmware (the reference build targets
      <ExternalLink :address="links.esp32" label="ESP32" />), or the PC's own Bluetooth adapter on Windows. v2 comes with a mobile app that turns the
      user's phone into the peripheral.
    </p>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>How It Works</h2>
    <p basics-text>
      The work is split across two apps. The desktop controller holds everything: the GATT schema editor, the
      scenario and function engine, and the sandboxed JavaScript runtime. It does no
      <ExternalLink :address="links.ble" label="BLE" /> at all. The mobile app is the peripheral and holds no logic.
      It advertises the schema, runs the native GATT calls, and forwards events back.
    </p>
    <p basics-text>
      Both run on the same Wi-Fi network. The desktop runs a WebSocket server and advertises over mDNS. The phone
      finds it by scanning a QR code or picking it from the mDNS list.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattV2Desktop]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Pairing</h2>
    <p basics-text>
      The QR code carries a session token for that run. The mDNS record deliberately doesn't, so a phone that scans
      the code is adopted right away, while anything else that finds the desktop on the network has to be approved
      first.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattV2Mobile]" portrait />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Transports</h2>
    <p basics-text>
      The phone is the default and needs no extra setup. Both
      <RouterLink basics-link decorated internal to="/logic-gatt">v1</RouterLink> backends are still available as optional
      transports: the PC's own Bluetooth adapter through a bundled bridge, and an MCU over
      <ExternalLink :address="links.uart" label="USB serial" />.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattV2Transport]" />
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Tech Stack</h2>
    <div basic-list>
      <p>Desktop: <ExternalLink :address="links.electrobun" label="Electrobun" /> (<ExternalLink :address="links.bun" label="Bun" /> runtime, system webview), <ExternalLink :address="links.react" label="React" />, <ExternalLink :address="links.vite" label="Vite" />, <ExternalLink :address="links.typescript" label="TypeScript" /></p>
      <p>Mobile: <ExternalLink :address="links.expo" label="Expo" />, <ExternalLink :address="links.reactNative" label="React Native" />, <RouterLink basics-link decorated internal to="/pet-projects#expo-gatt-server">expo-gatt-server</RouterLink></p>
      <p>Link: <ExternalLink :address="links.websocket" label="WebSocket" /> over Wi-Fi, <ExternalLink :address="links.mdns" label="mDNS" /> discovery</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Images as images } from '@/content/images';
</script>
