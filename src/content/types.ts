import type { Component } from 'vue';

export type Inline =
  | string
  | { text: string; href: string }
  | { text: string; to: string };

export type Paragraph = Inline[];

export interface SectionEntry {
  id: string;
  path: string;
  label: string;
  summary: Paragraph;
  lead?: Paragraph[];
  component?: Component;
  children?: string[];
  hidden?: boolean;
}

export interface ProjectEntry {
  id: string;
  title: string;
  section: string;
  component: Component;
}

export function link(text: string, href: string): Inline {
  return { text, href };
}

export function route(text: string, to: string): Inline {
  return { text, to };
}
