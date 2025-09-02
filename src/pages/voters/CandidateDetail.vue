<template>
  <q-page class="candidate-detail-container q-pa-md">
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
      <div class="text-primary q-mt-md">Loading candidate details...</div>
    </q-inner-loading>

    <q-card v-if="candidate" class="candidate-detail-card content-max-width">
      <q-card-section class="bg-primary text-white text-center q-py-lg">
        <q-img
          :src="candidate.image"
          :alt="candidate.name"
          class="candidate-detail-image q-mb-md"
          ratio="1"
          style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; border: 4px solid white;"
        />
        <div class="text-h4 text-weight-bold">{{ candidate.name }}</div>
        <div class="text-subtitle1 q-mt-sm">{{ candidate.slogan }}</div>
      </q-card-section>

      <q-card-section class="q-pt-lg q-pb-md">
        <div class="text-h6 text-primary q-mb-md">
          <q-icon name="info" class="q-mr-sm" />Candidate Overview
        </div>
        <p class="text-body1">{{ candidate.bio }}</p>

        <q-list bordered separator class="q-mt-lg">
          <q-item>
            <q-item-section avatar>
              <q-icon name="flag" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Political Party</q-item-label>
              <q-item-label class="text-weight-medium">{{ candidate.party }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="how_to_vote" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Election Type</q-item-label>
              <q-item-label class="text-weight-medium">{{ candidate.electionType }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="location_on" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Representing Region</q-item-label>
              <q-item-label class="text-weight-medium">{{ candidate.region }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div v-if="candidate.platformPoints && candidate.platformPoints.length" class="q-mt-xl">
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="lightbulb" class="q-mr-sm" />Key Platform Points
          </div>
          <q-list bordered separator>
            <q-item v-for="(point, index) in candidate.platformPoints" :key="index">
              <q-item-section avatar>
                <q-icon name="check_box" color="accent" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ point }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions align="left" class="q-pa-md">
        <q-btn flat color="primary" icon="arrow_back" label="Back to Candidates" @click="router.go(-1)" />
        <q-space />
        <!-- Vote Button -->
        <q-btn color="green-7" icon="how_to_vote" label="Vote Now" @click="voteCandidate(candidate)" class="q-mr-sm" />
        <!-- Share Button -->
        <q-btn color="accent" icon="share" label="Share" @click="shareCandidate(candidate)" />
      </q-card-actions>
    </q-card>

    <div v-if="!candidate && !isLoading" class="col-12 text-center q-py-xl">
      <q-icon name="error_outline" size="80px" color="red-5" />
      <div class="text-h5 text-red-6 q-mt-md">Candidate not found.</div>
      <q-btn label="Back to Candidates" color="primary" flat class="q-mt-md" @click="router.go(-1)" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  QPage,
  QCard,
  QCardSection,
  QCardActions,
  QBtn,
  QIcon,
  QImg,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInnerLoading,
  QSpinnerGears,
  useQuasar,
  QSpace // Added QSpace for button alignment
} from 'quasar';

const route = useRoute(); // To access route parameters
const router = useRouter(); // To navigate back
const $q = useQuasar(); // For notifications/loading

const candidate = ref(null);
const isLoading = ref(true);

// This is the same mock data as in CandidatesView.vue.
// In a real application, you would typically fetch this from an API
// endpoint like `/api/candidates/${id}`.
const allCandidatesData = [
  {
    id: 'cand001',
    name: 'Nanga Bertrand',
    party: 'Cameroon People\'s Democratic Movement (CPDM)',
    electionType: 'Presidential',
    region: 'Centre',
    slogan: 'Unity, Work, Fatherland',
    image: 'https://placehold.co/150x150/004d40/ffffff?text=NB',
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

const fetchCandidateDetails = (candidateId) => {
  isLoading.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundCandidate = allCandidatesData.find(c => c.id === candidateId);
      candidate.value = foundCandidate;
      isLoading.value = false;
      resolve(foundCandidate);
    }, 500); // Simulate network delay
  });
};

onMounted(() => {
  // Get candidate ID from route parameters
  const candidateId = route.params.id;
  if (candidateId) {
    fetchCandidateDetails(candidateId);
  } else {
    $q.notify({
      message: 'No candidate ID provided in the URL.',
      color: 'negative',
      icon: 'warning',
    });
    isLoading.value = false;
  }
});

// Function to handle sharing candidate details
const shareCandidate = (candidate) => {
  const shareText = `Learn more about ${candidate.name} (${candidate.party}) running for ${candidate.electionType} elections: ${window.location.href}`;
  if (navigator.share) {
    navigator.share({
      title: `Candidate: ${candidate.name}`,
      text: shareText,
      url: window.location.href,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    // Fallback for browsers that don't support navigator.share
    // Copy to clipboard
    const el = document.createElement('textarea');
    el.value = shareText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    $q.notify({
      message: `Link for ${candidate.name} copied to clipboard!`,
      caption: shareText,
      color: 'positive',
      icon: 'content_copy',
    });
  }
};

// Function to simulate voting for a candidate
const voteCandidate = (candidate) => {
  $q.loading.show({
    message: `Casting your vote for ${candidate.name}...`,
    spinner: QSpinnerGears,
    spinnerColor: 'primary',
  });

  setTimeout(() => {
    $q.loading.hide();
    const isSuccess = Math.random() > 0.3; // 70% chance of success

    if (isSuccess) {
      $q.dialog({
        title: 'Vote Cast Successfully!',
        message: `Your vote for ${candidate.name} has been successfully recorded. Thank you for participating!`,
        ok: {
          label: 'Awesome!',
          color: 'primary',
          flat: true
        },
        icon: 'check_circle',
        color: 'green',
        html: false
      });
    } else {
      $q.dialog({
        title: 'Vote Failed',
        message: `Apologies, your vote for ${candidate.name} could not be recorded at this time. Please try again later or contact support.`,
        ok: {
          label: 'Got It',
          color: 'negative',
          flat: true
        },
        icon: 'cancel',
        color: 'red',
        html: false
      });
    }
  }, 2000); // Simulate 2-second API call
};
</script>

<style lang="scss" scoped>
.candidate-detail-container {
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to top */
  min-height: calc(100vh - 100px); /* Adjust based on your topbar/footer height */
  padding-top: 2rem;
}

.content-max-width {
  max-width: 800px;
  width: 100%;
}

.candidate-detail-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.candidate-detail-image {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.q-list {
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
}

/* Responsive adjustments */
@media (max-width: $breakpoint-sm-max) {
  .candidate-detail-container {
    padding-top: 1rem;
  }
  .candidate-detail-card {
    margin-bottom: 1rem;
  }
  .candidate-detail-image {
    width: 100px !important;
    height: 100px !important;
  }
  .candidate-detail-card .text-h4 {
    font-size: 1.8rem;
  }
  .candidate-detail-card .text-subtitle1 {
    font-size: 0.9rem;
  }
  .candidate-detail-card .text-h6 {
    font-size: 1.2rem;
  }
}
</style>
