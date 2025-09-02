<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Now explicitly used for navigation
import { QPage, QCard, QCardSection, QCardActions, QBtn, QIcon, QImg, QSelect, QInput, QList, QItem, QItemSection, QItemLabel, QInnerLoading, QSpinnerGears, QTooltip, useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const allCandidates = ref([]);
const isLoading = ref(true);

const filter = ref({
  electionType: null,
  party: null,
  region: null,
});
const searchQuery = ref('');

const electionTypeOptions = ref([
  'Presidential',
  'Legislative',
  'Senatorial',
  'Municipal',
]);
const partyOptions = ref([
  'Cameroon People\'s Democratic Movement (CPDM)',
  'Social Democratic Front (SDF)',
  'National Union for Democracy and Progress (UNDP)',
  'Cameroon Renaissance Movement (CRM)',
  'Union des Populations du Cameroun (UPC)',
]);
const regionOptions = ref([
  'Adamawa', 'Centre', 'East', 'Far North', 'Littoral',
  'North', 'North-West', 'South', 'South-West', 'West',
]);

const fetchCandidates = () => {
  isLoading.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCandidates = [
        {
          id: 'cand001',
          name: 'Nanga Bertrand',
          party: 'Cameroon People\'s Democratic Movement (CPDM)',
          electionType: 'Presidential',
          region: 'Centre',
          slogan: 'Unity, Work, Fatherland',
          image: 'https://placehold.co/150x150/004d40/ffffff?text=NB', // Placeholder
          bio: 'Nanga Bertrand has been a steadfast advocate for economic development and national unity. With over 20 years in public service, he aims to streamline administrative processes and boost local industries.',
          platformPoints: [
            'Economic diversification and job creation.',
            'Strengthening national security.',
            'Improving healthcare access and quality.',
            'Investing in education and youth empowerment.',
          ],
        },
        {
          id: 'cand002',
          name: 'Mbi Yvonne',
          party: 'Social Democratic Front (SDF)',
          electionType: 'Legislative',
          region: 'North-West',
          slogan: 'For a New Cameroon',
          image: 'https://placehold.co/150x150/0288d1/ffffff?text=MY',
          bio: 'Mbi Yvonne is a passionate human rights lawyer committed to reforming the justice system and ensuring equitable representation. Her campaign focuses on transparency and accountability.',
          platformPoints: [
            'Judicial reform and rule of law.',
            'Promoting freedom of expression.',
            'Supporting small and medium enterprises.',
            'Environmental protection and sustainable practices.',
          ],
        },
        {
          id: 'cand003',
          name: 'Abena Pierre',
          party: 'National Union for Democracy and Progress (UNDP)',
          electionType: 'Municipal',
          region: 'Littoral',
          slogan: 'Local Progress Now',
          image: 'https://placehold.co/150x150/ffa000/000000?text=AP',
          bio: 'Abena Pierre is a community organizer with a vision for vibrant and inclusive cities. He believes in grassroots development and empowering local communities to shape their future.',
          platformPoints: [
            'Improving urban infrastructure (roads, sanitation).',
            'Enhancing public spaces and green areas.',
            'Supporting local markets and small businesses.',
            'Community-led security initiatives.',
          ],
        },
        {
          id: 'cand004',
          name: 'Fonjong Laura',
          party: 'Cameroon Renaissance Movement (CRM)',
          electionType: 'Senatorial',
          region: 'South-West',
          slogan: 'True Change for All',
          image: 'https://placehold.co/150x150/689f38/ffffff?text=FL',
          bio: 'Fonjong Laura is an academic and policy expert focused on legislative reforms that address social inequalities and regional disparities. She advocates for a more inclusive and just society.',
          platformPoints: [
            'Constitutional reforms for decentralization.',
            'Strengthening parliamentary oversight.',
            'Gender equality and women\'s empowerment.',
            'Ensuring youth participation in governance.',
          ],
        },
        {
          id: 'cand005',
          name: 'Eko David',
          party: 'Cameroon People\'s Democratic Movement (CPDM)',
          electionType: 'Legislative',
          region: 'East',
          slogan: 'Stability and Growth',
          image: 'https://placehold.co/150x150/004d40/ffffff?text=ED',
          bio: 'Eko David is an experienced legislator passionate about rural development and agricultural transformation. He seeks to implement policies that uplift farmers and strengthen food security.',
          platformPoints: [
            'Modernization of agriculture and rural infrastructure.',
            'Access to credit for farmers.',
            'Conservation of natural resources.',
            'Expansion of basic services in rural areas.',
          ],
        },
        {
          id: 'cand006',
          name: 'Ndoum Kamdem',
          party: 'Social Democratic Front (SDF)',
          electionType: 'Presidential',
          region: 'West',
          slogan: 'Justice and Equity',
          image: 'https://placehold.co/150x150/0288d1/ffffff?text=NK',
          bio: 'Ndoum Kamdem is a prominent opposition figure known for his fiery speeches and commitment to democratic ideals. He champions good governance, anti-corruption, and a fairer distribution of national wealth.',
          platformPoints: [
            'Combating corruption and promoting transparency.',
            'Electoral reforms for free and fair elections.',
            'Strengthening democratic institutions.',
            'Promoting national dialogue and reconciliation.',
          ],
        },
         {
          id: 'cand007',
          name: 'Bello Fatimata',
          party: 'National Union for Democracy and Progress (UNDP)',
          electionType: 'Municipal',
          region: 'Far North',
          slogan: 'Community First',
          image: 'https://placehold.co/150x150/ffa000/000000?text=BF',
          bio: 'Bello Fatimata is a dedicated educator and community leader focused on improving educational standards and promoting cultural diversity at the local level. She believes in fostering strong community bonds.',
          platformPoints: [
            'Improving local schools and educational resources.',
            'Promoting sanitation and public health.',
            'Supporting local arts and culture.',
            'Enhancing community safety programs.',
          ],
        },
        {
          id: 'cand008',
          name: 'Ayuk Johnson',
          party: 'Cameroon Renaissance Movement (CRM)',
          electionType: 'Legislative',
          region: 'South',
          slogan: 'A Brighter Tomorrow',
          image: 'https://placehold.co/150x150/689f38/ffffff?text=AJ',
          bio: 'Ayuk Johnson is a youth activist and entrepreneur advocating for policies that create opportunities for young Cameroonians. He focuses on innovation, technology, and employment.',
          platformPoints: [
            'Promoting tech innovation and digital literacy.',
            'Creating youth employment initiatives.',
            'Facilitating access to startup funding.',
            'Advocating for digital rights and internet access.',
          ],
        },
      ];
      allCandidates.value = mockCandidates;
      isLoading.value = false;
      resolve();
    }, 1000); // Simulate network delay
  });
};

