<script setup>
import { useAuthStore } from 'src/stores/auth-store'
import { ref } from 'vue';
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const ToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}


</script>

<template>
  <div class="top-bar">
    <!-- top green section -->
    <div class="top-section">
      <div class="contact-location" id="contact-info">
        <span class="contact">
          <q-icon name="phone" />
          <span>+237-XXX-XXXX</span>
        </span>
        <span class="contact">
          <q-icon name="email" />
          <span>Info@email.com</span>
        </span>
      </div>
      <div class="contact-location">
        <span class="contact">
          <q-icon name="location_on" />
          <span>Yaoundé, Centre Region, Cameroon</span>
        </span>
        <span class="contact">
          <q-icon name="access_time" />
          <span>8:00AM - 5:00PM</span>
        </span>
      </div>
    </div>

    <!-- Bottom section of the  top bar -->
    <div class="bottom-section">
      <div class="logo">
        <span>E-Elections</span>
        <q-btn icon="menu" flat dense class="menu-btn" @click="ToggleMenu" style="font-size: 30px;"/>
      </div>

      <div :class="isMenuOpen ? 'links-profile open-menu' : 'links-profile close-menu'">
        <div class="links">
          <router-link :to="{ name: 'VoterHome' }" class="link" exact-active-class="active-link"
            >Home</router-link
          >
          <router-link :to="{ name: 'ElectionTypes' }" class="link">Election Types</router-link>
          <router-link :to="{ name: 'VotersGuide' }" class="link">Voters Guide</router-link>
          <router-link :to="{ name: 'Candidates' }" class="link">Candidates</router-link>
          <router-link :to="{ name: 'Results' }" class="link">Election Results</router-link>
        </div>
        <div class="user-profile">
          <template v-if="authStore.formData.email.length === 0">
            <q-avatar color="primary" class="avatar" size="25px" text-color="white">
              <q-icon name="person" />
            </q-avatar>
            <!-- <router-link to="/login" id="link">Login</router-link> -->
            <q-btn to="/login" id="link" label="Login" flat/>
          </template>
          <template v-else>
            <q-avatar color="primary" class="avatar" size="25px" text-color="white">
              <q-icon name="person" />
            </q-avatar>
            <span class="username">{{ authStore.formData.email.split('@')[0] }}</span>
          </template>
        </div>
     </div>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top-section {
  height: 30%;
  background-color: #007a5e;
  padding: 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contact-location {
  gap: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: white;
}
.contact-location span {
  display: flex;
  align-items: center;
  gap: 5px;
}


.menu-btn{
  display: none;
}
.bottom-section {
  background-color: white;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007a5e;
  font-weight: bold;
  font-size: 24px;
}

.links-profile{
  display: flex;
  gap: 30px;
}

.links {
  display: flex;
  gap: 20px;
}
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-profile #link {
  color: #007a5e;
  text-decoration: none;
  padding: 3px 8px;
  border: 1px solid #007a5e;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  font-size: 11px;
}
.user-profile #link:hover {
  background-color: #007a5e;
  color: white;
}
a {
  color: black;
  text-decoration: none;
  padding: 1px 0px;
  transition: scale 0.3s ease;
}
a:hover {
  scale: 1.05;
}
.active-link {
  color: #007a5e;
  font-weight: bold;
  border-bottom: 3px solid #007a5e;
}

@media (max-width: 900px){
  .top-section{
    padding: 0 10px;
  }
  .bottom-section{
    padding: 10px;
  }


}
@media (max-width: 708px){

 .bottom-section{
    padding: 0px 15px;
    flex-direction: column;
  }
  .logo{
    width: 100%;
    justify-content: space-between;
  }
  .menu-btn{
    display: block;
  }
 .links-profile, .links{
    flex-direction: column;
  }

  .links-profile{
    width: 100%;
    padding: 10px;
  }
  .open-menu{
    max-height: 500px;
    opacity: 1;
    transition:  all 0.3s ease-in;
  }

  .close-menu{
    max-height: 0px;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;
  }


  a{
    width: 100%;
    border-bottom: 1px solid rgba(215, 213, 213, 0.587);
     padding-bottom: 5px;
  }

  a:hover{
    scale: 1;
    color: #007a5e;
  }

  .active-link {
    color: #007a5e;
    font-weight: bold;
  }

}

@media (max-width: 530px){
  .top-section{
    flex-direction: column;
  }
}
</style>
