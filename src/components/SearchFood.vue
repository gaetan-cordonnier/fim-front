<template>
  <q-select filled :options="options" hide-dropdown-icon>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <!-- <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section> -->
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({ label: String, icon: String });

const emits = defineEmits(["update-model"]);

const stringOptions = ref([]);
const options = ref(stringOptions);

onMounted(() => {
  getAllFoods();
});

function getAllFoods() {
  const data = [
    { id: 1, name: "Tomate", img: "nutrition" },
    { id: 2, name: "Lait", img: "water_full" },
    { id: 3, name: "Oeuf", img: "egg" },
    { id: 4, name: "Beurre", img: "nutrition" },
    { id: 5, name: "Carottes", img: "nutrition" },
  ];
  data.forEach((element) => {
    element.label = element.name;
    element.value = element.name;
    delete element.name;
    stringOptions.value.push(element);
  });
}
// function filterFn(val, update) {
//     update(() => {
//       const needle = val.toLowerCase();
//       options.value = stringOptions.value.filter(
//         (v) => v.toLowerCase().indexOf(needle) > -1
//       );
//     });
//   },
</script>
