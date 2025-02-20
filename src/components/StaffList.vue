<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <button @click="openForm" class="add-button">
      Добавить {{ staffType }}
    </button>
    <table class="staff-table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Отделение</th>
          <th v-if="isDoctor">Заведующий</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in staffMembers" :key="member.id">
          <td>{{ member.name }}</td>
          <td>{{ member.department }}</td>
          <td v-if="isDoctor">{{ member.isHead ? "Да" : "Нет" }}</td>
          <td>
            <button @click="editMember(member)" class="edit-button">
              ✏️ Редактировать
            </button>
            <button @click="deleteMember(member.id)" class="delete-button">
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
      :isDoctor="isDoctor"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStaffStore } from "../store";
import { storeToRefs } from "pinia";
import StaffForm from "../components/StaffForm.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isDoctor: {
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
  props.isDoctor ? doctors.value : nurses.value
);

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
  const confirmMessage = props.isDoctor
    ? "Вы уверены, что хотите удалить этого врача?"
    : "Вы уверены, что хотите удалить эту медсестру?";
  if (confirm(confirmMessage)) {
    if (props.isDoctor) {
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

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.add-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.staff-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.edit-button,
.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button {
  background-color: #28a745;
  color: white;
}

.edit-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  margin-left: 5px; /* Отступ между кнопками */
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
