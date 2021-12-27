<template>
  <v-popup
    v-if="show && personCopy"
    @submit.native.prevent="onPersonSaveEdit"
  >
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
        <button
          class="outline"
          @click="onPersonCancelEdit"
        >
          Отменить
        </button>

        <button :disabled="!isValidToSavePerson">
          Сохранить
        </button>
      </div>
    </template>
  </v-popup>
</template>

<script>
import VPopup from '@/components/VPopup.vue';

import { convertObjectWithoutFields } from '@/_utils/converter';
import { validateName, validateEmail } from '@/_utils/validator';

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

  computed: {
    isValidToSavePerson() {
      if (!this.person) return false;

      const hasEdittedField = Object
        .keys(convertObjectWithoutFields(this.person, ['comments']))
        .some(key => this.person[key] !== this.personCopy[key]);

      if (!hasEdittedField) return false;

      return validateName(this.personCopy.name) && validateEmail(this.personCopy.email);
    },
  },

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
