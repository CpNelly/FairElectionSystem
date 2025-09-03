<template>
  <q-page class="results-container q-pa-md">
    <q-card class="q-mb-md header-card">
      <q-card-section class="text-center bg-primary text-white q-py-lg">
        <q-icon name="bar_chart" size="xl" class="q-mb-sm" />
        <div class="text-h4 text-weight-bold">Election Results Overview</div>
        <div class="text-subtitle1 q-mt-sm">
          Detailed breakdown of recent electoral outcomes
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-md bg-white shadow-2 rounded-borders q-mb-lg content-max-width">
      <q-select
        v-model="selectedElectionType"
        :options="electionTypeOptions"
        label="Select Election Type"
        outlined
        dense
        bg-color="white"
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-separator class="q-my-md" />

      <div v-if="!currentElectionResults && selectedElectionType" class="text-center q-py-lg">
        <q-icon name="info" size="xl" color="grey-5" />
        <div class="text-h6 text-grey-6 q-mt-md">No results available for "{{ selectedElectionType }}" yet.</div>
        <div class="text-subtitle1 text-grey-7">Please select another election type.</div>
      </div>

      <div v-else-if="currentElectionResults">
        <div class="text-h5 text-primary q-mb-md text-center">
          Results for {{ currentElectionResults.electionType }} (Total Votes: {{ currentElectionResults.totalVotes.toLocaleString() }})
        </div>

        <div class="row q-col-gutter-lg candidate-results-grid">
          <div
            v-for="candidate in currentElectionResults.candidates"
            :key="candidate.name"
            class="col-xs-12 col-md-6"
          >
            <q-card class="candidate-result-card full-height">
              <q-card-section class="flex items-center">
                <q-avatar size="60px" class="q-mr-md" :style="{ backgroundColor: getPartyColor(candidate.party) }">
                  <q-img :src="candidate.image || 'https://placehold.co/60x60/cccccc/000000?text=C'" />
                </q-avatar>
                <div>
                  <div class="text-h6 text-bold">{{ candidate.name }}</div>
                  <div class="text-subtitle2 text-grey-8">{{ candidate.party }}</div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-body1 text-weight-medium q-mb-sm">
                  Overall Percentage:
                  <span class="text-primary text-h5">{{ candidate.percentage }}%</span>
                </div>
                <q-linear-progress
                  rounded
                  size="20px"
                  :value="candidate.percentage / 100"
                  color="primary"
                  stripe
                  class="q-mt-sm"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary" :label="`${candidate.percentage}%`" />
                  </div>
                </q-linear-progress>

                <div class="text-body2 text-grey-7 q-mt-md">Total Votes: {{ candidate.totalVotes.toLocaleString() }}</div>

                <q-list dense class="q-mt-md regional-votes-list">
                  <q-item-label header class="text-h6">Regional Votes</q-item-label>
                  <q-item v-for="(votes, region) in candidate.regionalVotes" :key="region">
                    <q-item-section>
                      <q-item-label>{{ region }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-medium">{{ votes.toLocaleString() }} votes</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <div class="text-body1 text-weight-medium">
                  Win/Loss Probability:
                  <span
                    :class="getProbabilityColor(candidate.winProbability)"
                    class="text-bold text-h6 q-ml-sm"
                  >
                    {{ candidate.winProbability }}%
                  </span>
                  <q-chip
                    v-if="candidate.winProbability >= 70"
                    color="positive"
                    text-color="white"
                    icon="military_tech"
                    label="High Chance"
                    class="q-ml-sm"
                    size="sm"
                  />
                  <q-chip
                    v-else-if="candidate.winProbability >= 40"
                    color="orange"
                    text-color="white"
                    icon="trending_up"
                    label="Moderate"
                    class="q-ml-sm"
                    size="sm"
                  />
                  <q-chip
                    v-else
                    color="negative"
                    text-color="white"
                    icon="trending_down"
                    label="Low Chance"
                    class="q-ml-sm"
                    size="sm"
                  />
                  <div class="text-caption text-grey-6 q-mt-xs">
                    (Simulated probability based on current data)
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-else class="text-center q-py-xl">
        <q-icon name="poll" size="80px" color="grey-5" />
        <div class="text-h5 text-grey-6 q-mt-md">Select an election type to view results.</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  QPage,
  QCard,
  QCardSection,
  QIcon,
  QSelect,
  QSeparator,
  QLinearProgress,
  QBadge,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar,
  QImg,
  QChip,
} from 'quasar';

const selectedElectionType = ref(null); // Holds the currently selected election type
const electionTypeOptions = ref([
  'Presidential Election 2025',
  'Legislative Election 2026',
  'Senatorial Election 2026',
  'Municipal Election 2027',
  'Past Presidential 2020', // Example of a past election with results
]);

