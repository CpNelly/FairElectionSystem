<script setup>

const sections = defineModel([
 {
  title: String,
  show : {
    type: Boolean,
    default: true
  },
  link: [
    {
      title: String,
      to: {
        name: String,
        param: {
          id: String,
        }
      },
      icon: String
    }
  ]
 }
])


</script>

<template>
  <div class="link-section" v-for="(section, secIndex) in sections" :key="secIndex" >
    <q-expansion-item :label="section.title" :default-opened="section.show" dense>
      <template v-for="(link, linkIndex) in section.links" :key="linkIndex">
        <router-link :to="link.to" exact-active-class="active-link">
          <template v-slot:default>
            <q-icon :name="link.icon" />
            <span>{{ link.title }}</span>
          </template>
        </router-link>
      </template>
    </q-expansion-item>
  </div>
</template>

<style scoped>
  .link-section {
    margin-top: 15px;
  }
  a{
    text-decoration: none;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background-color: #92d4cdce;
    color: #007a5e;
    font-size: small;
    transition: background-color 0.5s ease-in-out;
  }
  .active-link{
    background-color: #007a5e;
    color: white;

  }
  a:hover{
    background-color: #007a5e;
    color: #ffffff;
  }


</style>
