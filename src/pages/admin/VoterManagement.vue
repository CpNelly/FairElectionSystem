<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import HeaderCard from 'src/components/cards/HeaderCard.vue';
import DeleteDialog from 'src/components/dialogs/DeleteDialog.vue';

const $q = useQuasar();

// --- Mock Data ---
const mockVoters = ref([
  { id: 'voter001', name: 'Alice Smith', email: 'alice.s@example.com', nationalId: '123456789', region: 'Centre', isRegistered: true, photoUrl: 'https://placehold.co/40x40/3f51b5/fff?text=AS' },
  { id: 'voter002', name: 'Bob Johnson', email: 'bob.j@example.com', nationalId: '987654321', region: 'Littoral', isRegistered: true, photoUrl: 'https://placehold.co/40x40/007bff/fff?text=BJ' },
  { id: 'voter003', name: 'Catherine Lee', email: 'c.lee@example.com', nationalId: '456123789', region: 'North-West', isRegistered: false, photoUrl: 'https://placehold.co/40x40/673ab7/fff?text=CL' },
  { id: 'voter004', name: 'David Brown', email: 'david.b@example.com', nationalId: '789456123', region: 'South', isRegistered: true, photoUrl: 'https://placehold.co/40x40/ff5722/fff?text=DB' },
  { id: 'voter005', name: 'Eve Davis', email: 'eve.d@example.com', nationalId: '321654987', region: 'West', isRegistered: true, photoUrl: 'https://placehold.co/40x40/4caf50/fff?text=ED' },
  { id: 'voter006', name: 'Frank White', email: 'frank.w@example.com', nationalId: '654987321', region: 'East', isRegistered: false, photoUrl: 'https://placehold.co/40x40/9c27b0/fff?text=FW' },
  { id: 'voter007', name: 'Grace Green', email: 'grace.g@example.com', nationalId: '159753842', region: 'Far North', isRegistered: true, photoUrl: 'https://placehold.co/40x40/f44336/fff?text=GG' },
  { id: 'voter008', name: 'Henry Black', email: 'henry.b@example.com', nationalId: '753951852', region: 'Adamawa', isRegistered: true, photoUrl: 'https://placehold.co/40x40/2196f3/fff?text=HB' },
  { id: 'voter009', name: 'Ivy Stone', email: 'ivy.s@example.com', nationalId: '357159852', region: 'South-West', isRegistered: false, photoUrl: 'https://placehold.co/40x40/009688/fff?text=IS' },
]);

// Options for region selection
const regionOptions = [
  'Adamawa', 'Centre', 'East', 'Far North', 'Littoral',
  'North', 'North-West', 'South', 'South-West', 'West',
];

// --- Reactive State ---
const voters = ref([]); // Full list of voters (after initial fetch)
const filteredVoters = ref([]); // Voters displayed in the table after search/filter
const isLoading = ref(true); // Loading indicator for the table
const searchQuery = ref(''); // Model for the search input

const showAddEditVoterDialog = ref(false); // Controls add/edit dialog visibility
const isEditing = ref(false); // Flag to determine if we're adding or editing
const voterForm = ref({ // Form data for add/edit operations
  id: null,
  name: '',
  email: '',
  nationalId: '',
  region: null,
  isRegistered: false,
  profilePicture: ''
});
const photoFile = ref(null);

const showDeleteConfirmDialog = ref(false); // Controls delete confirmation dialog
const voterToDelete = ref(null); // Stores the voter object to be deleted

// --- Table Configuration ---
const columns = [
  { name: 'profilePicture', label: 'Picture', align: 'center', field: 'profilePicture' },
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  { name: 'nationalId', label: 'National ID', field: 'nationalId', align: 'left', sortable: true },
  { name: 'region', label: 'Region', field: 'region', align: 'left', sortable: true },
  { name: 'isRegistered', label: 'Registered', field: 'isRegistered', align: 'center', format: val => val ? 'Yes' : 'No', sortable: true },
  { name: 'actions', label: 'Actions', align: 'center' },
];

const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0, // Total number of rows
});

// --- Methods ---

