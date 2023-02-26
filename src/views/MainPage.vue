<template>
  <div class="main">
    <div v-if="isLoading">Загрузка...</div>
    <page-footer
      :value="currentPage"
      :numberOfPages="numberOfPages"
      @update:value="(newValue) => (currentPage = newValue)"
    ></page-footer>
    <div class="cards__grid">
      <single-card
        v-for="c in dividedArray"
        :key="c.id"
        :data="c"
        class="cards__item_right"
      ></single-card>
    </div>
  </div>
</template>

<script lang="ts">
import SingleCard from "@/components/SingleCard.vue";
import PageFooter from "@/components/PageFooter.vue";
import { usePagination } from "@/hooks/usePagination";
import { onMounted, ref, Ref, watchEffect } from "vue";
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
    let characterData: Ref<Character[]> = ref([]);
    let totalCharacterAmount = ref(0);
    let loadedPagesAmount = 0;
    let isLoading = ref(false);

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

    async function LoadFirstPage() {
      const response = await $url(CHARACTER_URL);
      const count = response.data.info.count;
      loadedPagesAmount++;

      return [parseResponse(response.data.results), count];
    }

    async function LoadNextPage(pageNum: number) {
      isLoading.value = true;
      const response = await $url(CHARACTER_URL, {
        params: {
          page: pageNum,
        },
      });

      return parseResponse(response.data.results);
    }

    let size = ref(document.documentElement.clientWidth);
    const cardsPerPage = ref(0);
    const currentPage = ref(1);

    watchEffect(async () => {
      if (
        currentPage.value * cardsPerPage.value >= characterData.value.length &&
        characterData.value.length < totalCharacterAmount.value
      ) {
        characterData.value = [
          ...characterData.value,
          ...(await LoadNextPage(++loadedPagesAmount)),
        ];
        isLoading.value = false;
      }
    });

    watchEffect(() => {
      size.value >= BREAKPOINT_MD
        ? (cardsPerPage.value = CARDS_PER_PAGE_L)
        : (cardsPerPage.value = CARDS_PER_PAGE_S);
    });

    const { dividedArray, numberOfPages } = usePagination<Character>({
      cardsPerPage,
      paginationArray: characterData,
      currentPage,
      totalCharacterAmount,
    });

    const handleScreenSize = () => {
      size.value = document.documentElement.clientWidth;
    };

    onMounted(async () => {
      window.addEventListener("resize", handleScreenSize);
      [characterData.value, totalCharacterAmount.value] = await LoadFirstPage();
    });

    return {
      characterData,
      currentPage,
      numberOfPages,
      dividedArray,
      cardsPerPage,
      isLoading,
    };
  },
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}

.cards__grid {
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
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
    justify-self: center;
  }
}
</style>
