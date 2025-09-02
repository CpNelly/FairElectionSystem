<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import HeaderCard from 'src/components/cards/HeaderCard.vue';
import DeleteDialog from 'src/components/dialogs/DeleteDialog.vue';

const $q = useQuasar();

// --- Mock Data ---
const mockCandidates = ref([
  { id: 'cand001', name: 'Maurice Kamto', politicalParty: 'CRM', region: 'Centre', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/A05126/FFFFFF?text=MK' },
  { id: 'cand002', name: 'Cabral Libii', politicalParty: 'PCRN', region: 'Littoral', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/5126A0/FFFFFF?text=CL' },
  { id: 'cand003', name: 'Joshua Osih', politicalParty: 'SDF', region: 'North-West', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/26A051/FFFFFF?text=JO' },
  { id: 'cand004', name: 'Paul Biya', politicalParty: 'CPDM', region: 'Centre', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/2676A0/FFFFFF?text=PB' },
  { id: 'cand005', name: 'Bello Bouba Maigari', politicalParty: 'NUDP', region: 'Adamawa', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/26A076/FFFFFF?text=BM' },
  { id: 'cand006', name: 'Maurice Kamto', politicalParty: 'CRM', region: 'Centre', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/A05126/FFFFFF?text=MK' },
  { id: 'cand007', name: 'Cabral Libii', politicalParty: 'PCRN', region: 'Littoral', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/5126A0/FFFFFF?text=CL' },
  { id: 'cand008', name: 'Joshua Osih', politicalParty: 'SDF', region: 'North-West', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/26A051/FFFFFF?text=JO' },
  { id: 'cand009', name: 'Paul Biya', politicalParty: 'CPDM', region: 'Centre', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/2676A0/FFFFFF?text=PB' },
  { id: 'cand010', name: 'Bello Bouba Maigari', politicalParty: 'NUDP', region: 'Adamawa', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/26A076/FFFFFF?text=BM' },
  { id: 'cand011', name: 'Maurice Kamto', politicalParty: 'CRM', region: 'Centre', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/A05126/FFFFFF?text=MK' },
  { id: 'cand012', name: 'Cabral Libii', politicalParty: 'PCRN', region: 'Littoral', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/5126A0/FFFFFF?text=CL' },
  { id: 'cand013', name: 'Joshua Osih', politicalParty: 'SDF', region: 'North-West', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/26A051/FFFFFF?text=JO' },
  { id: 'cand014', name: 'Paul Biya', politicalParty: 'CPDM', region: 'Centre', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/2676A0/FFFFFF?text=PB' },
  { id: 'cand015', name: 'Bello Bouba Maigari', politicalParty: 'NUDP', region: 'Adamawa', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/26A076/FFFFFF?text=BM' },
  { id: 'cand016', name: 'Maurice Kamto', politicalParty: 'CRM', region: 'Centre', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/A05126/FFFFFF?text=MK' },
  { id: 'cand017', name: 'Cabral Libii', politicalParty: 'PCRN', region: 'Littoral', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/5126A0/FFFFFF?text=CL' },
  { id: 'cand018', name: 'Joshua Osih', politicalParty: 'SDF', region: 'North-West', isIncumbent: false, photoUrl: 'https://placehold.co/100x100/26A051/FFFFFF?text=JO' },
  { id: 'cand019', name: 'Paul Biya', politicalParty: 'CPDM', region: 'Centre', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/2676A0/FFFFFF?text=PB' },
  { id: 'cand020', name: 'Bello Bouba Maigari', politicalParty: 'NUDP', region: 'Adamawa', isIncumbent: true, photoUrl: 'https://placehold.co/100x100/26A076/FFFFFF?text=BM' },
]);

const politicalPartyOptions = [
  'CPDM', 'SDF', 'NUDP', 'CRM', 'PCRN', 'UDC', 'FSNC', 'MDR', 'UMS'
];

const regionOptions = [
  'Adamawa', 'Centre', 'East', 'Far North', 'Littoral',
  'North', 'North-West', 'South', 'South-West', 'West',
];

// --- Reactive State ---
const candidates = ref([]);
const filteredCandidates = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');

const showAddEditCandidateDialog = ref(false);
const isEditing = ref(false);
const candidateForm = ref({
  id: null,
  name: '',
  politicalParty: null,
  region: null,
  isIncumbent: false,
  photoUrl: '',
});
const photoFile = ref(null);

const showDeleteConfirmDialog = ref(false);
const candidateToDelete = ref(null);

// --- Table Configuration ---
const columns = [
  { name: 'photo', label: 'Photo', field: 'photoUrl', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'politicalParty', label: 'Party', field: 'politicalParty', align: 'left', sortable: true },
  { name: 'region', label: 'Region', field: 'region', align: 'left', sortable: true },
  { name: 'isIncumbent', label: 'Incumbent', field: 'isIncumbent', align: 'center', format: val => val ? 'Yes' : 'No', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center' },
];

const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// --- Methods ---
const filterCandidates = () => {
  let tempCandidates = candidates.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tempCandidates = tempCandidates.filter(candidate =>
      candidate.name.toLowerCase().includes(query) ||
      candidate.politicalParty.toLowerCase().includes(query) ||
      candidate.region.toLowerCase().includes(query)
    );
  }
  filteredCandidates.value = tempCandidates;
  pagination.value.rowsNumber = filteredCandidates.value.length;
};

const openAddEditDialog = (candidate = null) => {
  if (candidate) {
    isEditing.value = true;
    candidateForm.value = { ...candidate };
    // Reset photo file input when editing an existing candidate
    photoFile.value = null;
  } else {
    isEditing.value = false;
    candidateForm.value = {
      id: null,
      name: '',
      politicalParty: null,
      region: null,
      isIncumbent: false,
      photoUrl: '',
    };
    photoFile.value = null;
  }
  showAddEditCandidateDialog.value = true;
};

// Handles file upload and converts it to a data URL for preview
const handleFileUpload = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      candidateForm.value.photoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    candidateForm.value.photoUrl = '';
  }
};

const saveCandidate = () => {
  if (isEditing.value) {
    const index = candidates.value.findIndex(c => c.id === candidateForm.value.id);
    if (index !== -1) {
      candidates.value[index] = { ...candidateForm.value };
      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: `Candidate "${candidateForm.value.name}" updated successfully!`,
      });
    }
  } else {
    const maxId = candidates.value.reduce((max, c) => Math.max(max, parseInt(c.id.substring(4))), 0);
    const newId = 'cand' + (maxId + 1).toString().padStart(3, '0');
    candidates.value.push({ ...candidateForm.value, id: newId });
    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: `Candidate "${candidateForm.value.name}" added successfully!`,
    });
  }
  showAddEditCandidateDialog.value = false;
};

const confirmDeleteCandidate = (candidate) => {
  candidateToDelete.value = candidate;
  showDeleteConfirmDialog.value = true;
};

const deleteCandidate = () => {
  if (candidateToDelete.value) {
    candidates.value = candidates.value.filter(c => c.id !== candidateToDelete.value.id);
    $q.notify({
      color: 'negative',
      icon: 'delete_forever',
      message: `Candidate "${candidateToDelete.value.name}" deleted successfully!`,
    });
    showDeleteConfirmDialog.value = false;
    candidateToDelete.value = null;
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

// Quasar table request handler for sorting and pagination on the client side
const onRequest = (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  isLoading.value = true;

  // Clone the full filtered data
  let sortedData = [...filteredCandidates.value];

  // Apply sorting
  if (sortBy) {
    sortedData.sort((a, b) => {
      const x = descending ? b : a;
      const y = descending ? a : b;
      if (typeof x[sortBy] === 'string') {
        return x[sortBy].localeCompare(y[sortBy]);
      }
      return x[sortBy] - y[sortBy];
    });
  }

  // Apply pagination
  const startRow = (page - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  filteredCandidates.value = sortedData.slice(startRow, endRow);

  // Update pagination state
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
  pagination.value.rowsNumber = sortedData.length;

  isLoading.value = false;
};

// Handles image loading errors for photo avatars
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/100x100/AAAAAA/FFFFFF?text=N/A';
};


// --- Lifecycle Hooks and Watchers ---
onMounted(() => {
  candidates.value = mockCandidates.value.map(c => ({ ...c }));
  isLoading.value = false;
});

// Watch for changes in candidates or search query and re-filter
watchEffect(() => {
  filterCandidates();
});
</script>

<template>
  <q-page class="candidate-management-container q-pa-md">

    <!-- Page Header -->
    <HeaderCard
    header-message="Candidate Management"
    description-message="Manage electoral candidates for the upcoming elections in Cameroon."/>

    <!-- Candidate List and Controls -->
    <q-card class="q-pa-lg bg-white shadow-2 rounded-lg content-max-width">
      <q-card-section class="q-pa-none">
        <div class="row items-center q-pb-md">
          <div class="col-auto text-h5 text-primary">Candidates List</div>
          <q-space />
          <q-btn
            color="primary"
            icon="person_add"
            label="Add Candidate"
            @click="openAddEditDialog(null)"
            class="q-mr-sm"
          />
          <q-input
            dense
            outlined
            v-model="searchQuery"
            placeholder="Search candidates..."
            class="search-input"
            @update:model-value="filterCandidates"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append v-if="searchQuery">
              <q-icon name="clear" @click="clearSearch" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-separator class="q-mb-md" />

      <q-table
        :rows="filteredCandidates"
        :columns="columns"
        row-key="id"
        :loading="isLoading"
        :pagination="pagination"
        @request="onRequest"
        class="candidates-table"
        flat bordered
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:body-cell-photo="props">
          <q-td :props="props">
            <q-avatar size="40px">
              <img :src="props.row.photoUrl" :alt="props.row.name" @error="handleImageError" />
            </q-avatar>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="edit"
              @click="openAddEditDialog(props.row)"
            >
              <q-tooltip>Edit Candidate</q-tooltip>
            </q-btn>
            <q-btn
              dense
              round
              flat
              color="negative"
              icon="delete"
              @click="confirmDeleteCandidate(props.row)"
            >
              <q-tooltip>Delete Candidate</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Add/Edit Candidate Dialog -->
    <q-dialog v-model="showAddEditCandidateDialog" persistent>
      <q-card class="candidate-dialog-card">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ isEditing ? 'Edit Candidate' : 'Add New Candidate' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showAddEditCandidateDialog = false" />
        </q-card-section>

        <q-form @submit="saveCandidate">
          <q-card-section class="q-gutter-md">
            <q-input
              outlined
              dense
              v-model="candidateForm.name"
              label="Full Name"
              :rules="[val => !!val || 'Name is required']"
            />
            <q-select
              outlined
              dense
              v-model="candidateForm.politicalParty"
              :options="politicalPartyOptions"
              label="Political Party"
              :rules="[val => !!val || 'Political Party is required']"
            />
            <q-select
              outlined
              dense
              v-model="candidateForm.region"
              :options="regionOptions"
              label="Region"
              :rules="[val => !!val || 'Region is required']"
            />
            <q-file
              outlined
              dense
              v-model="photoFile"
              label="Photo"
              accept=".jpg, image/*"
              @update:model-value="handleFileUpload"
            >
              <template v-slot:prepend>
                <q-icon name="photo" />
              </template>
            </q-file>
            <q-avatar size="60px" class="q-mt-sm">
              <img :src="candidateForm.photoUrl" @error="handleImageError" alt="Candidate Photo Preview" />
            </q-avatar>
            <q-toggle
              v-model="candidateForm.isIncumbent"
              label="Is Incumbent"
              color="green"
            />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn flat label="Cancel" color="grey" @click="showAddEditCandidateDialog = false" />
            <q-btn type="submit" :label="isEditing ? 'Update Candidate' : 'Add Candidate'" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->

    <DeleteDialog
      v-model="showDeleteConfirmDialog"
      :suffix="candidateToDelete?.name"
      @delete="deleteCandidate"
      @cancel="showDeleteConfirmDialog = false"
      />
  </q-page>
</template>



<style lang="scss" scoped>

.content-max-width {
  max-width: 1200px;
  margin: 2rem auto; // Add some top margin for separation
}

.search-input {
  width: 250px;
}

.candidates-table {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #f8f8f8;
  }
}

.candidate-dialog-card {
  min-width: 450px; // Slightly wider dialog
  max-width: 90vw;
  border-radius: 12px;
  .q-card__section--vert.q-card__section--no-padding {
    padding: 24px; // Add padding to dialog sections
  }
}

// /* Responsive adjustments */
// @media (max-width: $breakpoint-sm-max) {
//   .header-card .text-h4 {
//     font-size: 1.8rem;
//   }
//   .header-card .text-subtitle1 {
//     font-size: 0.9rem;
//   }
//   .q-pa-md {
//     padding: 1rem !important;
//   }
//   .search-input {
//     width: 100%;
//     margin-top: 10px;
//   }
//   .q-card-actions .q-btn {
//     width: 100%;
//     margin-bottom: 8px;
//   }
// }
</style>
