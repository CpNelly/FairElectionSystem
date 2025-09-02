<script setup>
import { ref } from 'vue';
import {
  QPage,
  QCard,
  QCardSection,
  QIcon,
  QTimeline,
  QTimelineEntry,
  QChip,
  QLinearProgress,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QBadge,
} from 'quasar';

// Mock data for dashboard metrics
const metrics = ref({
  totalRegisteredVoters: 7854321,
  upcomingElections: 4,
  activeCandidates: 187,
  latestTurnoutRate: 68.5,
});

// Mock data for election statuses
const electionStatuses = ref([
  {
    name: 'Presidential 2025',
    status: 'Preparation',
    progress: 75, // Percentage of completion
    date: '2025-10-27',
    icon: 'how_to_vote',
    color: 'deep-purple'
  },
  {
    name: 'Legislative 2026',
    status: 'Registration Open',
    progress: 30,
    date: '2026-02-15',
    icon: 'people',
    color: 'teal'
  },
  {
    name: 'Senatorial 2026',
    status: 'Candidate Submission',
    progress: 50,
    date: '2026-03-20',
    icon: 'meeting_room',
    color: 'indigo'
  },
  {
    name: 'Municipal 2027',
    status: 'Planning Phase',
    progress: 10,
    date: '2027-01-10',
    icon: 'location_city',
    color: 'blue-grey'
  }
]);

// Mock data for candidate statistics
const candidateStats = ref({
  total: 250,
  approved: 187,
  pending: 35,
  rejected: 28,
  byParty: {
    'CPDM': 50,
    'SDF': 40,
    'UNDP': 30,
    'CRM': 25,
    'Others': 85
  }
});

// Mock data for recent activities
const recentActivities = ref([
  {
    type: 'voter',
    title: 'New Voter Registration',
    description: 'John Doe from Littoral Region successfully registered to vote.',
    timestamp: '2025-08-20 10:30 AM',
    relatedTo: 'Voter ID: 12345',
  },
  {
    type: 'election',
    title: 'Legislative Election Update',
    description: 'Legislative election 2026 dates officially confirmed.',
    timestamp: '2025-08-19 03:00 PM',
    relatedTo: 'Legislative 2026',
  },
  {
    type: 'candidate',
    title: 'New Candidate Submitted',
    description: 'Candidate Ayuk Johnson (CRM) for Legislative Election submitted profile.',
    timestamp: '2025-08-18 11:45 AM',
    relatedTo: 'Candidate: Ayuk Johnson',
  },
  {
    type: 'system',
    title: 'System Maintenance Completed',
    description: 'Scheduled database maintenance successfully completed with no issues.',
    timestamp: '2025-08-17 02:00 AM',
    relatedTo: 'System Health',
  },
  {
    type: 'voter',
    title: 'Voter Information Update',
    description: 'Address change processed for Jane Smith in Centre Region.',
    timestamp: '2025-08-16 09:15 AM',
    relatedTo: 'Voter ID: 54321',
  },
  {
    type: 'election',
    title: 'Municipal Election Discussion',
    description: 'Public consultation on proposed municipal election guidelines initiated.',
    timestamp: '2025-08-15 01:00 PM',
    relatedTo: 'Municipal 2027',
  },
]);

// Helper function to get icon based on activity type
const getActivityIcon = (type) => {
  switch (type) {
    case 'voter':
      return 'person_add';
    case 'election':
      return 'campaign';
    case 'candidate':
      return 'how_to_reg';
    case 'system':
      return 'build';
    default:
      return 'info';
  }
};

// Helper function to get color based on activity type
const getActivityColor = (type) => {
  switch (type) {
    case 'voter':
      return 'blue';
    case 'election':
      return 'green';
    case 'candidate':
      return 'orange';
    case 'system':
      return 'grey';
    default:
      return 'primary';
  }
};
</script>

