<template>
  <v-popup @submit.native.prevent="onPersonSaveEdit">
    <template #header>
      <h3>{{ person.name }}</h3>
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

      <v-popup
        v-if="isValidToSavePerson && isClickedCancel"
        @submit.native.prevent="confirmRevert"
      >
        <template #header>
          <h3>Вы действительно хотите отменить изменения?</h3>
        </template>

        <template #footer>
          <div class="popup-btn-group">
            <button
              class="outline"
              type="button"
              @click="cancelRevert"
            >
              Нет
            </button>

            <button type="submit" :disabled="!isValidToSavePerson">
              Да
            </button>
          </div>
        </template>
      </v-popup>
    </template>

    <template #footer>
      <div class="popup-btn-group">
        <button
          class="outline"
          type="button"
          @click="onPersonCancelEdit"
        >
          Отменить
        </button>

        <button type="submit" :disabled="!isValidToSavePerson">
          Сохранить
        </button>
      </div>
    </template>
  </v-popup>
</template>

<script>
import VPopup from '@/components/VPopup.vue';

import { excludeFields } from '@/_utils/converter';
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
  },

  data: () => ({
    personCopy: null,
    isClickedCancel: false,
  }),

  computed: {
    hasChanges() {
      return !!this.person && Object
        .keys(excludeFields(this.person, ['comments']))
        .some(key => this.person[key] !== this.personCopy[key]);
    },

    isValidToSavePerson() {
      if (!this.person) return false;

      if (!this.hasChanges) return false;

      return validateName(this.personCopy.name) && validateEmail(this.personCopy.email);
    },
  },

  methods: {
    onPersonCancelEdit() {
      this.isClickedCancel = true;

      if (!this.hasChanges) {
        this.confirmRevert();
      }
    },

    confirmRevert() {
      this.$emit('cancel');
    },

    cancelRevert() {
      this.isClickedCancel = false;
    },

    onPersonSaveEdit() {
      this.$emit('save', this.personCopy);
    },
  },

  created() {
    this.personCopy = cloneDeep(this.person);
  },
}
</script>

<style lang="pcss" scoped>
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
