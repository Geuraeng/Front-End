<script setup>
// example component
import { onMounted } from "vue";
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import emma from "@/assets/img/travel.png";

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="row" style="overflow: auto">
    <div class="col-12">
      <div class="card card-profile">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mt-n5">
            <a :href="props.plan.planIdx">
              <div class="p-3 pe-md-0">
                <img
                  class="w-70 border-radius-md shadow-lg"
                  :src="emma"
                  :alt="props.plan.planIdx"
                />
              </div>
            </a>
          </div>
          <div class="col-lg-8 col-md-6 col-12 my-auto">
            <RouterLink :to="'/plan/detail/' + props.plan.planIdx" :planIdx="props.plan.planIdx">
              <div class="card-body ps-lg-0">
                <h3>{{ props.plan.planTitle }}</h3>
                <br />
                <p class="mb-0">
                  {{ props.plan.planDate }}
                </p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>
