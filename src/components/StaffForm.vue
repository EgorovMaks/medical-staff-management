<template>
  <div class="form-container">
    <h2 class="form-title">
      {{ isEdit ? "Редактировать" : "Добавить" }} сотрудника
    </h2>
    <form @submit.prevent="handleSubmit" class="staff-form">
      <input
        v-model="form.name"
        placeholder="ФИО"
        required
        class="form-input"
      />
      <select v-model="form.department" required class="form-select">
        <option value="">Выберите отделение</option>
        <option value="Кардиология">Кардиология</option>
        <option value="Хирургия">Хирургия</option>
      </select>
      <div v-if="isDoctor" class="checkbox-container">
        <label>
          <input type="checkbox" v-model="form.isHead" class="form-checkbox" />
          Заведующий
        </label>
      </div>
      <div class="button-container">
        <button type="submit" class="form-button">
          {{ isEdit ? "Сохранить" : "Добавить" }}
        </button>
        <button type="button" @click="emitClose" class="form-button cancel">
          Отменить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStaffStore } from "../store";

const emit = defineEmits(["close"]);

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  staffMember: {
    type: Object,
    default: () => ({}),
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
});

const staffStore = useStaffStore();
const form = ref({
  name: "",
  department: "",
  isHead: false,
});

watch(
  () => props.staffMember,
  (newVal) => {
    if (props.isEdit) {
      form.value = { ...newVal };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (props.isEdit) {
    if (props.isDoctor) {
      staffStore.editDoctor({ ...form.value, id: props.staffMember.id });
    } else {
      staffStore.editNurse({ ...form.value, id: props.staffMember.id });
    }
  } else {
    const newId = Math.max(...staffStore.doctors.map((d) => d.id), 0) + 1;
    if (props.isDoctor) {
      staffStore.addDoctor({ ...form.value, id: newId });
    } else {
      staffStore.addNurse({ ...form.value, id: newId });
    }
  }
  form.value = { name: "", department: "", isHead: false };
  emitClose();
};

const emitClose = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(to bottom right, #f0f4f8, #cfe9ff);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.staff-form {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-select {
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
}

.checkbox-container {
  margin-bottom: 20px;
}

.form-checkbox {
  margin-right: 8px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.form-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;

  &.cancel {
    background-color: #f44336;
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:not(.cancel):hover {
    background-color: #0056b3;
    color: white;
  }

  &:focus {
    outline: none;
  }
}
</style>