// Mock Results Data
const electionResultsData = ref([
  {
    electionType: 'Presidential Election 2025',
    totalVotes: 8500000,
    candidates: [
      {
        name: 'Nanga Bertrand',
        party: 'Cameroon People\'s Democratic Movement (CPDM)',
        image: 'https://placehold.co/60x60/004d40/ffffff?text=NB',
        totalVotes: 5100000,
        percentage: 60.0,
        regionalVotes: {
          'Centre': 1200000, 'Littoral': 900000, 'West': 800000, 'South': 700000,
          'East': 600000, 'North': 500000, 'Far North': 400000, 'Adamawa': 300000,
          'North-West': 200000, 'South-West': 200000
        },
        winProbability: 85, // Simulated
      },
      {
        name: 'Ndoum Kamdem',
        party: 'Social Democratic Front (SDF)',
        image: 'https://placehold.co/60x60/0288d1/ffffff?text=NK',
        totalVotes: 2550000,
        percentage: 30.0,
        regionalVotes: {
          'North-West': 700000, 'South-West': 600000, 'West': 400000, 'Littoral': 300000,
          'Centre': 200000, 'Adamawa': 150000, 'East': 100000, 'North': 50000,
          'Far North': 50000, 'South': 0
        },
        winProbability: 15, // Simulated
      },
      {
        name: 'Other Candidates',
        party: 'Various',
        image: 'https://placehold.co/60x60/cccccc/000000?text=OC',
        totalVotes: 850000,
        percentage: 10.0,
        regionalVotes: {}, // Not detailed for 'Other'
        winProbability: 5, // Simulated
      }
    ],
  },
  {
    electionType: 'Legislative Election 2026',
    totalVotes: 7000000,
    candidates: [
      {
        name: 'Mbi Yvonne',
        party: 'Social Democratic Front (SDF)',
        image: 'https://placehold.co/60x60/0288d1/ffffff?text=MY',
        totalVotes: 3000000,
        percentage: 42.86,
        regionalVotes: {
          'North-West': 800000, 'South-West': 700000, 'West': 500000, 'Littoral': 400000,
          'Centre': 300000, 'Adamawa': 200000, 'East': 100000, 'North': 0, 'Far North': 0, 'South': 0
        },
        winProbability: 55,
      },
      {
        name: 'Eko David',
        party: 'Cameroon People\'s Democratic Movement (CPDM)',
        image: 'https://placehold.co/60x60/004d40/ffffff?text=ED',
        totalVotes: 3500000,
        percentage: 50.00,
        regionalVotes: {
          'Centre': 900000, 'Littoral': 800000, 'East': 700000, 'South': 600000,
          'West': 300000, 'North': 100000, 'Far North': 100000, 'Adamawa': 100000,
          'North-West': 0, 'South-West': 0
        },
        winProbability: 70,
      },
      {
        name: 'Ayuk Johnson',
        party: 'Cameroon Renaissance Movement (CRM)',
        image: 'https://placehold.co/60x60/689f38/ffffff?text=AJ',
        totalVotes: 500000,
        percentage: 7.14,
        regionalVotes: {
          'South': 200000, 'Centre': 100000, 'Littoral': 100000, 'North-West': 50000,
          'South-West': 50000, 'West': 0, 'East': 0, 'North': 0, 'Far North': 0, 'Adamawa': 0
        },
        winProbability: 10,
      }
    ],
  },
  {
    electionType: 'Senatorial Election 2026',
    totalVotes: 50000, // Electoral college, so fewer votes
    candidates: [
      {
        name: 'Fonjong Laura',
        party: 'Cameroon Renaissance Movement (CRM)',
        image: 'https://placehold.co/60x60/689f38/ffffff?text=FL',
        totalVotes: 28000,
        percentage: 56.0,
        regionalVotes: {
          'South-West': 8000, 'North-West': 6000, 'Centre': 5000, 'Littoral': 4000,
          'West': 3000, 'East': 1000, 'North': 0, 'Far North': 0, 'Adamawa': 0, 'South': 0
        },
        winProbability: 80,
      },
      {
        name: 'Adama Toure',
        party: 'Cameroon People\'s Democratic Movement (CPDM)',
        image: 'https://placehold.co/60x60/004d40/ffffff?text=AT',
        totalVotes: 20000,
        percentage: 40.0,
        regionalVotes: {
          'Centre': 6000, 'Littoral': 5000, 'South': 4000, 'East': 3000,
          'North': 2000, 'Far North': 0, 'Adamawa': 0, 'North-West': 0, 'South-West': 0, 'West': 0
        },
        winProbability: 30,
      },
      {
        name: 'Other Candidates',
        party: 'Various',
        image: 'https://placehold.co/60x60/cccccc/000000?text=OC',
        totalVotes: 2000,
        percentage: 4.0,
        regionalVotes: {},
        winProbability: 5,
      }
    ],
  },
  {
    electionType: 'Municipal Election 2027',
    totalVotes: 6000000,
    candidates: [
      {
        name: 'Abena Pierre',
        party: 'National Union for Democracy and Progress (UNDP)',
        image: 'https://placehold.co/60x60/ffa000/000000?text=AP',
        totalVotes: 2800000,
        percentage: 46.67,
        regionalVotes: {
          'Littoral': 1000000, 'Centre': 800000, 'West': 500000, 'South': 300000,
          'East': 100000, 'North': 50000, 'Far North': 50000, 'Adamawa': 0,
          'North-West': 0, 'South-West': 0
        },
        winProbability: 60,
      },
      {
        name: 'Bello Fatimata',
        party: 'National Union for Democracy and Progress (UNDP)', // Same party as Abena, for municipal example
        image: 'https://placehold.co/60x60/ffa000/000000?text=BF',
        totalVotes: 2500000,
        percentage: 41.67,
        regionalVotes: {
          'Far North': 1200000, 'North': 800000, 'Adamawa': 500000, 'East': 0,
          'Littoral': 0, 'Centre': 0, 'South': 0, 'West': 0, 'North-West': 0, 'South-West': 0
        },
        winProbability: 45,
      },
      {
        name: 'Other Candidates',
        party: 'Various',
        image: 'https://placehold.co/60x60/cccccc/000000?text=OC',
        totalVotes: 700000,
        percentage: 11.66,
        regionalVotes: {},
        winProbability: 10,
      }
    ],
  },
  {
    electionType: 'Past Presidential 2020',
    totalVotes: 7500000,
    candidates: [
      {
        name: 'Former President A',
        party: 'Historical Party X',
        image: 'https://placehold.co/60x60/333333/ffffff?text=FA',
        totalVotes: 6000000,
        percentage: 80.0,
        regionalVotes: {
          'Centre': 1500000, 'Littoral': 1200000, 'West': 1000000, 'South': 800000,
          'East': 700000, 'North': 500000, 'Far North': 300000, 'Adamawa': 0,
          'North-West': 0, 'South-West': 0
        },
        winProbability: 95,
      },
      {
        name: 'Former Opponent B',
        party: 'Historical Party Y',
        image: 'https://placehold.co/60x60/666666/ffffff?text=FO',
        totalVotes: 1500000,
        percentage: 20.0,
        regionalVotes: {
          'North-West': 500000, 'South-West': 400000, 'West': 300000, 'Littoral': 200000,
          'Centre': 100000, 'Adamawa': 0, 'East': 0, 'North': 0, 'Far North': 0, 'South': 0
        },
        winProbability: 5,
      }
    ],
  }
]);