<template>
  <q-page class="admin-dashboard-container q-pa-md">
    <!-- System Overview Metrics -->
    <div class="q-pa-md bg-white shadow-1 rounded-borders q-mb-lg content-max-width">
      <div class="text-h5 text-primary q-mb-lg">Key System Metrics</div>
      <!-- Removed 'dashboard-metrics-grid' class from this div as it will now rely solely on Quasar's Flexbox grid -->
      <div class="row q-col-gutter-lg">
        <!-- Metric 1: Total Registered Voters -->
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="metric-card bg-blue-1 text-blue-9">
            <q-card-section class="text-center">
              <q-icon name="group_add" size="40px" class="q-mb-sm" />
              <div class="text-h6 text-weight-bold">{{ metrics.totalRegisteredVoters.toLocaleString() }}</div>
              <div class="text-subtitle2 text-grey-8">Registered Voters</div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Metric 3: Upcoming Elections -->
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="metric-card bg-indigo-1 text-indigo-9">
            <q-card-section class="text-center">
              <q-icon name="event_available" size="40px" class="q-mb-sm" />
              <div class="text-h6 text-weight-bold">{{ metrics.upcomingElections }}</div>
              <div class="text-subtitle2 text-grey-8">Upcoming Elections</div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Metric 4: Active Candidates -->
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="metric-card bg-orange-1 text-orange-9">
            <q-card-section class="text-center">
              <q-icon name="person_search" size="40px" class="q-mb-sm" />
              <div class="text-h6 text-weight-bold">{{ metrics.activeCandidates }}</div>
              <div class="text-subtitle2 text-grey-8">Active Candidates</div>
            </q-card-section>
          </q-card>
        </div>


        <!-- Metric 7: Latest Turnout Rate -->
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="metric-card bg-teal-1 text-teal-9">
            <q-card-section class="text-center">
              <q-icon name="pie_chart" size="40px" class="q-mb-sm" />
              <div class="text-h6 text-weight-bold">{{ metrics.latestTurnoutRate }}%</div>
              <div class="text-subtitle2 text-grey-8">Latest Turnout Rate</div>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>

    <div class="row q-col-gutter-lg content-max-width">
      <!-- Key Elections Status Section -->
      <div class="col-xs-12 col-md-6">
        <q-card class="q-pa-md bg-white shadow-2 rounded-borders full-height">
          <div class="text-h5 text-primary q-mb-lg">Key Election Statuses</div>
          <q-list separator>
            <q-item v-for="(election, index) in electionStatuses" :key="index">
              <q-item-section avatar>
                <q-icon :name="election.icon" :color="election.color" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ election.name }}</q-item-label>
                <q-item-label caption>{{ election.status }} - {{ election.date }}</q-item-label>
                <q-linear-progress
                  :value="election.progress / 100"
                  :color="election.color"
                  size="8px"
                  rounded
                  class="q-mt-sm"
                />
              </q-item-section>
              <q-item-section side>
                <q-chip :color="election.color" text-color="white" dense>
                  {{ election.progress }}%
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
          <div
            v-if="electionStatuses.length === 0"
            class="text-center q-py-lg text-grey-6"
          >
            <q-icon name="event_note" size="xl" />
            <div class="text-h6 q-mt-md">No Upcoming Elections</div>
            <div class="text-subtitle1">All elections are currently concluded or not yet planned.</div>
          </div>
        </q-card>
      </div>

      <!-- Candidate Statistics Section -->
      <div class="col-xs-12 col-md-6">
        <q-card class="q-pa-md bg-white shadow-2 rounded-borders full-height q-mb-md">
          <div class="text-h5 text-primary q-mb-lg">Candidate Statistics</div>
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="groups" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">Total Candidates</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-chip color="primary" text-color="white" dense>{{ candidateStats.total }}</q-chip>
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator class="q-my-md" />

          <div class="text-subtitle1 text-primary q-mb-sm">Candidates by Party</div>
          <q-list dense>
            <q-item v-for="(count, party) in candidateStats.byParty" :key="party">
              <q-item-section>{{ party }}</q-item-section>
              <q-item-section side>
                <q-badge color="primary" text-color="light">{{ count }}</q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Recent Activities Section -->
    <div class="q-pa-md bg-white shadow-1 rounded-borders q-mt-lg content-max-width">
      <div class="text-h5 text-primary q-mb-lg">Recent Activities</div>

      <q-timeline color="primary" class="q-px-sm">
        <q-timeline-entry
          v-for="(activity, index) in recentActivities"
          :key="index"
          :icon="getActivityIcon(activity.type)"
          :color="getActivityColor(activity.type)"
          :title="activity.title"
          :subtitle="activity.timestamp"
        >
          <div>{{ activity.description }}</div>
          <q-chip v-if="activity.relatedTo" dense :label="activity.relatedTo" class="q-mt-sm" />
        </q-timeline-entry>
        <q-timeline-entry
          v-if="recentActivities.length === 0"
          icon="event_note"
          color="grey"
          title="No Recent Activities"
          subtitle="Keep an eye on this space for updates!"
        />
      </q-timeline>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.admin-dashboard-container {
  font-family: 'Inter', sans-serif;
}

.content-max-width {
  max-width: 100vw;
}

.header-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

/* Rely solely on Quasar's Flexbox for grid layout here */
.row.dashboard-metrics-grid > div {
  /* Quasar's col- classes already handle width, just ensure padding/margin if needed */
  padding-bottom: 0; /* Override default col padding if it causes issues */
}

.metric-card {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Ensure consistent height for cards in a row */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .q-icon {
    opacity: 0.8;
  }
}

.q-timeline {
  margin-top: 1.5rem;
  padding-left: 10px; /* Adjust padding for smaller screens */
  padding-right: 10px;
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
  /* On small screens, cards will stack due to col-xs-12 */
}

@media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
  /* On tablets, two cards per row due to col-sm-6 */
}

</style>
