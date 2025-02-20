<script setup>
import { ref, computed, onMounted } from "vue";
import { useStaffStore } from "@/store";
import { storeToRefs } from "pinia";
import StaffForm from "@/components/StaffForm.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isManager: {
    type: Boolean,
    default: true,
  },
});

const staffStore = useStaffStore();
const isFormVisible = ref(false);
const isEdit = ref(false);
const currentMember = ref(null);
const { doctors, nurses } = storeToRefs(staffStore);

const staffMembers = computed(() =>
  props.isManager ? doctors.value : nurses.value
);

const isHeadText = (member) => (member.isHead ? "Да" : "Нет");

const staffType = computed(() => (props.isManager ? "врача" : "медсестру"));

onMounted(() => {
  staffStore.loadDoctors();
  staffStore.loadNurses();
});

const openForm = () => {
  isEdit.value = false;
  currentMember.value = null;
  isFormVisible.value = true;
};

const editMember = (member) => {
  currentMember.value = member;
  isEdit.value = true;
  isFormVisible.value = true;
};

const deleteMember = (memberId) => {
  const confirmMessage = props.isManager
    ? "Вы уверены, что хотите удалить этого врача?"
    : "Вы уверены, что хотите удалить эту медсестру?";
  if (confirm(confirmMessage)) {
    if (props.isManager) {
      staffStore.deleteDoctor(memberId);
    } else {
      staffStore.deleteNurse(memberId);
    }
  }
};

const closeForm = () => {
  isFormVisible.value = false;
  currentMember.value = null;
  isEdit.value = false;
};
</script>

<template>
  <div class="staff">
    <h1 class="staff__title">{{ title }}</h1>
    <button @click="openForm" class="staff__add-button">
      Добавить {{ staffType }}
    </button>
    <table class="staff-table">
      <thead class="staff-table__header">
        <tr class="staff-table__row">
          <th class="staff-table__cell">ФИО</th>
          <th class="staff-table__cell">Отделение</th>
          <th v-if="isManager" class="staff-table__cell">Заведующий</th>
          <th class="staff-table__cell">Действия</th>
        </tr>
      </thead>
      <tbody class="staff-table__body">
        <tr
          v-for="member in staffMembers"
          :key="member.id"
          class="staff-table__row"
        >
          <td class="staff-table__cell">{{ member.name }}</td>
          <td class="staff-table__cell">{{ member.department }}</td>
          <td v-if="isManager" class="staff-table__cell">
            {{ isHeadText(member) }}
          </td>
          <td class="staff-table__cell staff-table__cell--actions">
            <button
              @click="editMember(member)"
              class="staff__button staff__button--edit"
            >
              ✏️ Редактировать
            </button>
            <button
              @click="deleteMember(member.id)"
              class="staff__button staff__button--delete"
            >
              ❌ Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <StaffForm
      v-if="isFormVisible"
      @close="closeForm"
      :isEdit="isEdit"
      :staffMember="currentMember"
      :isManager="isManager"
    />
  </div>
</template>

<style lang="scss" scoped>
.staff {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  &__add-button {
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  &__button {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &--edit {
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }
    }

    &--delete {
      background-color: #dc3545;
      color: white;
      margin-left: 5px;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}

.staff-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &__header {
    background-color: #007bff;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
  }

  &__row {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  &__cell {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;

    &--actions {
      white-space: nowrap;
    }
  }
}
</style>
