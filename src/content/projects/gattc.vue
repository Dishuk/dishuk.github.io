<template>
  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>The Problem</h2>
    <p basics-text>
      While working on multiple <RouterLink basics-link decorated internal to="/react-native">React Native</RouterLink>
      apps that communicate over
      <ExternalLink :address="links.ble" label="BLE" />, I kept hitting the same issue. The firmware would change -
      a field added, bytes reordered, a characteristic tweaked – but the documentation either wasn't updated or
      missed important details like byte order or field sizes. The app would then silently send or receive wrong
      data, and these bugs only showed up at runtime.
    </p>
    <p basics-text>
      I'm not a big fan of writing documentation, so the idea of automatically generating C code and docs sounded
      pretty great. I figured I'd give it a shot and build a tool for it. Plus, it was a nice chance to try making a
      CLI tool, which I hadn't done before.
    </p>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>The Solution</h2>
    <p basics-text>
      <ExternalLink :address="links.gattcGithub" label="gattc" /> takes a simple approach: define the GATT schema
      once in YAML and generate both the C code and documentation from it. The YAML becomes the single source of truth.
      If it changes, the code changes, the docs update, and the compiler catches any firmware that hasn't been
      adapted.
    </p>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>How It Works</h2>
    <p basics-text>The workflow is straightforward:</p>
    <div basic-list>
      <p>Services and characteristics are defined in YAML with full type information</p>
      <p>Running the compile command generates C headers, sources, and HTML documentation</p>
      <p>The generated files are included in the
        <ExternalLink :address="links.zephyr" label="Zephyr" /> project, where callbacks are implemented
      </p>
      <p>When the schema changes, recompilation ensures the C compiler flags any outdated code</p>
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Schema Definition</h2>
    <p basics-text>
      The schema describes services, characteristics, permissions, and the exact data layout. It's readable from
      both the firmware and the mobile side, and shows the full BLE interface at a glance.
    </p>
    <CodeBlock label="temperature_service.yaml" :code="snippets.schema" />
    <div centered>
      <ImageViewer :images="[images.gattcSchema]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Generated Code</h2>
    <p basics-text>
      From each schema, gattc generates packed C structs, inline pack/unpack functions with endian conversion,
      bitfield macros, write validation, and
      <ExternalLink :address="links.zephyr" label="Zephyr" /> GATT service
      registration with callback stubs. The utilities are optional – use them for guaranteed sync, or ignore them
      and work with raw buffers.
    </p>
    <CodeBlock label="temperature_service.h" :code="snippets.pack" />
    <p basics-text>
      On little-endian targets (nRF52, STM32, ESP32), endian conversions compile to nothing – effectively zero overhead.
    </p>
    <div centered>
      <ImageViewer :images="[images.gattcGeneratedCode]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Drift Detection</h2>
    <p basics-text>
      This was the main reason I started the project. When a field is added or removed, the generated pack/unpack
      signatures change, and any old code fails to compile. Schema drift gets caught by the compiler instead of
      showing up as a bug on a real device.
    </p>
    <div centered>
      <ImageViewer :images="[images.gattcDriftDetection]" />
    </div>
  </div>

  <div basics-prose>
    <h2 basics-heading basics-text>Automatic Documentation</h2>
    <p basics-text>
      Since I don't like writing docs, gattc generates them. Each service gets an HTML page with characteristic
      tables, payload layouts, bitfield definitions, and value descriptions. Always accurate, always up to date.
      With release tracking enabled, it also highlights what changed between versions.
    </p>
    <div centered>
      <ImageViewer :images="[images.gattcDocumentation]" />
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Additional Features</h2>
    <div basic-list>
      <p>Directional payloads: different data layouts for read, write, and notify operations on the same
        characteristic</p>
      <p>Variable-length payloads with repeated structs and MTU helper functions</p>
      <p>Bitfield definitions with named bits and multi-bit ranges, with overlap validation</p>
      <p>Per-service or combined output modes for both C code and HTML documentation</p>
      <p>Project configuration via <code>gattc.yaml</code> with per-service output overrides</p>
    </div>
  </div>

  <div delimiter />

  <div basics-prose>
    <h2 basics-heading basics-text>Tech Stack</h2>
    <div basic-list>
      <p>CLI: <ExternalLink :address="links.python" label="Python" />, <ExternalLink :address="links.click" label="Click" /></p>
      <p>Code generation: <ExternalLink :address="links.jinja2" label="Jinja2" /> templates, <ExternalLink :address="links.pyyaml" label="PyYAML" /></p>
      <p>Target platform: <ExternalLink :address="links.zephyr" label="Zephyr RTOS" /> (&gt;= 3.5.0)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Images as images } from '@/content/images';

const snippets = {
  schema: `schema_version: "1.0"

service:
  name: temperature_service
  uuid: "00001234-0000-1000-8000-00805f9b34fb"

characteristics:
  temperature:
    uuid: "00001235-0000-1000-8000-00805f9b34fb"
    properties: [read, notify]
    permissions: [read]
    payload:
      value:
        type: int16
        unit: celsius_x100
      flags:
        type: uint8
        bits:
          0: valid
          1: overflow`,
  pack: `static inline void temperature_service_temperature_pack(
    temperature_service_temperature_t *buf,
    int16_t value, uint8_t flags)
{
    buf->value = sys_cpu_to_le16(value);
    buf->flags = flags;
}`,
};
</script>
