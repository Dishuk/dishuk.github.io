<template>
  <p basics-text>
    A web-based tool serves as the core of an onboard diagnostic system for agricultural carrier vehicles
    (<ExternalLink :address="links.nexat" label="NEXAT" />/<ExternalLink :address="links.nexco" label="NEXCO" />). The main task is to provide the maintenance crew with
    simple access to the vehicle's ECUs, enabling them to detect issues and adjust parameters without the need for
    additional equipment.
  </p>
  <p basics-text>
    The main challenges of the project included handling the different instruction sets specific to each ECU.
    Additionally, it was crucial to implement an extra protection layer to prevent equipment damage or injuries, as
    changes to any ECU parameter could inadvertently cause equipment movement.
  </p>
  <p basics-text>
    As one of two developers, I built the system that loads and verifies instruction sets for each ECU and firmware
    version, along with modules for editing ECU parameters and plotting variables in real time. I also worked alongside
    the maintenance crew on electrical and hardware tasks to shape the tool around their needs, and validated it in
    field tests on the vehicle.
  </p>
  <h3 basics-heading basics-text>Tech Stack</h3>
  <div basic-list>
      <p>Frontend: <ExternalLink :address="links.vue" label="Vue" /></p>
      <p>Backend: <ExternalLink :address="links.java" label="Java" />, <ExternalLink :address="links.springBoot" label="Spring Boot" /></p>
      <p>CAN bus gateway: <ExternalLink :address="links.python" label="Python" /></p>
  </div>
</template>
