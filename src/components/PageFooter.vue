<template>
  <div class="footer">
    <p class="footer__display">
      <span
        @click="setCurrentPage(1)"
        v-if="currentPage && currentPage > 2"
        class="footer__pages"
        >1</span
      >
      <span v-if="currentPage && currentPage > 3" class="footer__pages"
        >...</span
      >
      <span
        @click="setCurrentPage(prevPage)"
        v-if="currentPage && currentPage > 1"
        class="footer__pages"
      >
        {{ prevPage }}
      </span>
      <span :value="currentPage" class="footer__pages footer__current">
        {{ currentPage }}
      </span>
      <span
        v-if="currentPage && currentPage < numberOfPages"
        @click="setCurrentPage(nextPage)"
        class="footer__pages"
      >
        {{ nextPage }}
      </span>
      <span
        v-if="currentPage && currentPage < numberOfPages - 2"
        class="footer__pages"
        >...</span
      >
      <span
        v-if="currentPage && currentPage < numberOfPages - 1"
        @click="setCurrentPage(numberOfPages)"
        class="footer__pages"
        >{{ numberOfPages }}</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
import {
  Ref,
  defineProps,
  defineEmits,
  toRefs,
  onMounted,
  ref,
  watchEffect,
} from "vue";

const props = defineProps({
  numberOfPages: {
    type: Number,
    required: true,
  },
  value: {
    requred: true,
    type: Number,
  },
});

const emit = defineEmits<{
  (e: "update:value", value: number): void;
}>();

const { numberOfPages, value: currentPage } = toRefs(props);

const setCurrentPage = (num: number) => {
  emit("update:value", num);
};

let prevPage: Ref = ref();
let nextPage: Ref = ref();

watchEffect(() => {
  prevPage.value = currentPage?.value - 1;
  nextPage.value = currentPage?.value + 1;
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100%;
  max-height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.9;
  padding: 0;
  &__pages {
    font-size: 20px;
    color: white;
    line-height: 30px;
    padding: 10px;
    cursor: pointer;
  }
  &__current {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>
