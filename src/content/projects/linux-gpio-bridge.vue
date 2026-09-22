<template>
  <p basics-text>
    GitHub:
    <ExternalLink :address="links.linuxGpioBridgeGithub" label="https://github.com/Dishuk/f411_dln2_gpio" />
  </p>
  <p basics-text>
    I found a blog post where another dev needed to control GPIO pins and decided to use the
    <ExternalLink :address="links.dln2Driver" label="dln2" /> driver built into Linux. I thought it would be useful
    enough to build for myself.
  </p>
  <p basics-text>
    Firmware for an STM32F411 (Black Pill). Linux picks the board up as a GPIO chip with 17 lines, an SPI master
    with four chip selects, and a 6-channel 10-bit ADC. Nothing to install on the host; libgpiod and spidev work as
    usual.
  </p>
  <p basics-text>
    SPI tops out around 200 KB/s. Every request costs a USB round trip and payloads are capped at 256 bytes, so a
    faster bus clock doesn't buy much. ADC sampling is capped at 1 kHz because the period is set in whole
    milliseconds.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Firmware: <ExternalLink :address="links.cLang" label="C" />, <ExternalLink :address="links.stm32cube" label="STM32Cube" /> (HAL, USB device library)</p>
      <p>Hardware: <ExternalLink :address="links.stm32" label="STM32F411" /> (Black Pill)</p>
      <p>Host: Linux <ExternalLink :address="links.dln2Driver" label="dln2" /> driver, <ExternalLink :address="links.libgpiod" label="libgpiod" />, <ExternalLink :address="links.spidev" label="spidev" /></p>
  </div>
</template>
