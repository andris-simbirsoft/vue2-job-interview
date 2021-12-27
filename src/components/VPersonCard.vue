<template>
  <div class="card">
    <table style="width: 100%">
      <tr>
        <td style="width: 0">
          <div class="card-avatar">
            <v-person-card-avatar :url="person.avatar"></v-person-card-avatar>
            <div v-if="person.comments">
              {{ person.comments.length }}
            </div>
          </div>
        </td>
        <td style="max-width: 0">
          <div class="card-name">
            <b>{{ person.name }}</b>
          </div>
          <div class="card-email">{{ person.email }}</div>
        </td>
        <td style="width: 0">
          <span class="action-btn" @click="onPersonEdit">edit</span>
        </td>
      </tr>
    </table>
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
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);

  &-avatar {
    position: relative;
    margin-right: 1rem;

    &-email {
      font-size: var(--font-size-small);
    }

    &-email,
    &-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
