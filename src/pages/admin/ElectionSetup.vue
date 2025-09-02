<script setup lang="ts">
import HeaderCard from 'src/components/cards/HeaderCard.vue';
import { onMounted, ref, watchEffect} from 'vue'
import { useRouter } from 'vue-router';
import CountdownTimer from 'src/components/CountdownTimer.vue';
import { useQuasar } from 'quasar';
import DeleteDialog from 'src/components/dialogs/DeleteDialog.vue';

const $q = useQuasar();

const router = useRouter();

const electionTypes = [
  'All',
  'Presidential',
  'Legislative',
  'Municipal',
]

const regionOptions = [
  'North West',
  'South',
  'East',
  'West',
  'Litoral',
  'Centre',
  'North',
  'South-West',
  'Adamawa',
  'Far North'
];

const elections = ref([
  {
    id: 1,
    type: 'Presidential',
    description: 'The President of Cameroon is elected for a seven-year term by popular vote. This election determines the head of state.',
    electionDate: '2025-10-08',
    nextElectionDate: 'October 20, 2025 12:00:00',
    voterRegistrationStartDate: '2025-09-19',
    voterRegistrationEndDate: '2025-10-07',
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
    regionsInvolved: [
      ...regionOptions
    ],
    linkToDetails: '/electoral-code#presidential',
  },
  {
    id: 2,
    type: 'Legislative',
    description: 'Members of the National Assembly are elected for a five-year term in single and multi-seat constituencies. They form the lower house of Parliament.',
    electionDate: 'October 08, 2025',
    nextElectionDate: 'February 20, 2026 12:00:00',
    voterRegistrationStartDate: '2025-09-19',
    voterRegistrationEndDate: '2025-10-07',
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
    regionsInvolved: [
      ...regionOptions
    ],
    linkToDetails: '/electoral-code#legislative',
  },
  {
    id: 3,
    type: 'Senatorial',
    description: 'The Senate has 100 members serving five-year terms. 70 are indirectly elected by regional councils, and 30 are appointed by the President.',
    electionDate: 'October 08, 2025',
    nextElectionDate: 'March 20, 2026 12:00:00',
    voterRegistrationStartDate: '2025-09-19',
    voterRegistrationEndDate: '2025-10-07',
    term: '5 years',
    voterEligibility: 'Regional or municipal councillor (for elected senators), Cameroonian nationality, resident for 6+ months in constituency.',
    candidateEligibility: '40 years of age or older, Cameroonian by birth, full civil and political rights, resident in the region (for elected senators).',
    status: 'Upcoming',
    specifics: [
      'Mixed electoral system: indirect election and presidential appointment.',
      '10 multi-member constituencies (7 seats each).',
    ],
    regionsInvolved: [
      ...regionOptions
    ],
    candidates: [], // No mock candidates for senatorial elections
    linkToDetails: '/electoral-code#senatorial',
  },
  {
    id: 4,
    type: 'Municipal',
    description: 'Elections for municipal councillors at the local level. These elections address local governance and community representation.',
    electionDate: 'October 08, 2025',
    nextElectionDate: null,
    voterRegistrationStartDate: '2025-09-19',
    voterRegistrationEndDate: '2025-10-07',
    term: '5 years',
    voterEligibility: '20 years of age or older, Cameroonian citizen, registered voter in the municipality.',
    candidateEligibility: 'Meets general legislative eligibility, typically resident in the municipality.',
    status: 'Pending',
    specifics: [
      'Directly impacts local administration and development.',
    ],
    candidates: null,
    regionsInvolved: [
      ...regionOptions
    ],
    linkToDetails: '/electoral-code#municipal',
  },
]);

