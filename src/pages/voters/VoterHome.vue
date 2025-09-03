<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path) => {
  router.push(path);
};

const openLink = (url) => {
  window.open(url, '_blank');
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>


<template>
  <q-page class="landing-page-container">
    <section class="hero-section text-white text-center q-py-xl">
      <div class="q-px-md">
        <div class="text-h2 text-weight-bolder q-mb-md">Democracy Digitized</div>
        <div class="text-h6 q-mb-lg">
          Experience the future of voting in Cameroon. Secure, transparent, and accessible digital democracy for every citizen.
        </div>
        <q-btn
          color="accent"
          size="lg"
          label="Check My Voter Status"
          icon="check_circle"
          @click="goToPage('/dashboard')"
          class="q-mr-md"
        />
        <q-btn
          outline
          color="white"
          size="lg"
          label="Learn About ELECAM"
          icon="info"
          @click="scrollToSection('about-elecam')"
        />
      </div>
    </section>

    <div class="q-pa-xl">
      <div class="row q-col-gutter-lg">
        <div class="col-xs-12 col-md-4">
          <q-card class="full-height text-center">
            <q-card-section>
              <q-icon name="how_to_reg" size="60px" color="primary" />
              <div class="text-h5 q-mt-md text-primary text-bold">Voter Registration</div>
            </q-card-section>
            <q-card-section>
              <p>
                Find out if you are registered to vote and access information on the
                registration process. Your participation starts here!
              </p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat color="primary" label="Register Now" @click="goToPage('/register')" />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-xs-12 col-md-4">
          <q-card class="full-height text-center">
            <q-card-section>
              <q-icon name="event_note" size="60px" color="primary" />
              <div class="text-h5 q-mt-md text-primary text-bold">Elections Calendar</div>
            </q-card-section>
            <q-card-section>
              <p>
                Stay up-to-date with all upcoming presidential, legislative,
                and senatorial election dates.
              </p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat color="primary" label="View Calendar" @click="goToPage('/calendar')" />
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-xs-12 col-md-4">
          <q-card class="full-height text-center">
            <q-card-section>
              <q-icon name="gavel" size="60px" color="primary" />
              <div class="text-h5 q-mt-md text-primary text-bold">Official Information</div>
            </q-card-section>
            <q-card-section>
              <p>
                Access the official electoral code and guidelines from Elections
                Cameroon (ELECAM) to understand your rights.
              </p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat color="primary" label="Read More" @click="openLink('https://elecam.cm')" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <section id="about-elecam" class="q-pa-xl bg-grey-2">
      <div class="row items-center">
        <div class="col-xs-12 col-md-6 q-pr-md">
          <div class="text-h4 text-primary text-bold q-mb-md">
            Elections Cameroon (ELECAM)
          </div>
          <p class="text-body1 q-mb-md">
            ELECAM is the independent body responsible for organizing, managing,
            and supervising all election and referendum operations in Cameroon.
            Their mission is to ensure transparent and credible polls in strict
            compliance with the country's Constitution and electoral laws.
          </p>
          <p class="text-body1">
            This platform is designed to complement their work by making
            essential voter information easily accessible to everyone.
          </p>
        </div>
        <div class="col-xs-12 col-md-6 text-center">
          <!-- <q-img
            src="../../assets/elecam.png"
            alt="ELECAM Building"
            ratio="16/9"
            style="border-radius: 8px;"
          /> -->
          <img src="../../assets/elecam-building.jpg" alt="ELECAM Building" style="border-radius: 8px; width: 80%; height: 80%;" />
        </div>
      </div>
    </section>
  </q-page>
</template>


<style lang="scss" scoped>
.landing-page-container {
  background-color: #ffffff;
}

.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assets/b2b6f563e61e448fb2dff8ca6780faa3_18.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
}

</style>
