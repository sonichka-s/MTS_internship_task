<template>
  <div class="main">
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
import axios from "axios";
import { onMounted, ref, Ref, watchEffect } from "vue";

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
    async function LoadCards() {
      let resultData: Array<Character> = [];

      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/"
      );

      for (let i = 2; i < response.data.info.pages; i++) {
        let tempData: Array<Character> = [];

        const newPageResponse = await axios.get(
          "https://rickandmortyapi.com/api/character/",
          {
            params: {
              page: i,
            },
          }
        );

        tempData = newPageResponse.data.results.map((rawData: any) => ({
          id: rawData.id,
          name: rawData.name,
          gender: rawData.gender,
          status: rawData.status,
          location: rawData.location.name,
          image: rawData.image,
        }));

        resultData = [...resultData, ...tempData];
      }

      let firstResponseData = response.data.results.map((rawData: any) => ({
        id: rawData.id,
        name: rawData.name,
        gender: rawData.gender,
        status: rawData.status,
        location: rawData.location.name,
        image: rawData.image,
      }));

      resultData = [...firstResponseData, ...resultData];
      return resultData;
    }

    let size = ref(document.documentElement.clientWidth);
    const cardsPerPage = ref(0);
    const currentPage = ref(1);

    watchEffect(() => {
      size.value >= 769 ? (cardsPerPage.value = 4) : (cardsPerPage.value = 2);
    });

    const { dividedArray, numberOfPages } = usePagination<Character>({
      cardsPerPage,
      paginationArray: characterData,
      currentPage,
    });

    const handleScreenSize = () => {
      size.value = document.documentElement.clientWidth;
    };

    onMounted(async () => {
      window.addEventListener("resize", handleScreenSize);
      characterData.value = await LoadCards();
    });

    return {
      characterData,
      currentPage,
      numberOfPages,
      dividedArray,
      cardsPerPage,
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
