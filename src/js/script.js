const apiURL = "https://parallelum.com.br/fipe/api/v1";

const dropKind = document.querySelector("select[name='kind']");
const dropBrand = document.querySelector("select[name='brand']");
const dropModel = document.querySelector("select[name='model']");
const dropYear = document.querySelector("select[name='year']");

const popupModel = document.getElementById("popup-model");
const popupBrand = document.getElementById("popup-brand");
const popupCombustivel = document.getElementById("popup-combustivel");
const popupAno = document.getElementById("popup-ano");
const popupAtualizacao = document.getElementById("popup-atualizacao");
const popupCodFipe = document.getElementById("popup-cod-fipe");
const popupValor = document.getElementById("popup-valor");

const btnVerificar = document.querySelector("#pesquisar");

const popup = document.getElementById("popup-screen");

let parameters = {
   vehicleType: "",
   brandId: "",
   modelId: "",
   year: "",
};

function refreshParameters() {
   parameters.vehicleType = dropKind[dropKind.selectedIndex].value;
   parameters.brandId = dropBrand[dropBrand.selectedIndex].value;
   parameters.modelId = dropModel[dropModel.selectedIndex].value;
   parameters.year = dropYear[dropYear.selectedIndex].value;
}

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
   let vehicleType = dropKind[dropKind.selectedIndex].value;
   if (vehicleType !== "blank") getBrand(vehicleType);
});

dropBrand.addEventListener("change", () => {
   let vehicleType = dropKind[dropKind.selectedIndex].value;
   let brandId = dropBrand[dropBrand.selectedIndex].value;
   if (brandId !== "blank") getModel(vehicleType, brandId);
});

dropModel.addEventListener("change", () => {
   let vehicleType = dropKind[dropKind.selectedIndex].value;
   let brandId = dropBrand[dropBrand.selectedIndex].value;
   let modelId = dropModel[dropModel.selectedIndex].value;
   if (modelId !== "blank") getYear(vehicleType, brandId, modelId);
});

////////////////////////////////////////////////////////////////////////////////////////////////
//// Funções Assíncronas que consultam a API
////////////////////////////////////////////////////////////////////////////////////////////////

async function getBrand(vehicleType) {
   try {
      const dados = await fetch(apiURL + `/${vehicleType}/marcas`);
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

async function getModel(vehicleType, brandId) {
   try {
      const dados = await fetch(
         apiURL + `/${vehicleType}/marcas/${brandId}/modelos`
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

async function getYear(vehicleType, brandId, modelId) {
   try {
      const dados = await fetch(
         apiURL + `/${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos`
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

////////////////////////////////////////////////////////////////////////////////////////////////
//// Ações do botão verificar e do Pop-up
////////////////////////////////////////////////////////////////////////////////////////////////

btnVerificar.addEventListener("click", () => {
   refreshParameters();
   if (
      parameters.vehicleType !== "blank" &&
      parameters.brandId !== "blank" &&
      parameters.modelId !== "blank" &&
      parameters.year !== "blank"
   ) {
      vehicleDataApi(parameters);
   } else {
      Swal.fire({
         icon: "error",
         title: "Opa..",
         text: "Preencha todos os campos!",
         showConfirmButton: false,
         timer: 1500,
      });
   }
});

async function vehicleDataApi(params) {
   try {
      const dados = await fetch(
         apiURL +
            `/${params.vehicleType}/marcas/${params.brandId}/modelos/${params.modelId}/anos/${params.year}`
      );
      let data = await dados.json();

      console.log(data);

      popupModel.innerText = data.Modelo;
      popupBrand.innerText = data.Marca;
      popupCombustivel.innerText = await data.Combustivel;
      popupAno.innerText = await data.AnoModelo;
      popupAtualizacao.innerText = await data.MesReferencia;
      popupCodFipe.innerText = await data.CodigoFipe;
      popupValor.innerText = await data.Valor;

      popup.classList.add("popup-mostrar");
   } catch (error) {
      console.error(error);
   }
}

document.addEventListener("click", (e) => {
   if (e.target.id === "popup-screen" || e.target.id === "btn-fechar-popup") {
      popup.classList.remove("popup-mostrar");
   }
});

//https://parallelum.com.br/fipe/api/v1/motos/marcas/145/modelos/5753/anos/2012-1
//http://deividfortuna.github.io/fipe/
