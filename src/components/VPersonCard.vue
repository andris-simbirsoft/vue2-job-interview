<template>
  <div class="card">
    <div class="card-avatar">
      <v-person-card-avatar :url="person.avatar" />

      <div v-if="person.comments.length" class="card-avatar__comments">
        {{ person.comments.length }}
      </div>
    </div>

    <div class="card-info">
      <div class="card-info__title">
        <div class="card-info__title-name">
          <slot name="personName" :person="person">
            {{ person.name }}
          </slot>
        </div>

        <span
          class="card-info__title-button"
          @click="onPersonEdit"
        >
          edit
        </span>
      </div>

      <div class="card-info__email">
        <slot name="personEmail" :person="person">
          {{ person.email }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import VPersonCardAvatar from '@/components/VPersonCardAvatar.vue';

export default {
  name: 'VPersonCard',

  components: { VPersonCardAvatar },

  props: {
    person: {
      required: true,
      validator: value => ['email', 'name', 'avatar'].every(key => key in value),
    },
  },

  methods: {
    onPersonEdit() {
      this.$emit('edit', this.person);
    },
  },
};

</script>

<style lang="pcss" scoped>
.card {
  display: flex;

  padding: 1rem;
  background-color: var(--color-white);
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);

  &-avatar {
    position: relative;
    margin-right: 1rem;

    &__comments {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);

      text-align: center;

      min-width: 17px;
      height: 17px;

      background-color: var(--color-primary);
      color: var(--color-white);
      font-size: var(--font-size-small);
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    flex: 1;

    &__title {
      display: flex;
      justify-content: space-between;

      &-button {
        color: var(--color-primary);
        font-size: var(--font-size-small);
        border-bottom: 1px dashed currentColor;
        cursor: pointer;
      }
    }

    &__title-name, &__email {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__email {
      font-size: var(--font-size-small);
    }
  }
}
</style>
