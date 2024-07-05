<template>
  <div>
    <q-layout>
        <Header />
        <q-page-container>
            <q-page>

    <div class="q-pa-md">
      <!-- <q-infinite-scroll @load="onLoad" :offset="250"> -->
      <q-infinite-scroll @load="loadMoreData" :offset="250">
        <q-table
          flat
          bordered
          title="Records"
          :rows="rowData"
          :columns="columns"
          row-key="id"
          :loading="loading">
          
          <template v-slot:body-cell-Avatar="props">
            <q-td :props="props">
              <q-avatar size="100px" class="shadow-4">
                <img :src="props.row.avatar" />
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <div style="display: flex; gap: 0.5rem">
                <q-btn
                  icon="edit"
                  round
                  outline
                  size="xs"
                  @click="openEditDialog(props.row)"
                  color="blue" />

                <q-btn
                  icon="delete"
                  round
                  outline
                  size="xs"
                  @click="openDeleteDialog(props.row)"
                  color="blue"
                />
              </div>
            </q-td>
          </template>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-table>
      </q-infinite-scroll>
    </div>

    <div v-if="dialog || confirm">
      <CustomButtonComponent
        :default="dialog"
        :rowData="selectedData"
        @update:default="handleUpdateDefault"
        @update:product="updateProduct"
        @update:confirm="handleUpdateConfirm"
        :confirm="confirm"
        @productDeleted="handleProductDeleted"
      />
    </div>
</q-page>
</q-page-container>
    </q-layout>

  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
const { notify } = useQuasar();

axios.defaults.baseURL = "https://667d325c297972455f63f9fc.mockapi.io";
const avatar = ref("");
const name = ref("");
const city = ref("");

const rowData = ref([]);

const dialog = ref(false);
const selectedData = ref({});
const visibleRows = ref([]);
const confirm = ref(false);
const productNameError = ref("");
const quantityError = ref("");
const makerNameError = ref("");
const loading = ref(false);
const notiMessage = ref("");

const openForm = ref(false);

const openFormHandler = () => {
  openForm.value = true;
};
console.log(openForm, "Open Form");

const closeDialogue = () => {
  openForm.value = false;
};

const showNotif = (position) => {
  notify({
    message: "inserted",
    color: "green",
    position,
  });
};


const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/user/data/records");

    rowData.value = response.data.map((product) => ({
      ...product,
      selected: false,
    })); 

    const updateVisibleRows = () => {
  // Assuming you want to show 20 rows at a time initially
  visibleRows.value = rowData.value.slice(0, 20);
};


    updateVisibleRows();

    console.log(updateVisibleRows(), 'update visible rows');

    console.log(rowData.value, "Row Data");
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

const openEditDialog = (r) => {
  console.log(r, "r");
  selectedData.value = r;
  dialog.value = true;
};
const openDeleteDialog = (r) => {
  console.log(r, "from delete");
  selectedData.value = r;
  confirm.value = true;
};
const handleUpdateDefault = (value) => {
  console.log(value, "value for dialog");
  dialog.value = value;
};
const handleUpdateConfirm = (value) => {
  console.log(value, "value for dialog");
  confirm.value = value;
};
const updateProduct = (product) => {
  console.log(product, "product");
  console.log(rowData.value, "row data value");

  rowData.value = rowData.value.map((row) => {
    if (row.id === product.id) {
      return product;
    } else {
      return row;
    }
    console.log(rowData, 'ROW DATA');

  });
};

const handleProductDeleted = (deletedProduct) => {
  rowData.value = rowData.value.filter(
    (product) => product.id !== deletedProduct.id
  );
};

const columns = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "Avatar", label: "avatar", field: "avatar", align: "left" },
  { name: "Name", align: "left", label: "name", field: "name", sortable: true },
  { name: "City", align: "left", label: "city", field: "city", sortable: true },
  {
    name: "Action",
    label: "Actions",
    field: "action",
    align: "left",
    sortable: false,
  },
];

const addProduct = async () => {
  productNameError.value = "";
  quantityError.value = "";
  makerNameError.value = "";

  if (name.value == "" || name.value == null) {
    productNameError.value = "required";
    return;
  }

  try {
    const productData = {
      avatar: avatar.value,
      name: name.value,
      city: city.value,
    };

    const response = await axios.post("/user/data/records", productData);
    console.log(response.data.msg, "response");

    fetchData();
    notiMessage.value = response.data.msg;
    console.log(notiMessage, "notiMessage");
    console.log(response.data.msg, "response.data.msg");

    showNotif("top-right");
  } catch (error) {
    if (error.response && error.response.data) {
      const errors = error.response.data;
      console.log(errors.error.product, "erross");

      if (errors.error.product) {
        productNameError.value = errors.error.product;
      }
      if (errors.error.quantity) {
        quantityError.value = errors.error.quantity;
      }
      if (errors.error.maker) {
        makerNameError.value = errors.error.maker;
      }
    } else {
      console.error("Error adding product:", error);
    }
  }
};

const updateVisibleRows = () => {
  // Assuming you want to show 20 rows at a time
  visibleRows.value = rowData.value.slice(0, 20);
};

const loadMoreData = async () => {
  // Assuming you want to load 20 more rows each time
  const currentLength = visibleRows.value.length;
  const newData = rowData.value.slice(currentLength, currentLength + 20);
  visibleRows.value = [...visibleRows.value, ...newData];
};


onMounted(() => {
  fetchData();
});
</script>
