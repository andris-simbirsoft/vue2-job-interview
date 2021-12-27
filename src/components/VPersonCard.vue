<template>
  <div class="card">
    <div class="card-avatar">
      <v-person-card-avatar :url="person.avatar"></v-person-card-avatar>

      <div v-if="person.comments">
        {{ person.comments.length }}
      </div>
    </div>

    <div class="card-info">
      <div class="card-info__title">
        <div class="card-info__title-name">
          {{ person.name }}
        </div>

        <span
          class="card-info__title-button"
          @click="onPersonEdit"
        >
          edit
        </span>
      </div>

      <div class="card-info__email">{{ person.email }}</div>
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
  background: white;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);

  &-avatar {
    position: relative;
    margin-right: 1rem;
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
