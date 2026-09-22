<template>
  <CaseStudy>
    <template #overview>
      <p basics-text>
        A web-based tool serves as the core of an onboard diagnostic system for agricultural carrier vehicles
        (<ExternalLink :address="links.nexat" label="NEXAT" />/<ExternalLink :address="links.nexco" label="NEXCO" />). The main task is to provide the maintenance crew with
        simple access to the vehicle's ECUs, enabling them to detect issues and adjust parameters without the need for
        additional equipment.
      </p>
      <p>
        The main challenges of the project included handling the different instruction sets specific to each ECU.
        Additionally, it was crucial to implement an extra protection layer to prevent equipment damage or injuries, as
        changes to any ECU parameter could inadvertently cause equipment movement.
      </p>
    </template>

    <template #responsibilities>
      <p>Created a system to load and verify different instruction sets based on each ECU and its firmware version</p>
      <p>Developed a module for editing ECU parameters, enabling a streamlined flow for making changes</p>
      <p>Developed a module for continuously plotting variable changes, allowing for real-time monitoring</p>
      <p>Worked alongside the maintenance crew on electrical and hardware tasks to shape the tool around their needs</p>
      <p>Performed field tests of the vehicle alongside the tool to validate its functionality in real-world scenarios</p>
    </template>

    <template #team>
      <p>2 developers</p>
    </template>

    <template #tech>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" /></p>
      <p>Backend: <ExternalLink :address="links.java" label="Java" />, <ExternalLink :address="links.springBoot" label="Spring Boot" /></p>
      <p>CAN bus gateway: <ExternalLink :address="links.python" label="Python" /></p>
    </template>
  </CaseStudy>
</template>
