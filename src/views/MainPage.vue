<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>
    <div v-if="isError">Возникла ошибка</div>
    <page-footer
      :value="currentPage"
      :numberOfPages="numberOfPages"
      @update:value="(newValue) => (currentPage = newValue)"
    ></page-footer>
    <div class="cards__grid" :class="{ loaging: isLoading === true }">
      <single-card
        v-for="c in characterData"
        :key="c.id"
        :data="c"
        :class="{
          cards__item_left: c.id % 2 !== 0,
          cards__item_right: c.id % 2 === 0,
        }"
      ></single-card>
    </div>
  </div>
</template>

<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import PageFooter from "@/components/PageFooter.vue";
import { onMounted, ref, Ref, watchEffect, computed } from "vue";
import { $url, CHARACTER_URL } from "@/axios/config";
import {
  BREAKPOINT_MD,
  CARDS_PER_PAGE_L,
  CARDS_PER_PAGE_S,
} from "@/utils/utils";

export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  location: string;
  image: string;
}

export default {
  components: {
    SingleCard,
    PageFooter,
  },

  setup() {
    const characterData: Ref<Character[]> = ref([]);
    const totalCharacterAmount = ref(0);

    const isLoading = ref(false);
    const isError = ref(false);

    const size = ref(document.documentElement.clientWidth);
    const cardsPerPage = ref(0);
    const currentPage = ref(1);

    const numberOfPages = computed(() =>
      Math.ceil(totalCharacterAmount.value / cardsPerPage.value)
    );

    const parseResponse = (res: Array<any>): Character[] => {
      return res.map((rawData: any) => ({
        id: rawData.id,
        name: rawData.name,
        gender: rawData.gender,
        status: rawData.status,
        location: rawData.location.name,
        image: rawData.image,
      }));
    };

    async function getTotalCount() {
      return await (
        await $url(CHARACTER_URL)
      ).data.info.count;
    }

    async function LoadPage(pageNum: number) {
      let paramArray = [];

      for (
        let i = cardsPerPage.value * (pageNum - 1) + 1;
        i < cardsPerPage.value * pageNum + 1;
        i++
      ) {
        paramArray.push(i);
      }

      isLoading.value = true;
      const response = await $url(`${CHARACTER_URL}${paramArray.join(",")}`);
      isLoading.value = false;

      return Array.isArray(response.data) ? parseResponse(response.data) : null;
    }

    watchEffect(async () => {
      try {
        const data = await LoadPage(currentPage.value);
        if (data) {
          characterData.value = data;
        }
      } catch (err) {
        console.log(`error in ${currentPage.value} page:`, err);
        isError.value = true;
      }
    });

    watchEffect(() => {
      size.value >= BREAKPOINT_MD
        ? (cardsPerPage.value = CARDS_PER_PAGE_L)
        : (cardsPerPage.value = CARDS_PER_PAGE_S);
    });

    const handleScreenSize = () => {
      size.value = document.documentElement.clientWidth;
    };

    onMounted(async () => {
      window.addEventListener("resize", handleScreenSize);
      try {
        totalCharacterAmount.value = await getTotalCount();
      } catch {
        console.log("error in character amount");
        isError.value = true;
      }
      try {
        const data = await LoadPage(currentPage.value);
        if (data) {
          characterData.value = data;
        }
      } catch (err) {
        console.log("error in first page:", err);
        isError.value = true;
      }
    });

    return {
      characterData,
      currentPage,
      numberOfPages,
      cardsPerPage,
      isLoading,
      isError,
    };
  },
};
</script>

<style lang="scss">
.loaging {
  display: none;
}

.cards__grid {
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 50vh;
  gap: 30px;
  row-gap: 20px;
  height: 100%;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  @media screen and (max-width: $screen-md) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.cards__item_left {
  justify-self: center;
  @media screen and (min-width: $screen-md) {
    justify-self: end;
  }
}

.cards__item_right {
  justify-self: center;
  @media screen and (min-width: $screen-md) {
    justify-self: start;
  }
}
</style>
