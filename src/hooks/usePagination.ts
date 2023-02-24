import { Ref, computed } from "vue";

interface paginationConfig<T> {
  cardsPerPage: Ref<number>;
  paginationArray: Ref<T[]>;
  currentPage: Ref<number>;
}

export function usePagination<T>(config: paginationConfig<T>) {
  const cardsPerPage = config.cardsPerPage;

  const dividedArray = computed(() =>
    config.paginationArray.value.slice(
      cardsPerPage.value * (config.currentPage.value - 1),
      cardsPerPage.value * config.currentPage.value
    )
  );

  const numberOfPages = computed(() =>
    Math.ceil((config.paginationArray.value.length || 0) / cardsPerPage.value)
  );

  return {
    dividedArray,
    numberOfPages,
  };
}