const availableCandidates = [
  { id: 1, name: 'Paul Biya', party: 'CPDM', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 2, name: 'Maurice Kamto', party: 'MRC', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 3, name: 'Cabral Libii', party: 'PCRN', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 3, name: 'Osih Joshua', party: 'SDF', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 4, name: 'Candidate 1', party: 'CPDM', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 5, name: 'Candidate 2', party: 'MRC', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
  { id: 6, name: 'Candidate 3', party: 'SDF', imageUrl: 'https://cdn.quasar.dev/img/avatar.png' },
]

const filterOption = ref('All')
const selectedElection = ref(null) //related to candidate deletion per election
const electionToDelete = ref(null); //now this one is actually related to election deletion
const candidateToDelete = ref(null);
const filteredElections = ref([])



const showCandidatesDialog = ref(false);
const showCandidatePerElectionDeleteDialog = ref(false);
const isLoading = ref(false);
const showAddEditElectionDialog = ref(false)
const isEditingScreen = ref(false)
const showElectionConfirmDeleteDialog = ref(false)

const electionFormData = ref({
  type: '',
  description: '',
  electionDate: '',
  nextElectionData: '',
  voterRegistrationStartDate: '',
  voterRegistrationEndDate: '',
  voterElegibility: '',
  candidateElegibility: '',
  status: '',
  specifics: [],
  candidates: [],
  regionsInvolved: [],
  linkToDetails: ''
})

const specifics = [
  'Directly impacts local administration and development.',
  'Mixed electoral system: indirect election and presidential appointment.',
  '10 multi-member constituencies (7 seats each).',
  'Mixed single-round ballot system (majority and proportional representation).',
  'Lists gaining less than 5% of votes are not eligible for proportional distribution.',
]



const fetchElections = () => {

  let tempElections = elections.value;

  if(filterOption.value){
    if(filterOption.value === "All"){
      // No filtering needed for "All"
    }
    else{
      tempElections = elections.value.filter(election => election.type === filterOption.value)
    }
  }

  filteredElections.value = tempElections;

}
// const showAddEditCandidateDialog = ref(false)

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

const viewCandidates = (election) => {
  selectedElection.value = election;
  showCandidatesDialog.value = true;
};

const PromtToDelete = (candidate) => {
  candidateToDelete.value = candidate;
  showCandidatePerElectionDeleteDialog.value = true;
}

const deleteCandidate = () => {
  if (candidateToDelete.value && selectedElection.value) {
    const election = elections.value.find(e => e.id === selectedElection.value.id);
    if (election && Array.isArray(election.candidates)) {

      $q.notify({
          color: 'negative',
          icon: 'delete_forever',
          message: `Candidate "${candidateToDelete.value.name}" deleted successfully!`
      })
      election.candidates = election.candidates.filter(
        c => c.name !== candidateToDelete.value.name
      );
    }
    showCandidatePerElectionDeleteDialog.value = false;
    candidateToDelete.value = null;
  }
}

const goToPage = (url) => {
  router.push(url);
}

// Placeholder for editing election dialog logic
const viewElectionAddEditingDialog = (election) => {

 if(election){
  isEditingScreen.value = true;
  electionFormData.value = {
    ...election,
  }
 } else{
  isEditingScreen.value = false
  electionFormData.value = {
    type: '',
    description: '',
    electionDate: '',
    nextElectionData: '',
    voterRegistrationStartDate: '',
    voterRegistrationEndDate: '',
    voterElegibility: '',
    candidateElegibility: '',
    status: '',
    specifics: [],
    candidates: [],
    regionsInvolved: [],
    linkToDetails: ''
  }
 }

 showAddEditElectionDialog.value = true
};


//show the delete confirmation dialog for deleting elections
const viewElectionDeleteDialog = (election) => {
  showElectionConfirmDeleteDialog.value = true;
  electionToDelete.value = election;

};

const deleteElection = () => {
  if(!electionToDelete.value){
    $q.notify({
      message: 'error performing this action',
      color: 'negative',
      icon: 'warning'
    })
  } else{
    $q.notify({
      message: 'Selected election has been deleted',
      color: 'negative',
      icon: 'delete_forever'
    })
    elections.value = elections.value.filter(election => election.id !== electionToDelete.value.id);
    showElectionConfirmDeleteDialog.value = false;
    electionToDelete.value = null;
  }
}

// Handler for creating or editing an election (placeholder)
const createElectionSubmitHandler = () => {
  $q.notify({
    color: 'positive',
    icon: 'check',
    message: 'Election form submitted (handler not implemented yet)'
  });
  showAddEditElectionDialog.value = false;
};


onMounted(() => {
  filteredElections.value = elections.value;
})

watchEffect(() => {
  fetchElections();
})
</script>

<template>
  <q-page>
      <HeaderCard
        header-message="Election Management"
        description-message="Create and fully Manage the elections of cameroon!"
      />

      <q-card class="no-shadow" style="border-bottom: 1px solid #e0e0e0;">
        <q-card-section class="q-pa-md">
          <div class="btn-filter-container flex justify-start">
            <q-btn
              icon="add_circle"
              label="Add Election"
              class="bg-primary text-white"
              flat
              @click="viewElectionAddEditingDialog(null)"
            />

            <div class="filter flex">
              <span>Filter: </span>
              <q-select
                v-model="filterOption"
                :options="electionTypes"
                transition-show="scale"
                transition-hide="scale"
                dense
                outlined
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- expansion item section to show the different elections and the time count down -->
      <div class="q-gutter-md content-max-width q-mt-md">

          <div class="spinner-container"
            v-if="isLoading"
            style="width: 100%; display: flex; justify-content: center; align-items: center;"
          >
            <q-spinner color="primary" size="60px"/>
          </div>


          <q-expansion-item
            v-for="election in filteredElections"
            :key="election.type"
            :label="election.type + ' Elections'"
            :icon="getElectionIcon(election.type)"
            class="rounded-borders election-expansion-item"
            header-class="text-weight-bold text-primary"
            expand-icon-class="text-primary"
            v-else
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

                  <q-item v-if="election.specifics && election.specifics.length">
                    <q-item-section>
                      <q-item-label caption>Voter Registration Start Date:</q-item-label>
                      <q-item-label class="text-weight-medium">
                        {{ election.voterRegistrationStartDate }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>

                    <q-item-section>
                      <q-item-label caption>Voter Registration End Date:</q-item-label>
                      <q-item-label class="text-weight-medium">
                        {{ election.voterRegistrationEndDate }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <div class="row q-gutter-sm justify-end">
                  <q-btn
                    color="primary"
                    label="Edit election"
                    icon="edit"
                    @click="viewElectionAddEditingDialog(election)"
                    outline
                  />

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
                    label="Full Election Details"
                    icon="article"
                    @click="goToPage(election.linkToDetails)"
                    outline
                  />
                  <q-btn
                    color="negative"
                    label="Delete Election"
                    icon="delete"
                    @click="viewElectionDeleteDialog(election)"
                  />
                </div>
              </q-card-section>
            </q-card>
         </q-expansion-item>
      </div>

      <!-- all dialogs will be for here on -->

      <!-- Dialog to show candidates per election -->
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
              <q-item v-for="(candidate) in selectedElection?.candidates" :key="candidate.name">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="candidate.imageUrl" alt="Candidate Avatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ candidate.name }}</q-item-label>
                  <q-item-label caption>{{ candidate.party }}</q-item-label>
                </q-item-section>
                <q-btn
                  icon="delete"
                  flat
                  dense
                  class="text-negative"
                  style="width: 30px"
                  @click="PromtToDelete(candidate)"
                />
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

      <!-- Delete confirmation dialog for candidate delete dialog -->

      <DeleteDialog
        :suffix="candidateToDelete?.name"
        @delete="deleteCandidate"
        @cancel="showCandidatePerElectionDeleteDialog = false"
        v-model="showCandidatePerElectionDeleteDialog"
      />

      <!-- Delete confirmation dialog for election -->

      <DeleteDialog
        :suffix="'this ' + electionToDelete?.type + ' Election'"
        @delete="deleteElection"
        @cancel="showElectionConfirmDeleteDialog = false"
        v-model="showElectionConfirmDeleteDialog"
      />

      <!-- Add and Edit dialog for the admin election view -->

      <q-dialog v-model="showAddEditElectionDialog" persistent>
        <q-card class="election-dialog-card">
          <q-card-section class="bg-primary text-white row items-center">
            <div class="text-h5">{{ isEditingScreen ? 'Edit Election' : 'Add Election' }}</div>
            <q-space/>
            <q-btn
              icon="close"
              @click="showAddEditElectionDialog = false"
              flat
              dense
              color="white"
            />
          </q-card-section>

          <q-form class="q-pa-lg" @submit="createElectionSubmitHandler">
            <div class=" row q-col-gutter-md">

              <q-select
                v-model="electionFormData.type"
                :options="electionTypes"
                label="Election Type"
                dense outlined
                class="col-md-6 "
              />

             <q-input
                label="enter the election date"
                dense
                outlined
                v-model="electionFormData.electionDate"
                :rules="[val => !!val || 'this field is required']"
                type="date"
                class="col-md-6"
              />

            </div>

            <q-input
              type="textarea"
              v-model="electionFormData.description"
              label="description here"
              dense
              outlined
              class="full-width"
            />

            <div class="flex row q-mt-sm q-col-gutter-md">
              <q-input
                label="enter the election date"
                dense
                outlined
                v-model="electionFormData.electionDate"
                :rules="[val => !!val || 'this field is required']"
                type="date"
                class="col-md-4 col-xs-12"
              />

             <q-input
                label="select the voter registration start date"
                dense
                outlined
                v-model="electionFormData.voterRegistrationStartDate"
                :rules="[val => !!val || 'This field is required']"
                type="date"
                class="col-md-4 col-xs-12"
              />

              <q-input
                label="select a voter registration end date"
                dense
                outlined
                v-model="electionFormData.voterRegistrationEndDate"
                :rules="[val => !!val || 'Name is required']"
                type="date"
                class="col-md-4 col-xs-12"
              />
            </div>

             <div class="row q-col-gutter-md">

             <q-select
                v-model="electionFormData.regionsInvolved"
                :options="regionOptions"
                label="select regions for this election"
                dense outlined
                multiple
                class="col-md-6 col-xs-12"
                :rules="[val => !!val || 'This field is required']"
              />

              <q-select
              v-model="electionFormData.candidates"
              :options="availableCandidates"
              label="Select candidates for this election"
              multiple
              dense
              outlined
              class="col-md-6 col-xs-12"
              :rules="[val => !!val || 'This field is required']"
              option-label="name"
              option-value="id"
              emit-value
              map-options
            >
              <template v-slot:option="{itemProps, opt}">
                <q-item v-bind="itemProps">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="opt?.imageUrl" :alt="opt?.name"/>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ opt?.name }}</q-item-label>
                    <q-item-label caption>{{ opt?.party }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            </div>

            <q-select
              v-model="electionFormData.specifics"
              label="select some specifics bound to this election"
              dense
              outlined
              multiple
              :options="specifics"
              class="full-width"
            />
            <q-input
                label="enter the details for this election if any"
                dense
                outlined
                v-model="electionFormData.linkToDetails"
                class="full-width q-mt-md"
              />

            <div class="submit-btn-container full-width flex justify-end">
              <q-btn
                flat
                class="bg-primary text-white q-mt-md"
                type="submit"
              >
                <template v-slot:default>
                  <span>Submit</span>
                  <q-icon name="arrow_right"/>
                </template>
              </q-btn>
            </div>
          </q-form>

        </q-card>

      </q-dialog>

  </q-page>
</template>

<style lang="scss" scoped>
*{
  box-sizing: border-box;


  .btn-filter-container{
    gap: 25px;
    .filter{
      gap: 10px;
      align-items: center;
    }
  }
  .content-max-width{
    max-width: 100vw;

    .election-expansion-item{
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;
      transition: box-shadow 0.3s ease;
    }

    .q-ml-xl{
      margin-left: 300px;
    }


  }

  .election-dialog-card {
    min-width: 600px;
    max-width: 80vw;
    border-radius: 12px;
  }
}



</style>
