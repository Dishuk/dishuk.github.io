import { Links } from '@/utils/LinksUtils';
import { link, route } from './types';
import type { ProjectEntry, SectionEntry } from './types';

import GattcBody from './projects/gattc.vue';
import LogicGattBody from './projects/logic-gatt.vue';
import LogicGattV2Body from './projects/logic-gatt-v2.vue';
import ProjectsAlpha from './projects/projects-alpha.vue';
import ProjectBravoV1 from './projects/project-bravo-v1.vue';
import ProjectBravoV2 from './projects/project-bravo-v2.vue';
import ProjectIndia from './projects/project-india.vue';
import ProjectCharlie from './projects/project-charlie.vue';
import ProjectDelta from './projects/project-delta.vue';
import ProjectEcho from './projects/project-echo.vue';
import ProjectFoxtrot from './projects/project-foxtrot.vue';
import ProjectHotel from './projects/project-hotel.vue';
import LinuxGpioBridge from './projects/linux-gpio-bridge.vue';
import ExpoGattServer from './projects/expo-gatt-server.vue';

export const sections: SectionEntry[] = [
  {
    id: 'react-native',
    path: '/react-native',
    label: 'React Native',
    summary: [
      'Developed multiple ',
      link('React Native', Links.reactNative),
      ' applications, mostly in the IoT domain. Projects included integrating native code for both iOS and ',
      'Android, optimizing for computational efficiency, and interfacing with CAN bus systems. Most applications utilized ',
      link('Bluetooth Low Energy', Links.ble),
      ' communication as the core technology.',
    ],
    lead: [
      [
        'I began working with ',
        link('React Native', Links.reactNative),
        ' in Q3 2023 and contributed to a large number of projects, primarily in the IoT domain. Most of my work ',
        'focused on "under the hood" components of the apps, rather than the UI. Here are the most significant ones:',
      ],
    ],
  },
  {
    id: 'web',
    path: '/web',
    label: 'Web',
    summary: [
      'Full-stack web work, from tools that talk to real hardware – vehicle diagnostics, BLE device emulation – ',
      'to real-time multiplayer and 3D/AR experiences in the browser. Mostly ',
      link('Vue', Links.vue),
      ' and ',
      link('React', Links.react),
      ' on the front end, ',
      link('Node.js', Links.nodejs),
      ' on the back.',
    ],
    lead: [
      [
        'I began my career in Q2 2021 as a full-stack engineer, primarily focusing on frontend development. While ',
        'I have worked on a variety of projects, not all of them are significant enough to highlight here.',
      ],
    ],
  },
  {
    id: 'pet-projects',
    path: '/pet-projects',
    label: 'Pet Projects',
    summary: [
      'Projects I started on my own – ideas I wanted to try out and tools I kept missing in my day-to-day ',
      'work. Most are experiments, built only as far as needed to test the idea.',
    ],
    lead: [
      [
        'I often have different project ideas, and sometimes I decide to try building one, usually because it ',
        'looks useful, challenging, or would force me to learn something new. Those end up being a great source ',
        'of new knowledge.',
      ],
    ],
    children: ['logic-gatt', 'logic-gatt-v2', 'gattc'],

  },
  {
    id: 'logic-gatt',
    path: '/logic-gatt',
    label: 'LogicGATT',
    hidden: true,
    summary: [
      'Developed a programmable ',
      link('BLE', Links.ble),
      ' device emulator. Allows defining GATT schemas visually and programming device behavior through a web ',
      'interface – no firmware reflashing needed. Supports different hardware backends via a plugin architecture ',
      '(MCU over ',
      link('UART', Links.uart),
      ' or PC Bluetooth adapter).',
    ],
    lead: [
      ['Programmable BLE device emulator with a web interface for testing mobile apps without real hardware.'],
      ['GitHub: ', link('https://github.com/Dishuk/logic-gatt', Links.logicGattGithub)],
    ],
    component: LogicGattBody,
  },
  {
    id: 'logic-gatt-v2',
    path: '/logic-gatt-v2',
    label: 'LogicGATT v2',
    hidden: true,
    summary: [
      'Rewrite of ',
      route('LogicGATT', '/logic-gatt'),
      ' as two apps: a desktop controller that holds the schema and the logic, and a mobile app that turns a ',
      'phone into the ',
      link('BLE', Links.ble),
      ' peripheral. No firmware and no extra hardware to get started.',
    ],
    lead: [
      ['BLE peripheral emulator split across a desktop controller and a phone.'],
      ['GitHub: ', link('https://github.com/Dishuk/logic-gatt-v2', Links.logicGattV2Github)],
    ],
    component: LogicGattV2Body,
  },
  {
    id: 'gattc',
    path: '/gattc',
    label: 'gattc',
    hidden: true,
    summary: [
      'Built a CLI tool to keep ',
      link('Zephyr', Links.zephyr),
      ' ',
      link('BLE', Links.ble),
      ' C code and documentation in sync with a defined GATT schema. Define services in YAML, generate ',
      'type-safe structs and docs. Optional and easy to combine with manual code.',
    ],
    lead: [
      [
        'Contract-first BLE code generator. Define GATT services once in YAML and generate type-safe C code and ',
        'documentation automatically.',
      ],
      ['GitHub: ', link('https://github.com/Dishuk/gattc', Links.gattcGithub)],
    ],
    component: GattcBody,
  },
  {
    id: 'misc',
    path: '/misc',
    label: 'Miscellaneous',
    summary: [
      'Professional projects that don\'t fit the mobile or web sections, built with different stacks and for ',
      'different domains.',
    ],
    lead: [
      ['Other projects I have worked on that don\'t fit into any specific category.'],
    ],
  },
];

export const projects: ProjectEntry[] = [
  { id: 'projects-alpha', title: 'Projects Alpha (3 similar projects)', section: 'react-native', component: ProjectsAlpha },
  { id: 'project-bravo-v1', title: 'Project Bravo (v1)', section: 'react-native', component: ProjectBravoV1 },
  { id: 'project-bravo-v2', title: 'Project Bravo (v2)', section: 'react-native', component: ProjectBravoV2 },
  { id: 'project-india', title: 'Project India', section: 'react-native', component: ProjectIndia },
  { id: 'linux-gpio-bridge', title: 'Linux GPIO Bridge', section: 'pet-projects', component: LinuxGpioBridge },
  { id: 'expo-gatt-server', title: 'expo-gatt-server', section: 'pet-projects', component: ExpoGattServer },
  { id: 'project-charlie', title: 'Project Charlie', section: 'web', component: ProjectCharlie },
  { id: 'project-delta', title: 'Project Delta', section: 'web', component: ProjectDelta },
  { id: 'project-echo', title: 'Project Echo', section: 'web', component: ProjectEcho },
  { id: 'project-foxtrot', title: 'Project Foxtrot', section: 'misc', component: ProjectFoxtrot },
  { id: 'project-hotel', title: 'Project Hotel', section: 'misc', component: ProjectHotel },
];

export function projectsOf(sectionId: string): ProjectEntry[] {
  return projects.filter(project => project.section === sectionId);
}

export function sectionByPath(path: string): SectionEntry | undefined {
  return sections.find(section => section.path === path);
}

export const navSections = sections.filter(section => !section.hidden);

export function parentOf(sectionId: string): SectionEntry | undefined {
  return sections.find(section => (section.children ?? []).includes(sectionId));
}

export function childrenOf(section: SectionEntry): SectionEntry[] {
  return (section.children ?? [])
    .map(id => sections.find(candidate => candidate.id === id))
    .filter((candidate): candidate is SectionEntry => candidate !== undefined);
}
