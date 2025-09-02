<script setup lang="ts">
import TopBar from 'src/components/navigations/TopBar.vue';

</script>

<template>
  <div class="voter-layout">
    <div class="nav-sec">
      <TopBar />
    </div>
    <div class="content-sec">
      <q-layout view="lHh Lpr lFf" container>
        <q-footer style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #007a5e; color: white; padding: 5px 0">
          <span>
            <q-icon name="copyright"/>
            2025 VoteCameroon Digital Platform. Powered by E-Election.
          </span>
          <span>Secured with blockchain technology • Bilingual support • Accessible design</span>
        </q-footer>

        <q-page-container>
          <q-page >

            <router-view />

            <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
              <q-btn fab icon="keyboard_arrow_up" color="primary" />
            </q-page-scroller>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.voter-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.nav-sec {
  border-bottom: 1px solid #04c296;
}

.content-sec {
  flex: 1;
  background-color: #ffffff;
  height: 89%;
}
</style>
