const apiURL = "https://parallelum.com.br/fipe/api/v1";

const dropKind = document.querySelector("select[name='kind']");
const dropBrand = document.querySelector("select[name='brand']");
const dropModel = document.querySelector("select[name='model']");
const dropYear = document.querySelector("select[name='year']");

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

dropKind.addEventListener("change", () => {
   if (dropKind.selectedIndex === 1) {
      getBrand("carros");
   } else if (dropKind.selectedIndex === 2) {
      getBrand("motos");
   } else if (dropKind.selectedIndex === 3) {
      getBrand("caminhoes");
   }
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
