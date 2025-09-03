<script setup>
import SideBar from 'src/components/navigations/SideBar.vue'
import { ref } from 'vue'
import {
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QDrawer,
  QPageContainer,
  QInput,
  QList,
  QItem,
  QItemSection,
  // QItemLabel,
} from 'quasar'

const search = ref('')
const param = ref(1)

const leftDrawerOpen = ref(false)

// Function to toggle the left drawer
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const section = ref([
  {
    title: 'Main',
    show: true,
    links: [
      {
        title: 'Overview',
        to: { name: 'AdminDashboard', params: { id: `${param.value}` } },
        icon: 'dashboard',
      },
    ],
  },
  {
    title: 'Election Management',
    show: true,
    links: [
      {
        title: 'Voter Management',
        to: { name: 'VoterManagement', params: { id: param.value } },
        icon: 'manage_accounts',
      },
      {
        title: 'Candidate Management',
        to: { name: 'CandidateManagement', params: { id: param.value } },
        icon: 'how_to_reg',
      }, // Changed icon for clarity
      {
        title: 'Election Setup',
        to: { name: 'ElectionSetup', params: { id: param.value } },
        icon: 'playlist_add',
      },
    ],
  },
  {
    title: 'Results and Analytics',
    show: true,
    links: [
      {
        title: 'View Results',
        to: { name: 'ViewResults', params: { id: param.value } },
        icon: 'assessment',
      }, // Changed to 'Results' to match previous component
      { title: 'Reports', to: { name: 'Report', params: { id: param.value } }, icon: 'download' }, // Changed to 'Reports' for plural
    ],
  },
  {
    title: 'Others',
    show: true,
    links: [
      {
        title: 'System Settings',
        to: { name: 'SystemSettings', params: { id: param.value } },
        icon: 'settings',
      },
      { title: 'Support', to: { name: 'AdminSupport', params: { id: param.value } }, icon: 'help' },
    ],
  },
])
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header for top bar -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Toggle Navigation"
          @click="toggleLeftDrawer"
          class="q-mr-sm"
        />
        <q-toolbar-title> E-Elections Admin </q-toolbar-title>

        <!-- Search bar in header for better visibility/usability on desktop -->
        <q-input
          v-model="search"
          type="search"
          placeholder="Search..."
          dense
          outlined
          bg-color="white"
          class="q-mx-md desktop-only"
          style="width: 250px"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- User/Admin Profile (Placeholder) -->
        <q-btn flat round dense icon="account_circle" class="q-ml-sm" label="admin name">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Drawer for sidebar navigation -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2 q-pa-md"
      :width="250"
    >
      <q-list class="q-pt-md nav-links">
        <div class="searchbar-container mobile-only q-px-md q-pb-md">
          <q-input
            v-model="search"
            type="search"
            placeholder="Search..."
            class="searchbar"
            dense
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <!-- Pass the 'section' data to the SideBar component -->
        <SideBar v-model="section" />
      </q-list>
    </q-drawer>

    <!-- Page Container for router-view -->
    <q-page-container>
      <div class="content">
        <!-- Your original content padding div -->
        <router-view />
        <!-- This is where your individual pages (like AdminDashboard.vue) will load -->
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
/* Scoped styles specific to this layout component */
.q-header {
  height: 60px; /* Match your original top-bar height */
}

/* Hide desktop search on mobile and vice-versa */
.desktop-only {
  display: flex; /* Flex for input */
}
.mobile-only {
  display: none;
}

.searchbar-container {
  width: 100%;
}
.searchbar {
  width: 100%;
}

.nav-links {
  height: calc(100vh - 60px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.nav-links::-webkit-scrollbar {
  display: none;
}

.content {
  padding: 20px;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  /* Adjust breakpoint as per Quasar's md breakpoint (1024px) */
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block;
  }
  .q-drawer {
    /* Make the drawer slide in from the side on smaller screens */
    transform: translateX(0) !important; /* Ensure it's not hidden if `show-if-above` is true */
  }
}
</style>
