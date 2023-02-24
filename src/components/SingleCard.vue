<template>
  <div class="card">
    <div class="card__data">
      <div class="card__info_main">{{ data.name }}</div>
      <div
        class="card__info_main"
        :class="{
          card__info_alive: data.status === 'Alive',
          card__info_dead: data.status === 'Dead',
          card__info_undefined: data.status === 'unknown',
        }"
      >
        {{ data.status }}
      </div>
    </div>
    <div class="card__data">
      <div class="card__info_extra">{{ data.gender }}</div>
      <div class="card__info_extra">{{ data.location }}</div>
    </div>
    <div class="card__placeholder">
      <img class="card__image" :alter="data.name" :src="data.image" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, PropType } from "vue";

const calculateWidth = (): void => {
  let res = document.querySelectorAll(".card__placeholder");

  res.forEach((elem) => {
    (elem as HTMLElement).style.width = `${elem.clientHeight.toString()}px`;
  });
};

const calculateCardSize = (): void => {
  let height = document.documentElement.clientHeight * 0.48;

  let res = document.querySelectorAll(".card");

  res.forEach((elem) => {
    (elem as HTMLElement).style.height = `${height.toString()}px`;
  });
};

type characterData = {
  id: number;
  name: string;
  status: string;
  location: string;
  gender: string;
  image: string;
};

export default {
  props: {
    data: {
      type: Object as PropType<characterData>,
      required: true,
    },
  },

  setup(props: any) {
    onMounted(() => {
      calculateCardSize();
      calculateWidth();
    });
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  // height: calc(50vh - 10%);
  height: 50vh;
}

.card__data {
  display: flex;
  justify-content: space-between;
}

.card__info {
  font-size: 12px;

  &_main {
    font-weight: 700;
    color: black;
  }

  &_extra {
    font-weight: 400;
    color: #8d8d8d;
  }

  &_alive {
    color: #00bd4c;
  }

  &_dead {
    color: #e50000;
  }

  &_undefined {
    color: #7b7b7b;
  }
}

.card__placeholder {
  background: gray;
  height: 100%;
  overflow: hidden;
}

.card__image {
  min-height: 100%;
  min-width: 100%;
  flex-shrink: 0;
}
</style>
