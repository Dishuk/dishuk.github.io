import { defineComponent, h, PropType } from 'vue';
import { RouterLink } from 'vue-router';
import type { Inline } from '@/content/types';

export default defineComponent({
  name: 'InlineText',
  props: {
    segments: { type: Array as PropType<Inline[]>, required: true },
  },
  setup(props) {
    return () => props.segments.map(segment => {
      if (typeof segment === 'string') {
        return segment;
      }

      if ('to' in segment) {
        return h(
          RouterLink,
          { to: segment.to, 'basics-link': '', decorated: '', internal: '' },
          () => segment.text
        );
      }

      return h(
        'a',
        {
          href: segment.href,
          target: '_blank',
          rel: 'noopener noreferrer',
          'basics-link': '',
          decorated: '',
        },
        segment.text
      );
    });
  },
});
