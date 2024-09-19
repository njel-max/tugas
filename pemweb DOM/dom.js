document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    const title = document.createElement('h1');
    title.textContent = "Formulir Pendaftaran Pow Ranger";
    formContainer.appendChild(title);

    const registrationForm = document.createElement('form');
    registrationForm.id = "registrationForm";

    const fields = [
        { label: "Nama:", id: "nama", required: true },
        { label: "TTL:", id: "ttl", required: true },
        { label: "Kekuatan:", id: "powers", required: true },
        { label: "Fav Color:", id: "warna", required: true }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        registrationForm.appendChild(label);

        const input = document.createElement('input');
        input.type = "text";
        input.id = field.id;
        input.name = field.id;
        input.required = field.required;
        registrationForm.appendChild(input);
        registrationForm.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.textContent = "Kirim";
    registrationForm.appendChild(submitButton);

    const displayData = document.createElement('div');
    displayData.id = "displayData";
    displayData.classList.add('hidden');
    const displayTitle = document.createElement('h2');
    displayTitle.textContent = "Data yang Anda Masukkan";
    displayData.appendChild(displayTitle);

    const displayFields = [
        { label: "Nama:", id: "displayNama" },
        { label: "TTL:", id: "displayNIM" },
        { label: "Kekuatan:", id: "displayKelas" },
        { label: "Fav Color:", id: "displayAlamat" }
    ];

    displayFields.forEach(field => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${field.label}</strong> <span id="${field.id}">-</span>`;
        displayData.appendChild(p);
    });

    formContainer.appendChild(registrationForm);
    formContainer.appendChild(displayData);
    container.appendChild(formContainer);

    const inputs = document.querySelectorAll('input');
    const displayNama = document.getElementById('displayNama');
    const displayNIM = document.getElementById('displayNIM');
    const displayKelas = document.getElementById('displayKelas');
    const displayAlamat = document.getElementById('displayAlamat');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateDisplay();
        });

 
        input.addEventListener('keyup', function() {
            console.log(`Key up on ${input.id}: ${input.value}`);
        });

     
        input.addEventListener('keydown', function() {
            console.log(`Key down on ${input.id}`);
        });

    
        input.addEventListener('focus', function() {
            this.style.borderColor = 'green';  
            console.log(`${input.id} is focused`);
        });


        input.addEventListener('blur', function() {
            this.style.borderColor = '';  
            console.log(`${input.id} lost focus`);
        });
    });

    function updateDisplay() {
        displayNama.textContent = document.getElementById('nama').value || "-";
        displayNIM.textContent = document.getElementById('nim').value || "-";
        displayKelas.textContent = document.getElementById('kelas').value || "-";
        displayAlamat.textContent = document.getElementById('alamat').value || "-";
    }
});
