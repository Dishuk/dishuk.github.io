<template>
  <div>
    <p>
      <ExternalLink v-if="websiteLink" :address="websiteLink" :label="companyName" />
      <span v-else>{{ companyName }}</span>
    </p>
    <p>{{workType}}</p>
    <p>{{data.formattedStart}} – {{data.formattedEnd}}</p>
    <p><span v-if="data.yrs > 0">{{data.yrs}} {{data.yrs === 1? 'yr': 'yrs'}}</span> <span v-if="data.mos > 0">{{data.mos}} {{data.mos === 1? 'mo': 'mos'}}</span></p>
    <p v-if="websiteLink || linkedinLink" class="t-icon-links">
      <a v-if="websiteLink" basics-link decorated :href="websiteLink" target="_blank" rel="noopener noreferrer"><Link class="t-icon" aria-hidden="true" />Website</a>
      <a v-if="linkedinLink" basics-link decorated :href="linkedinLink" target="_blank" rel="noopener noreferrer"><LinkedIn class="t-icon" aria-hidden="true" />LinkedIn</a>
    </p>
  </div>
</template>

<script setup lang="ts">
  import type { CompanyExperienceData } from './types'
  import { LinkedIn, Link } from "@/components/icons"
  import { ExternalLink } from "@/components/external-link"

  defineProps<{
    companyName: string;
    data: CompanyExperienceData,
    websiteLink?: string,
    linkedinLink?: string,
    workType: string
  }>();
</script>