// Computed property to get results for the selected election type
const currentElectionResults = computed(() => {
  return electionResultsData.value.find(
    (results) => results.electionType === selectedElectionType.value
  );
});

// Helper for party colors (can be expanded)
const getPartyColor = (partyName) => {
  switch (partyName) {
    case 'Cameroon People\'s Democratic Movement (CPDM)': return '#004d40';
    case 'Social Democratic Front (SDF)': return '#0288d1';
    case 'National Union for Democracy and Progress (UNDP)': return '#ffa000';
    case 'Cameroon Renaissance Movement (CRM)': return '#689f38';
    case 'Union des Populations du Cameroun (UPC)': return '#e53935';
    default: return '#cccccc'; // Grey for others
  }
};

// Helper for probability text color
const getProbabilityColor = (probability) => {
  if (probability >= 70) return 'text-positive';
  if (probability >= 40) return 'text-orange';
  return 'text-negative';
};

onMounted(() => {
  // Optionally pre-select the first election type
  if (electionTypeOptions.value.length > 0) {
    selectedElectionType.value = electionTypeOptions.value[0];
  }
});
</script>

<style lang="scss" scoped>
.results-container {
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
}

.content-max-width {
  max-width: 1200px;
  margin: 0 auto;
}

.header-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.candidate-results-grid {
  margin: 0 auto; /* Center the grid */
  max-width: 1200px; /* Match content-max-width */
}

.candidate-result-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Ensure cards in a row have equal height */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .q-avatar {
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .regional-votes-list {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
  }
  .regional-votes-list .q-item-label--header {
    padding-bottom: 5px;
  }
}

/* Responsive adjustments */
@media (max-width: $breakpoint-sm-max) {
  .header-card .text-h4 {
    font-size: 1.8rem;
  }
  .header-card .text-subtitle1 {
    font-size: 0.9rem;
  }
  .q-pa-md {
    padding: 1rem !important;
  }
}
</style>
