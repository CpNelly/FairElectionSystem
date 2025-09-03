<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  QPage,
  QCard,
  QCardSection,
  QExpansionItem,
  QIcon,
  QChip,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSeparator,
  QBtn,
  QDialog,
  QToolbar,
  QToolbarTitle,
  QAvatar,
} from 'quasar';
import CountdownTimer from '../../components/CountdownTimer.vue'; // Import the new component

const router = useRouter();

// State for the pop-up
const showCandidatesDialog = ref(false);
const selectedElection = ref(null);

// Mock data for election types and details (based on Cameroon's system)
const elections = ref([
  {
    type: 'Presidential',
    description: 'The President of Cameroon is elected for a seven-year term by popular vote. This election determines the head of state.',
    nextElectionDate: 'October 20, 2025 12:00:00',
    term: '7 years',
    voterEligibility: '20 years of age or older, Cameroonian citizen, registered voter.',
    candidateEligibility: '35 years of age or older, Cameroonian by birth, resident in Cameroon, meet other legal requirements.',
    status: 'Upcoming',
    specifics: [
      'Single-round ballot system.',
      'Two-term limit removed in 2008.',
    ],
    candidates: [
      { name: 'Paul Biya', party: 'CPDM', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Maurice Kamto', party: 'MRC', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Cabral Libii', party: 'PCRN', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Osih Joshua', party: 'SDF', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
    ],
    linkToDetails: '/electoral-code#presidential',
  },
  {
    type: 'Legislative',
    description: 'Members of the National Assembly are elected for a five-year term in single and multi-seat constituencies. They form the lower house of Parliament.',
    nextElectionDate: 'February 20, 2026 12:00:00',
    term: '5 years',
    voterEligibility: '20 years of age or older, Cameroonian citizen, registered voter.',
    candidateEligibility: '23 years of age or older, Cameroonian citizen, able to read/write French or English, nominated by a political party.',
    status: 'Upcoming',
    specifics: [
      'Mixed single-round ballot system (majority and proportional representation).',
      'Lists gaining less than 5% of votes are not eligible for proportional distribution.',
    ],
    candidates: [
      { name: 'Candidate 1', party: 'CPDM', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Candidate 2', party: 'MRC', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
      { name: 'Candidate 3', party: 'SDF', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
    ],
    linkToDetails: '/electoral-code#legislative',
  },
  {
    type: 'Senatorial',
    description: 'The Senate has 100 members serving five-year terms. 70 are indirectly elected by regional councils, and 30 are appointed by the President.',
    nextElectionDate: 'March 20, 2026 12:00:00',
    term: '5 years',
    voterEligibility: 'Regional or municipal councillor (for elected senators), Cameroonian nationality, resident for 6+ months in constituency.',
    candidateEligibility: '40 years of age or older, Cameroonian by birth, full civil and political rights, resident in the region (for elected senators).',
    status: 'Upcoming',
    specifics: [
      'Mixed electoral system: indirect election and presidential appointment.',
      '10 multi-member constituencies (7 seats each).',
    ],
    candidates: [], // No mock candidates for senatorial elections
    linkToDetails: '/electoral-code#senatorial',
  },
  {
    type: 'Municipal',
    description: 'Elections for municipal councillors at the local level. These elections address local governance and community representation.',
    nextElectionDate: null,
    term: '5 years',
    voterEligibility: '20 years of age or older, Cameroonian citizen, registered voter in the municipality.',
    candidateEligibility: 'Meets general legislative eligibility, typically resident in the municipality.',
    status: 'Pending',
    specifics: [
      'Directly impacts local administration and development.',
    ],
    candidates: null,
    linkToDetails: '/electoral-code#municipal',
  },
]);

// Helper function to get icon based on election type
const getElectionIcon = (type) => {
  switch (type) {
    case 'Presidential':
      return 'person';
    case 'Legislative':
      return 'people';
    case 'Senatorial':
      return 'meeting_room';
    case 'Municipal':
      return 'location_city';
    default:
      return 'flag';
  }
};

// Helper functions for chip colors based on status
const getChipColor = (status) => {
  switch (status) {
    case 'Upcoming':
      return 'orange-2';
    case 'Active':
      return 'green-2';
    case 'Past':
      return 'grey-4';
    case 'Pending':
      return 'blue-2';
    default:
      return 'grey-2';
  }
};

const getChipTextColor = (status) => {
  switch (status) {
    case 'Upcoming':
      return 'orange-9';
    case 'Active':
      return 'green-9';
    case 'Past':
      return 'grey-9';
    case 'Pending':
      return 'blue-9';
    default:
      return 'grey-9';
  }
};

// Function to handle opening the candidates dialog
const viewCandidates = (election) => {
  selectedElection.value = election;
  showCandidatesDialog.value = true;
};

// Function to handle navigation
const goToPage = (path) => {
  if (path) {
    router.push(path);
  }
};
</script>

<template>
  <q-page class="election-details-container q-pa-md">
    <q-card class="q-mb-md header-card">
      <q-card-section class="text-center bg-primary text-white q-py-lg">
        <q-icon name="how_to_vote" size="xl" class="q-mb-sm" />
        <div class="text-h4 text-weight-bold">Election Types & Details</div>
        <div class="text-subtitle1 q-mt-sm">
          Understanding the electoral landscape of Cameroon
        </div>
      </q-card-section>
    </q-card>

    <div class="q-gutter-md content-max-width">
      <q-expansion-item
        v-for="election in elections"
        :key="election.type"
        :label="election.type + ' Elections'"
        :icon="getElectionIcon(election.type)"
        class="no-shadow rounded-borders election-expansion-item"
        header-class="text-weight-bold text-primary"
        expand-icon-class="text-primary"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon :name="getElectionIcon(election.type)" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ election.type }} Elections</q-item-label>
            <q-item-label caption>
              <q-chip
                :color="getChipColor(election.status)"
                :text-color="getChipTextColor(election.status)"
                dense
                class="q-ml-sm"
              >
                {{ election.status }}
              </q-chip>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <CountdownTimer :electionDate="election.nextElectionDate" />
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <p class="text-body1">{{ election.description }}</p>

            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Term Length:</q-item-label>
                  <q-item-label class="text-weight-medium">{{ election.term }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Voter Eligibility:</q-item-label>
                  <q-item-label class="text-weight-medium">{{ election.voterEligibility }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Candidate Eligibility:</q-item-label>
                  <q-item-label class="text-weight-medium">{{ election.candidateEligibility }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="election.specifics && election.specifics.length">
                <q-item-section>
                  <q-item-label caption>Specifics:</q-item-label>
                  <q-item-label class="text-weight-medium">
                    <ul>
                      <li v-for="(spec, index) in election.specifics" :key="index">{{ spec }}</li>
                    </ul>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator class="q-my-md" />

            <div class="row q-gutter-sm justify-end">
              <q-btn
                v-if="election.candidates && election.candidates.length > 0"
                color="secondary"
                label="View Candidates"
                icon="group"
                @click="viewCandidates(election)"
                outline
              />
              <q-btn
                v-if="election.linkToDetails"
                color="accent"
                label="Full Details"
                icon="article"
                @click="goToPage(election.linkToDetails)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <q-dialog v-model="showCandidatesDialog">
      <q-card class="candidate-dialog">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-weight-bold">
            Candidates for {{ selectedElection ? selectedElection.type : '' }} Elections
          </q-toolbar-title>
          <q-btn flat round icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pa-md">
          <q-list separator>
            <q-item v-for="candidate in selectedElection?.candidates" :key="candidate.name">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="candidate.imageUrl" alt="Candidate Avatar">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ candidate.name }}</q-item-label>
                <q-item-label caption>{{ candidate.party }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="!selectedElection?.candidates || selectedElection.candidates.length === 0">
              <q-item-section>
                <q-item-label class="text-italic text-grey">
                  No candidates announced yet for this election.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style lang="scss" scoped>
.election-details-container {
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
}

.content-max-width {
  max-width: 900px;
  margin: 0 auto;
}

.header-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.election-expansion-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
  }

  .q-card-section {
    padding: 1.5rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.3rem;
  }
}

.candidate-dialog {
  min-width: 350px;
  max-width: 600px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
