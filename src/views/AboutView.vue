<template>
  <article class="content" basics-section>
    <div basics-prose>
      <h1 class="t-title">About me</h1>
      <p basics-text>
        Hi, I'm Dmytro.
      </p>
      <p>A {{ age }}-year-old software engineer from Ukraine.</p>
      <EuropeMap />
    </div>
    <div basics-prose>
      <p basics-text>
        Started coding in 2018 and became a full-time engineer in Q2 2021. I began as a full-stack engineer focused on
        frontend development, then switched to mobile and BLE. Strong in technical aspects, though not as skilled at
        creating stunning visuals.
      </p>
      <p basics-text>
        Quick to learn and adapt to a wide range of technologies, with strong knowledge across various areas of
        development. However, I'm still gaining the experience needed to be considered an expert in any one specific
        field.
      </p>
      <p basics-text>
        Passionate about unique projects, especially those involving real-world devices, with a desire to focus more on
        IoT and embedded development.
      </p>
    </div>

    <div basics-prose>
      <p class="t-label">Languages</p>
      <div basic-list>
        <p>
          Ukrainian (native)
        </p>
        <p>
          English (B2)
        </p>
      </div>
    </div>

    <div basics-prose>
      <p class="t-label">Career overview</p>
      <div basic-list>
        <CompanyExperience v-for="role in career" :key="role.company + role.start" :companyName="role.company"
          :data="role.data" :websiteLink="role.websiteLink" :linkedinLink="role.linkedinLink"
          :workType="role.workType" />
      </div>
    </div>

  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CompanyExperience } from "@/components/company-experience"
import { EuropeMap } from "@/components/europe-map"
import { Links } from '@/utils/LinksUtils';
import type { CompanyExperienceData } from '@/components/company-experience/types';

interface CareerRole {
  company: string;
  workType: string;
  start: string;
  end: string | null;
  websiteLink?: string;
  linkedinLink?: string;
}

const BIRTH_DATE = '1998-04-08';
const MONTHS_PER_YEAR = 12;

const career: CareerRole[] = [
  {
    company: 'Self-Employed',
    workType: 'Remote (Contractor)',
    start: '2025-12',
    end: null,
  },
  {
    company: 'Qualium Systems',
    workType: 'Remote (Full-Time)',
    start: '2022-09',
    end: '2025-11',
    websiteLink: Links.qualiumSystems,
    linkedinLink: Links.qualiumSystems_linkedIn,
  },
  {
    company: 'Nexat',
    workType: 'Remote (Contractor)',
    start: '2022-09',
    end: '2022-12',
    websiteLink: Links.nexat,
    linkedinLink: Links.nexat_linkedIn,
  },
  {
    company: 'Nexat',
    workType: 'Remote / Office / Field (Full-Time)',
    start: '2021-05',
    end: '2022-08',
    websiteLink: Links.nexat,
    linkedinLink: Links.nexat_linkedIn,
  },
];

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function parseMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number);

  return new Date(year, month - 1, 1);
}

function calculateExperience(role: CareerRole): CompanyExperienceData {
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };

  const start = parseMonth(role.start);
  const formattedStart = start.toLocaleString('en-US', options);

  let formattedEnd = 'Present';
  let end = new Date();

  if (role.end) {
    end = parseMonth(role.end);
    formattedEnd = end.toLocaleString('en-US', options);
  }

  const months = (end.getFullYear() - start.getFullYear()) * MONTHS_PER_YEAR + end.getMonth() - start.getMonth() + 1;
  const yrs = Math.floor(months / MONTHS_PER_YEAR);
  const mos = months % MONTHS_PER_YEAR;

  return { formattedStart, formattedEnd, yrs, mos };
}

export default defineComponent({
  name: 'AboutView',
  components: {
    CompanyExperience,
    EuropeMap
  },
  computed: {
    age(): number {
      return calculateAge(BIRTH_DATE);
    },
    career(): Array<CareerRole & { data: CompanyExperienceData }> {
      return career.map(role => ({ ...role, data: calculateExperience(role) }));
    }
  }
});
</script>
