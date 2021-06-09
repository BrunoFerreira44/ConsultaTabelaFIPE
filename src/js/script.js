const apiURL = "https://parallelum.com.br/fipe/api/v1";

const dropKind = document.querySelector("select[name='kind']");
const dropBrand = document.querySelector("select[name='brand']");
const dropModel = document.querySelector("select[name='model']");
const dropYear = document.querySelector("select[name='year']");

////////////////////////////////////////////////////////////////////////////////////////////////
//// Resetores dos comboboxes
////////////////////////////////////////////////////////////////////////////////////////////////

function kindResetor() {
   dropBrand.selectedIndex = 0;
   dropModel.selectedIndex = 0;
   dropYear.selectedIndex = 0;

   while (dropBrand.length > 1) {
      dropBrand.remove(1);
   }

   while (dropModel.length > 1) {
      dropModel.remove(1);
   }

   while (dropYear.length > 1) {
      dropYear.remove(1);
   }
}

function brandResetor() {
   dropModel.selectedIndex = 0;
   dropYear.selectedIndex = 0;

   while (dropModel.length > 1) {
      dropModel.remove(1);
   }

   while (dropYear.length > 1) {
      dropYear.remove(1);
   }
}

function modelResetor() {
   dropYear.selectedIndex = 0;

   while (dropYear.length > 1) {
      dropYear.remove(1);
   }
}

////////////////////////////////////////////////////////////////////////////////////////////////
//// Eventos de seleção nos comboboxes
////////////////////////////////////////////////////////////////////////////////////////////////

dropKind.addEventListener("change", () => {
   let brandType = brandType[brandType.selectedIndex].value;
   getBrand(brandType);
});

dropBrand.addEventListener("change", () => {
   let brandType = dropKind[dropKind.selectedIndex].value;
   let brandId = dropBrand[dropBrand.selectedIndex].value;
   getModel(brandType, brandId);
});

dropModel.addEventListener("change", () => {
   let brandType = dropKind[dropKind.selectedIndex].value;
   let brandId = dropBrand[dropBrand.selectedIndex].value;
   let modelId = dropModel[dropModel.selectedIndex].value;
   getYear(brandType, brandId, modelId);
});

////////////////////////////////////////////////////////////////////////////////////////////////
//// Funções Assíncronas que consultam a API
////////////////////////////////////////////////////////////////////////////////////////////////

async function getBrand(brandType) {
   try {
      const dados = await fetch(apiURL + `/${brandType}/marcas`);
      let data = await dados.json();

      for (let i of data) {
         let addItem = document.createElement("option");
         addItem.text = i.nome;
         addItem.value = i.codigo;
         dropBrand.appendChild(addItem);
      }
   } catch (error) {
      console.error(error);
   }
}

async function getModel(brandType, brandId) {
   try {
      const dados = await fetch(
         apiURL + `/${brandType}/marcas/${brandId}/modelos`
      );
      let data = await dados.json();

      for (let i of data.modelos) {
         let addItem = document.createElement("option");
         addItem.text = i.nome;
         addItem.value = i.codigo;
         dropModel.appendChild(addItem);
      }
   } catch (error) {
      console.error(error);
   }
}

async function getYear(brandType, brandId, modelId) {
   try {
      const dados = await fetch(
         apiURL + `/${brandType}/marcas/${brandId}/modelos/${modelId}/anos`
      );
      let data = await dados.json();

      for (let i of data) {
         let addItem = document.createElement("option");
         addItem.text = i.nome;
         addItem.value = i.codigo;
         dropYear.appendChild(addItem);
      }
   } catch (error) {
      console.error(error);
   }
}

//https://parallelum.com.br/fipe/api/v1/motos/marcas/145/modelos/5753/anos/2012-1
