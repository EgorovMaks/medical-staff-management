import { defineStore } from "pinia";
import { Doctor, Nurse } from "@/store/types";

export const useStaffStore = defineStore("staff", {
  state: () => ({
    doctors: [] as Doctor[],
    nurses: [] as Nurse[],
  }),
  actions: {
    async loadDoctors() {
      const response = await fetch("../../mock-data/doctors.json");
      this.doctors = await response.json();
    },
    async loadNurses() {
      const response = await fetch("/mock-data/nurses.json");
      this.nurses = await response.json();
    },
    addDoctor(newDoctor: Doctor) {
      this.doctors.push(newDoctor);
    },
    editDoctor(updatedDoctor: Doctor) {
      const index = this.doctors.findIndex(
        (doctor) => doctor.id === updatedDoctor.id
      );
      if (index !== -1) {
        this.doctors[index] = updatedDoctor;
      }
    },
    deleteDoctor(doctorId: number) {
      this.doctors = this.doctors.filter((doctor) => doctor.id !== doctorId);
    },
    addNurse(newNurse: Nurse) {
      this.nurses.push(newNurse);
    },
    editNurse(updatedNurse: Nurse) {
      const index = this.nurses.findIndex(
        (nurse) => nurse.id === updatedNurse.id
      );
      if (index !== -1) {
        this.nurses[index] = updatedNurse;
      }
    },
    deleteNurse(nurseId: number) {
      this.nurses = this.nurses.filter((nurse) => nurse.id !== nurseId);
    },
  },
});
