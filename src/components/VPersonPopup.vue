<template>
  <v-popup v-if="show && personCopy">
    <template #header>
      <h3>Имя Фамилия Сотрудника</h3>
    </template>

    <template #body>
      <div class="form">
        <div class="form-elem">
          <label class="form-elem-label">name</label>
          <input v-model="personCopy.name" type="text" />
        </div>

        <div class="form-elem">
          <label class="form-elem-label">email</label>
          <input v-model="personCopy.email" type="text" />
        </div>

        <div class="form-elem">
          <label class="form-elem-label">position</label>
          <select v-model="personCopy.position">
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

import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'VPersonPopup',
  components: { VPopup },

  props: {
    person: {
      required: true,
      validator: value => value === null || ['email', 'name'].every(key => key in value),
    },

    positions: {
      type: Array,
      default: () => [],
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    personCopy: null,
  }),

  methods: {
    onPersonCancelEdit() {
      this.$emit('cancel');
      this.personCopy = cloneDeep(this.person);
    },

    onPersonSaveEdit() {
      this.$emit('save', this.personCopy);
    },
  },

  watch: {
    person: {
      handler() {
        this.personCopy = cloneDeep(this.person);
      },

      deep: true,
    },
  },
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
