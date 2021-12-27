<template>
  <v-popup v-if="show">
    <template #header>
      <h3>Имя Фамилия Сотрудника</h3>
    </template>

    <template #body>
      <div class="form">
        <div class="form-elem">
          <label class="form-elem-label">name</label>
          <input type="text" />
        </div>

        <div class="form-elem">
          <label class="form-elem-label">email</label>
          <input type="text" />
        </div>

        <div class="form-elem">
          <label class="form-elem-label">position</label>
          <select>
            <option
              v-for="(value, positionIdx) in positions"
              :value="value"
              :key="positionIdx"
            >
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="popup-btn-group">
        <button class="outline" @click="onPersonCancelEdit">Отменить</button>
        <button @click="onPersonSaveEdit">Сохранить</button>
      </div>
    </template>
  </v-popup>
</template>

<script>
import VPopup from '@/components/VPopup.vue';

export default {
  name: 'VPersonPopup',
  components: { VPopup },

  props: {
    positions: {
      type: Array,
      default: () => [],
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onPersonCancelEdit() {
      this.$emit('cancel');
    },

    onPersonSaveEdit() {
      this.$emit('save');
    },
  }
}
</script>

<style lang="postcss" scoped>
.form {
  width: 25rem;

  &-elem {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    &-label {
      display: block;
      font-size: var(--font-size-small);
      text-transform: uppercase;
      opacity: 0.5;
    }
  }
}

.popup-btn-group {
  text-align: right;

  button {
    margin-left: 1rem;
  }
}
</style>