onMounted(() => {
  fetchCandidates();
});

const filteredCandidates = computed(() => {
  let tempCandidates = allCandidates.value;

  if (filter.value.electionType) {
    tempCandidates = tempCandidates.filter(
      (cand) => cand.electionType === filter.value.electionType
    );
  }

  if (filter.value.party) {
    tempCandidates = tempCandidates.filter(
      (cand) => cand.party === filter.value.party
    );
  }

  if (filter.value.region) {
    tempCandidates = tempCandidates.filter(
      (cand) => cand.region === filter.value.region
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tempCandidates = tempCandidates.filter(
      (cand) =>
        cand.name.toLowerCase().includes(query) ||
        cand.slogan.toLowerCase().includes(query)
    );
  }

  return tempCandidates;
});

const clearFilters = () => {
  filter.value.electionType = null;
  filter.value.party = null;
  filter.value.region = null;
  searchQuery.value = '';
};

const viewCandidateDetails = (candidate) => {
  // Navigate to the new CandidateDetailView, passing the candidate ID
  router.push({ name: 'CandidateDetail', params: { id: candidate.id } });
};

const shareCandidate = (candidate) => {
  const shareText = `Check out ${candidate.name} (${candidate.party}) running for ${candidate.electionType} elections! Slogan: "${candidate.slogan}" #CameroonElections`;
  if (navigator.share) {
    navigator.share({
      title: 'Electoral Candidate',
      text: shareText,
      url: window.location.href,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    $q.notify({
      message: `Copied share text for ${candidate.name} to clipboard!`,
      caption: shareText,
      color: 'positive',
      icon: 'content_copy',
    });
    const el = document.createElement('textarea');
    el.value = shareText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

const voteCandidate = (candidate) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert(`You have voted for ${candidate.name}!`);

  }, 2000);
};
</script>


<template>
  <q-page class="electoral-candidates-container q-pa-md">
    <q-card class="q-mb-md header-card">
      <q-card-section class="text-center bg-primary text-white q-py-lg">
        <q-icon name="groups" size="xl" class="q-mb-sm" />
        <div class="text-h4 text-weight-bold">Electoral Candidates</div>
        <div class="text-subtitle1 q-mt-sm">
          Discover candidates for upcoming elections in Cameroon
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-md bg-white shadow-2 rounded-borders q-mb-lg content-max-width">
      <div class="row q-col-gutter-md">
        <!-- Filter by Election Type -->
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-select
            v-model="filter.electionType"
            :options="electionTypeOptions"
            label="Filter by Election Type"
            clearable
            outlined
            dense
            bg-color="white"
            @update:model-value="applyFilters"
          >
            <template v-slot:prepend>
              <q-icon name="how_to_vote" />
            </template>
          </q-select>
        </div>

        <!-- Filter by Party -->
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-select
            v-model="filter.party"
            :options="partyOptions"
            label="Filter by Political Party"
            clearable
            outlined
            dense
            bg-color="white"
            @update:model-value="applyFilters"
          >
            <template v-slot:prepend>
              <q-icon name="flag" />
            </template>
          </q-select>
        </div>

        <!-- Filter by Region -->
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-select
            v-model="filter.region"
            :options="regionOptions"
            label="Filter by Region"
            clearable
            outlined
            dense
            bg-color="white"
            @update:model-value="applyFilters"
          >
            <template v-slot:prepend>
              <q-icon name="location_on" />
            </template>
          </q-select>
        </div>

        <!-- Search Input -->
        <div class="col-xs-12 col-sm-6 col-md-8">
          <q-input
            v-model="searchQuery"
            label="Search by Name or Slogan"
            clearable
            outlined
            dense
            bg-color="white"
            @update:model-value="applyFilters"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- Clear Filters Button -->
        <div class="col-xs-12 col-sm-auto">
          <q-btn
            label="Clear Filters"
            icon="clear_all"
            color="grey-7"
            flat
            dense
            class="q-mt-sm q-px-md"
            @click="clearFilters"
          />
        </div>
      </div>
    </div>

    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
      <div class="text-primary q-mt-md">Loading candidates...</div>
    </q-inner-loading>

    <div v-if="!isLoading" class="row q-col-gutter-lg candidate-grid">
      <div
        v-for="candidate in filteredCandidates"
        :key="candidate.id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="candidate-card q-hoverable full-height">
          <q-img :src="candidate.image" :alt="candidate.name" ratio="1" class="candidate-image" />

          <q-card-section class="text-center">
            <div class="text-h6 text-bold text-primary q-mb-xs">{{ candidate.name }}</div>
            <div class="text-subtitle2 text-grey-8">{{ candidate.slogan }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-body2">
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="how_to_vote" color="accent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium"
                    >Election Type: {{ candidate.electionType }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="flag" color="accent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium"
                    >Party: {{ candidate.party }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="location_on" color="accent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium"
                    >Region: {{ candidate.region }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="right">
            <!-- Vote Button -->
            <q-btn flat round color="green-7" icon="how_to_vote" @click="voteCandidate(candidate)">
              <q-tooltip>Vote for {{ candidate.name }}</q-tooltip>
            </q-btn>

            <q-btn flat round color="primary" icon="visibility" @click="viewCandidateDetails(candidate)">
              <q-tooltip>View Details</q-tooltip>
            </q-btn>
            <q-btn flat round color="accent" icon="share" @click="shareCandidate(candidate)">
              <q-tooltip>Share</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div v-if="filteredCandidates.length === 0 && !isLoading" class="col-12 text-center q-py-xl">
        <q-icon name="sentiment_dissatisfied" size="80px" color="grey-5" />
        <div class="text-h5 text-grey-6 q-mt-md">No candidates match your criteria.</div>
        <q-btn label="Reset Filters" color="primary" flat class="q-mt-md" @click="clearFilters" />
      </div>
    </div>
  </q-page>
</template>



<style lang="scss" scoped>
.electoral-candidates-container {
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

.candidate-grid {
  margin: 0 auto;
  max-width: 1200px;
}

.candidate-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .candidate-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .q-card-section {
    padding-bottom: 8px;
  }

  .q-list {
    padding: 0 16px;
  }

  .q-item {
    min-height: 36px;
  }

  .q-item-section--avatar {
    min-width: 32px;
  }

  .q-card-actions {
    padding: 8px 16px 16px 16px;
  }
}

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