const getAvatarColor = (name) => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ff9800', '#ff5722', '#795548', '#607d8b'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Simulate fetching voters from an API
const fetchVoters = () => {
  isLoading.value = true;
  return new Promise(resolve => {
    setTimeout(() => {
      voters.value = mockVoters.value.map(v => ({ ...v })); // Deep copy mock data
      pagination.value.rowsNumber = voters.value.length;
      filterVoters(); // Apply initial filter/search
      isLoading.value = false;
      resolve();
    }, 500); // Simulate network delay
  });
};

// Apply search filter to voters
const filterVoters = () => {
  let tempVoters = voters.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    tempVoters = tempVoters.filter(voter =>
      voter.name.toLowerCase().includes(query) ||
      voter.email.toLowerCase().includes(query) ||
      voter.nationalId.toLowerCase().includes(query) ||
      voter.region.toLowerCase().includes(query)
    );
  }
  filteredVoters.value = tempVoters;
  // Reset pagination if search changes the number of items
  pagination.value.page = 1;
  pagination.value.rowsNumber = filteredVoters.value.length;
};

// Clear search input and re-filter
const clearSearch = () => {
  searchQuery.value = '';
  filterVoters();
};

// Opens the Add/Edit dialog, pre-filling form if editing
const openAddEditDialog = (voter = null) => {
  if (voter) {
    isEditing.value = true;
    voterForm.value = { ...voter }; // Copy existing voter data to form
  } else {
    isEditing.value = false;
    // Reset form for new voter
    voterForm.value = {
      id: null,
      name: '',
      email: '',
      nationalId: '',
      region: null,
      isRegistered: false,
      photoUrl: ''
    };
  }
  showAddEditVoterDialog.value = true;
};

// Saves (adds or updates) a voter
const saveVoter = () => {
  $q.loading.show({ message: 'Saving voter data...' });
  setTimeout(() => {
    if (isEditing.value) {
      // Update existing voter
      const index = voters.value.findIndex(v => v.id === voterForm.value.id);
      if (index !== -1) {
        voters.value[index] = { ...voterForm.value };
        $q.notify({
          color: 'positive',
          icon: 'check_circle',
          message: `Voter "${voterForm.value.name}" updated successfully!`,
        });
      }
    } else {
      // Add new voter
      const newId = 'voter' + (Math.max(...voters.value.map(v => parseInt(v.id.substring(5)))) + 1).toString().padStart(3, '0');
      const newVoter = { ...voterForm.value, id: newId };

      // Generate a placeholder profile picture if none is provided
      if (!newVoter.profilePicture) {
        const initials = newVoter.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
        newVoter.profilePicture = `https://placehold.co/40x40/${getAvatarColor(newVoter.name).substring(1)}/fff?text=${initials}`;
      }

      voters.value.push(newVoter);
      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: `Voter "${voterForm.value.name}" added successfully!`,
      });
    }
    $q.loading.hide();
    showAddEditVoterDialog.value = false;
    filterVoters(); // Re-filter to update table
  }, 1000);
};

// Opens delete confirmation dialog
const confirmDeleteVoter = (voter) => {
  voterToDelete.value = voter;
  showDeleteConfirmDialog.value = true;
};

// Deletes a voter
const deleteVoter = () => {
  if (voterToDelete.value) {
    $q.loading.show({ message: `Deleting voter "${voterToDelete.value.name}"...` });
    setTimeout(() => {
      voters.value = voters.value.filter(v => v.id !== voterToDelete.value.id);
      $q.notify({
        color: 'negative',
        icon: 'delete_forever',
        message: `Voter "${voterToDelete.value.name}" deleted successfully!`
      });
      $q.loading.hide();
      showDeleteConfirmDialog.value = false;
      voterToDelete.value = null;
      filterVoters(); // Re-filter to update table
    }, 500);
  }
};

// Handles file upload and converts it to a data URL for preview
const handleFileUpload = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      voterForm.value.photoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    voterForm.value.photoUrl = '';
  }
};

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/100x100/AAAAAA/FFFFFF?text=N/A';
};

// Pagination and sorting handler for QTable
const onRequest = (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  isLoading.value = true;

  // Simulate server-side processing
  setTimeout(() => {
    // Apply sorting
    let sortedData = [...voters.value];
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
    filteredVoters.value = sortedData.slice(startRow, endRow);

    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    pagination.value.rowsNumber = sortedData.length; // Important for total rows

    isLoading.value = false;
  }, 300);
};


