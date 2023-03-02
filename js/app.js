let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getData() {
    const data = await fetchData(urlAPI);
    employees = data.results;
    displayEmployees(employees);
}

function displayEmployees(employeeData) {
    let employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        // template literals make this so much cleaner!
        employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    const { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    const date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}, ${state} ${postcode}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.name} ${street.number}, ${city}, ${state} ${postcode}</p>
      <p>Birthday: ${date.toLocaleDateString()}</p>
    </div>
  `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


getData();


gridContainer.addEventListener('click', e => {
    // check if the clicked element is a card or its child element
    const card = e.target.closest(".card");
    if (card) {
        const index = card.getAttribute('data-index');
        displayModal(index);
    }

});





modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
