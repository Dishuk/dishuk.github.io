<template>
  <nav v-if="items.length" class="rail" aria-label="On this page">
    <ul class="rail-list">
      <li v-for="(item, index) in items" :key="item.id">
        <a class="rail-item" :class="{ active: index === active }" :href="`#${item.id}`"
          :aria-current="index === active ? 'location' : undefined" @click.prevent="jump(item.id)">
          <span class="rail-label">{{ item.label }}</span>
          <span class="rail-tick" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { anchorTop } from '@/router/router';

type RailItem = { id: string; label: string; el: HTMLElement };

const MIN_ENTRIES = 3;
const ACTIVE_LINE = 0.35;
const BOTTOM_SLACK = 2;

const router = useRouter();
const items = ref<RailItem[]>([]);
const active = ref(0);
let frame = 0;

function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function collect(): RailItem[] {
  const column = document.querySelector('.page-col');

  if (!column) {
    return [];
  }

  let elements = Array.from(column.querySelectorAll<HTMLElement>('[data-nav]'));

  if (elements.length <= 1) {
    elements = elements.concat(Array.from(column.querySelectorAll<HTMLElement>('h2[basics-heading]')));
  }

  const used = new Set<string>();
  const found = elements.map(el => {
    const label = el.dataset.nav || el.textContent?.trim() || '';
    let id = el.id || slug(label);

    while (used.has(id)) {
      id += '-2';
    }

    used.add(id);
    el.id = id;

    return { id, label, el };
  });

  return found.length - 1 >= MIN_ENTRIES ? found : [];
}

function update() {
  frame = 0;

  const list = items.value;

  if (!list.length) {
    return;
  }

  const root = document.documentElement;

  if (window.scrollY + window.innerHeight >= root.scrollHeight - BOTTOM_SLACK) {
    active.value = list.length - 1;

    return;
  }

  const line = window.innerHeight * ACTIVE_LINE;
  let current = 0;

  list.forEach((item, index) => {
    if (item.el.getBoundingClientRect().top <= line) {
      current = index;
    }
  });

  active.value = current;
}

function schedule() {
  if (!frame) {
    frame = requestAnimationFrame(update);
  }
}

function jump(id: string) {
  router.replace({ hash: `#${id}` });
}

onMounted(async () => {
  await router.isReady();
  await nextTick();
  items.value = collect();

  const hash = decodeURIComponent(window.location.hash.slice(1));
  const target = hash ? items.value.find(item => item.id === hash) : undefined;

  if (target) {
    window.scrollTo({ top: anchorTop(target.el) });
  }

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
});
</script>

<style scoped>
.rail {
  position: fixed;
  top: 50%;
  right: calc(16px + env(safe-area-inset-right, 0px));
  z-index: 6;
  transform: translateY(-50%);
}

.rail-list {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  padding: 6px;
}

.rail-list::before {
  content: "";
  position: absolute;
  inset: -24px -16px -24px -56px;
  z-index: -1;
  background: color-mix(in srgb, var(--background) 45%, transparent);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 56px, #000 calc(100% - 16px), transparent), linear-gradient(to bottom, transparent, #000 28px, #000 calc(100% - 28px), transparent);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(to right, transparent, #000 56px, #000 calc(100% - 16px), transparent), linear-gradient(to bottom, transparent, #000 28px, #000 calc(100% - 28px), transparent);
  mask-composite: intersect;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-xx) ease;
}

.rail:hover .rail-list::before,
.rail:focus-within .rail-list::before {
  opacity: 1;
}

.rail-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  padding: 5px 8px;
  color: var(--text-color-dim);
  transition: color var(--transition-xx) ease;
}

.rail-label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  font: 400 13px / 1.3 var(--font-sans);
  transition: opacity var(--transition-xx) ease, color var(--transition-xx) ease, max-width 0s linear var(--transition-xx);
}

.rail:hover .rail-label,
.rail:focus-within .rail-label {
  max-width: 280px;
  opacity: 1;
  transition: opacity var(--transition-xx) ease, color var(--transition-xx) ease, max-width 0s;
}

.rail-tick {
  flex: none;
  width: 14px;
  height: 1px;
  background: currentColor;
  transition: width var(--transition-xx) ease, background-color var(--transition-xx) ease;
}

.rail-item:hover {
  color: var(--text-color);
}

.rail-item:hover .rail-tick {
  width: 22px;
}

.rail-item.active {
  color: var(--text-color);
}

.rail-item.active .rail-tick {
  width: 28px;
  height: 2px;
  background: var(--highlight);
}

.rail-item:focus-visible {
  outline: 1px solid var(--highlight);
  outline-offset: 2px;
}

@media (max-width: 860px) {
  .rail {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rail-list::before,
  .rail-label,
  .rail:hover .rail-label,
  .rail:focus-within .rail-label,
  .rail-tick {
    transition: none;
  }
}
</style>
