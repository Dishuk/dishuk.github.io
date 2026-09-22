<template>
  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>The Problem</h2>
    <p basics-text>
      While working on multiple <RouterLink basics-link decorated internal to="/react-native">React Native</RouterLink>
      IoT applications, I often faced a common challenge. The mobile app and embedded device were usually developed
      in parallel, so I didn't always have access to the hardware during the early stages. As a result, testing was
      difficult and required me to build custom emulation tools for each project.
    </p>
    <p basics-text>
      Existing tools like <ExternalLink :address="links.nrfConnect" label="nRF Connect" /> only support static
      characteristic values. Unfortunately, every real device I worked with had much more complex behavior. They
      responded conditionally to user actions and coordinated multiple characteristics within a single operational
      flow. Because of this, I started this project as a small tool that I really needed at the time.
    </p>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>The Solution</h2>
    <p basics-text>
      <ExternalLink :address="links.logicGattGithub" label="LogicGATT" /> is a programmable <ExternalLink :address="links.ble" label="BLE" /> device emulator with a web interface.
      The frontend provides visual editors for GATT schemas, event-driven scenarios, and custom TypeScript functions,
      along with a real-time terminal for monitoring BLE traffic. It supports emulating BLE devices with varying levels of complexity,
      enabling quick iteration on application code – no firmware reflashing needed.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattOverview]" />
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>How It Works</h2>
    <p basics-text>
      The frontend is a <ExternalLink :address="links.react" label="React" />-based web application that provides:
    </p>
    <div basic-list>
      <p>Visual editor for defining GATT schemas (services, characteristics, properties)</p>
      <p>Scenario builder for creating event-driven behavior with triggers (read, write, timer, startup)</p>
      <p><ExternalLink :address="links.codemirror" label="CodeMirror" />-powered editor for writing custom <ExternalLink :address="links.typescript" label="TypeScript" /> functions</p>
      <p>Real-time terminal for monitoring BLE traffic and function logs</p>
    </div>
    <p basics-text>
      The backend connects to a hardware adapter and configures it as a BLE peripheral. All device behavior logic
      runs in the browser, sandboxed in <ExternalLink :address="links.webWorkers" label="Web Workers" /> for security. When a BLE client interacts with the device,
      events flow to the frontend, scenarios execute, and responses are sent back.
    </p>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>GATT Schema Editor</h2>
    <p basics-text>
      A visual builder for defining BLE services and characteristics. The editor allows specifying UUIDs,
      configuring properties (read, write, notify), and setting initial values – all without writing any firmware code.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattSchemaBuilder]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Scenario System</h2>
    <p basics-text>
      Event-driven pipelines that define how the emulated device responds to interactions. Scenarios can be
      triggered by BLE client reads/writes, timers, or device startup. This enables complex device behavior
      simulation without touching firmware.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattScenarios]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Sandboxed Scripting</h2>
    <p basics-text>
      For complex logic that goes beyond simple responses, custom <ExternalLink :address="links.typescript" label="TypeScript" /> functions can be used.
      These run safely in <ExternalLink :address="links.webWorkers" label="Web Workers" />, providing full scripting capability while keeping the system secure.
    </p>
    <p basics-text>
      Each function receives a byte array as input and returns a byte array as output. The runtime provides:
    </p>
    <div basic-list>
      <p>Global variables for maintaining state across multiple interactions</p>
      <p>Binary reader/writer utilities for parsing and constructing BLE protocol payloads</p>
      <p>Logging API for debugging output in the terminal</p>
      <p>Ability to trigger other scenarios programmatically</p>
    </div>
    <div centered>
      <ImageViewer :images="[images.logicGattCodeEditor]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Real-Time Terminal</h2>
    <p basics-text>
      Monitor all BLE traffic as it happens – reads, writes, notifications, and connection events. This provides
      immediate feedback during development and helps debug communication issues.
    </p>
    <div centered>
      <ImageViewer :images="[images.logicGattConsole]" />
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Plugin Architecture</h2>
    <p basics-text>
      The system supports swappable connectivity backends through a plugin architecture, making it relatively easy
      to create new backends for different hardware (e.g., <ExternalLink :address="links.stm32" label="STM32" />,
      <ExternalLink :address="links.nrf52" label="nRF52" />). Currently available:
    </p>
    <div basic-list>
      <p>
        <strong>ble-uart</strong> – Connects to any microcontroller via USB-UART using a custom frame-based protocol.
        The repository includes reference firmware for <ExternalLink :address="links.esp32" label="ESP32" /> written in C,
        using the <ExternalLink :address="links.nimble" label="NimBLE" /> stack on <ExternalLink :address="links.freertos" label="FreeRTOS" />.
        The protocol is documented for porting to other MCUs.
      </p>
      <p>
        <strong>usb-ble</strong> – Uses the PC's Bluetooth adapter as a BLE peripheral. A Python backend leverages
        Windows Runtime APIs to manage the adapter. Compatible with Windows 10/11.
      </p>
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Tech Stack</h2>
    <div basic-list>
      <p>Frontend: <ExternalLink :address="links.react" label="React" />, <ExternalLink :address="links.typescript" label="TypeScript" />, <ExternalLink :address="links.vite" label="Vite" />, <ExternalLink :address="links.codemirror" label="CodeMirror" /></p>
      <p>Backend: <ExternalLink :address="links.nodejs" label="Node.js" />, <ExternalLink :address="links.express" label="Express" />, <ExternalLink :address="links.websocket" label="WebSocket" /></p>
      <p>Firmware: <ExternalLink :address="links.cLang" label="C" />, <ExternalLink :address="links.espidf" label="ESP-IDF" />, <ExternalLink :address="links.nimble" label="NimBLE" />, <ExternalLink :address="links.freertos" label="FreeRTOS" /></p>
      <p>USB-BLE plugin: <ExternalLink :address="links.python" label="Python" />, <ExternalLink :address="links.windowsRuntime" label="WinRT" /></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Images as images } from '@/content/images';
</script>