// Watch for changes in voters and update the filtered list
watchEffect(() => {
  filterVoters();
});

// --- Lifecycle Hooks ---
onMounted(() => {
  fetchVoters(); // Initial load of voters
});
</script>


<template>
  <q-page class="voter-management-container q-pa-md">

    <!-- Page Header -->
    <HeaderCard
      header-message="Voter Management"
      description-message="Manage voter registration for the upcoming elections in Cameroon."
    />

    <!-- Voter List and Controls -->
    <q-card class="q-pa-lg bg-white shadow-2 rounded-lg content-max-width">
      <q-card-section class="q-pa-none">
        <div class="row items-center q-pb-md">
          <div class="col-auto text-h5 text-primary">Voters List</div>
          <q-space />
          <q-btn
            color="primary"
            icon="person_add"
            label="Add Voter"
            @click="openAddEditDialog(null)"
            class="q-mr-sm"
          />
          <q-input
            dense
            outlined
            v-model="searchQuery"
            placeholder="Search voters..."
            class="search-input"
            @update:model-value="filterVoters"
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
        :rows="filteredVoters"
        :columns="columns"
        row-key="id"
        :loading="isLoading"
        :pagination="pagination"
        @request="onRequest"
        class="voters-table"
        flat bordered
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Custom column for profile picture -->
        <template v-slot:body-cell-profilePicture="props">
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
              <q-tooltip>Edit Voter</q-tooltip>
            </q-btn>
            <q-btn
              dense
              round
              flat
              color="negative"
              icon="delete"
              @click="confirmDeleteVoter(props.row)"
            >
              <q-tooltip>Delete Voter</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Add/Edit Voter Dialog -->
    <q-dialog v-model="showAddEditVoterDialog" persistent>
      <q-card class="voter-dialog-card">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ isEditing ? 'Edit Voter' : 'Add New Voter' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showAddEditVoterDialog = false" />
        </q-card-section>

        <q-form @submit="saveVoter">
          <q-card-section class="q-gutter-md">
            <q-input
              outlined
              dense
              v-model="voterForm.name"
              label="Full Name"
              :rules="[val => !!val || 'Name is required']"
            />
            <q-input
              outlined
              dense
              v-model="voterForm.email"
              label="Email"
              type="email"
              :rules="[
                val => !!val || 'Email is required',
                val => /.+@.+\..+/.test(val) || 'Invalid email format'
              ]"
            />
            <q-input
              outlined
              dense
              v-model="voterForm.nationalId"
              label="National ID"
              :rules="[val => !!val || 'National ID is required']"
            />
            <q-select
              outlined
              dense
              v-model="voterForm.region"
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
              <img :src="voterForm.photoUrl" @error="handleImageError" alt="Voter Photo Preview" />
            </q-avatar>

            <q-toggle
              v-model="voterForm.isRegistered"
              label="Is Registered"
              color="green"
            />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn flat label="Cancel" color="grey" @click="showAddEditVoterDialog = false" />
            <q-btn type="submit" :label="isEditing ? 'Update Voter' : 'Add Voter'" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <DeleteDialog
      v-model="showDeleteConfirmDialog"
      @delete="deleteVoter"
      @cancel="showDeleteConfirmDialog = false"
      :suffix="voterToDelete?.name"/>
  </q-page>
</template>



<style lang="scss" scoped>

.content-max-width {
  max-width: 1200px;
  margin: 2rem auto; // Add some top margin for separation
}

.header-card {
  border-radius: 12px; // More rounded corners
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); // Stronger, modern shadow
  margin-bottom: 2rem;
  //background: linear-gradient(45deg, #e3f2fd, #bbdefb); // A subtle gradient
  background-color: #92d4cdce;
}

.search-input {
  width: 250px;
}

.voters-table {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #f8f8f8;
  }
}

.voter-dialog-card {
  min-width: 450px; // Slightly wider dialog
  max-width: 90vw;
  border-radius: 12px;
  .q-card__section--vert.q-card__section--no-padding {
    padding: 24px; // Add padding to dialog sections
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
  .search-input {
    width: 100%;
    margin-top: 10px;
  }
  .q-card-actions .q-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
