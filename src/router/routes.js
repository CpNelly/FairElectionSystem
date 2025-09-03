/* eslint-disable no-irregular-whitespace */
import RegisterLayout from '../pages/voters/VoterRegistrationForm.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../layouts/VoterLayout.vue'),
    children: [
      { path: '', name: 'VoterHome', component: () => import('../pages/voters/VoterHome.vue'), },
      { path: 'election-types', name: 'ElectionTypes', component: () => import('../pages/voters/ElectionTypes.vue'), },
      { path: 'voters-guide', name: 'VotersGuide', component: () => import('../pages/voters/VotersGuide.vue'), },
      { path: 'candidates', component: () => import('../pages/voters/GeneralCandidate.vue'),
        children: [
          { path: '', name: 'Candidates', component: () => import('../pages/voters/VoterCandidates.vue') },
          { path: ':id', name: 'CandidateDetail', component: () => import('../pages/voters/CandidateDetail.vue') },
        ]
      },
      { path: 'results', name: 'Results', component: () => import('../pages/voters/VoterResults.vue'), },
    ]
  },

  { path: '/login', component: () => import('../pages/voters/VoterLoginForm.vue') },
  { path: '/register', component: RegisterLayout, },

  //voter routes

  //administrator routes
  {
    path: '/admin',
    children: [
      {
        path: '',
        name: 'AdminLogin',
        component: () => import('../pages/admin/AdminLoginForm.vue'),
      },
      {
        path: ':id',
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
          { path: '', name: 'AdminDashboard', component: () => import('../pages/admin/AdminDashboard.vue') },
          { path: 'voter', name: 'VoterManagement', component: () => import('../pages/admin/VoterManagement.vue') },
          { path: 'candidate', name: 'CandidateManagement', component: () => import('../pages/admin/CandidateManagement.vue') },
          { path: 'election/setup', name: 'ElectionSetup', component: () => import('../pages/admin/ElectionSetup.vue') },
          { path: 'results', name: 'ViewResults', component: () => import('../pages/admin/ResultsAndAnalytics.vue') },
          { path: 'results/export', name: 'Report', component: () => import('../pages/admin/ResultsExport.vue') },
          { path: 'settings', name: 'SystemSettings', component: () => import('../pages/admin/SystemSettings.vue') },
          { path: 'support', name: 'AdminSupport', component: () => import('../pages/admin/AdminSupport.vue') },
        ],
      },
    ],
},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
