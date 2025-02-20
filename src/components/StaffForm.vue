<script setup>
import { ref, watch } from "vue";
import { useStaffStore } from "@/store";

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
  isManager: {
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
    if (props.isManager) {
      staffStore.editDoctor({ ...form.value, id: props.staffMember.id });
    } else {
      staffStore.editNurse({ ...form.value, id: props.staffMember.id });
    }
  } else {
    const newId = Math.max(...staffStore.doctors.map((d) => d.id), 0) + 1;
    if (props.isManager) {
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

<template>
  <div class="form">
    <h2 class="form__title">
      {{ isEdit ? "Редактировать" : "Добавить" }} сотрудника
    </h2>
    <form @submit.prevent="handleSubmit" class="form__body">
      <input
        v-model="form.name"
        placeholder="ФИО"
        required
        class="form__input"
      />
      <select v-model="form.department" required class="form__select">
        <option value="">Выберите отделение</option>
        <option value="Кардиология">Кардиология</option>
        <option value="Хирургия">Хирургия</option>
      </select>
      <div v-if="isManager" class="form__checkbox-container">
        <label class="form__checkbox-label">
          <input type="checkbox" v-model="form.isHead" class="form__checkbox" />
          Заведующий
        </label>
      </div>
      <div class="form__buttons">
        <button type="submit" class="form__button">
          {{ isEdit ? "Сохранить" : "Добавить" }}
        </button>
        <button
          type="button"
          @click="emitClose"
          class="form__button form__button--cancel"
        >
          Отменить
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(to bottom right, #f0f4f8, #cfe9ff);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &__title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__input,
  &__select {
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

  &__checkbox-container {
    margin-bottom: 20px;
  }

  &__checkbox {
    margin-right: 8px;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;
    background-color: #007bff;
    color: white;

    &:hover {
      transform: translateY(-2px);
      background-color: #0056b3;
    }

    &--cancel {
      background-color: #f44336;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}
</style>
