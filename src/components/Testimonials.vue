<template>
  <section class="testimonials pt-15">
    <div class="left-testimonials">
      <span>Testimonials</span>
      <span class="stroke-text">What they</span>
      <span>say about us</span>

      <div
        v-if="selectedTestimonial"
        class="testimonial"
      >
        <span>{{ selectedTestimonial.review }}</span>

        <p>
          <span>{{ selectedTestimonial.name }}</span>
          - {{ selectedTestimonial.status }}
        </p>
      </div>
    </div>

    <div class="right-testimonials">
      <div></div>
      <div></div>
      <img
        :alt="selectedTestimonial.name"
        :src="selectedTestimonial.image"
      />

      <div class="arrows">
        <img
          alt="Left Arrow Icon"
          src="../assets/img/leftArrow.png"
          @click="changeToPreviousTestimonial"
        />
        <img
          alt="Right Arrow Icon"
          src="../assets/img/rightArrow.png"
          @click="changeToNextTestimonial"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { testimonialsData } from "@/data/testimonialsData";

export default defineComponent({
  name: "TestimonialsSection",

  setup () {
    const selectedTestimonialIndex = ref(0);
    const lastTestimonialIndex = testimonialsData.length - 1;

    const selectedTestimonial = computed(() => {
      return testimonialsData[selectedTestimonialIndex.value];
    });

    const changeToNextTestimonial = () => {
      if (selectedTestimonialIndex.value === lastTestimonialIndex) {
        selectedTestimonialIndex.value = 0;
        return;
      }

      selectedTestimonialIndex.value += 1;
    };

    const changeToPreviousTestimonial = () => {
      if (selectedTestimonialIndex.value === 0) {
        selectedTestimonialIndex.value = lastTestimonialIndex;
        return;
      }

      selectedTestimonialIndex.value -= 1;
    };

    return {
      selectedTestimonial,
      changeToNextTestimonial,
      changeToPreviousTestimonial,
    }
  }
})
</script>

<style scoped>
.testimonials {
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
}

.left-testimonials {
  color: #b2b2b2;
  font-weight: bold;
  text-transform: uppercase;

  display: flex;
  flex: 1 1;
  flex-direction: column;
  gap: 2rem;
}

.left-testimonials > :nth-child(1) {
  color: var(--orange);
}

.left-testimonials > :nth-child(2),
.left-testimonials > :nth-child(3) {
  font-size: 3rem;
}

.testimonial {
  font-weight: normal;
  letter-spacing: 2px;
  line-height: 40px;
  text-align: justify;
  text-transform: none;
}

.testimonial > p > span {
  color: var(--orange);
}

.right-testimonials {
  flex: 1;
  position: relative;
}

.right-testimonials > :nth-child(1) {
  background-color: transparent;
  border: 2px solid rgb(0, 17, 255);
  height: 20rem;
  position: absolute;
  right: 9rem;
  top: 0.9rem;
  width: 16rem;
}

.right-testimonials > :nth-child(2) {
  background: var(--planCard);
  height: 18rem;
  position: absolute;
  right: 7rem;
  top: 5rem;
  width: 16rem;
}

.right-testimonials > img {
  height: 20rem;
  object-fit: cover;
  position: absolute;
  right: 8rem;
  top: 2rem;
  width: 16rem;
}

.arrows {
  bottom: 1rem;
  display: flex;
  gap: 1rem;
  left: 3rem;
  position: absolute;
}

.arrows > img {
  cursor: pointer;
  width: 1.5rem;
}

</style>
