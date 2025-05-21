let booths = JSON.parse(localStorage.getItem('booths')) || [];
let editingIndex = null;

const form = document.getElementById('boothForm');
const tableBody = document.getElementById('boothTable');
const eventFilter = document.getElementById('eventFilter');

form.addEventListener('submit', e => {
  e.preventDefault();

  console.log('Form submitted!');

  const data = {
    booth: form.booth.value.trim(),
    boothType: form.boothType.value,
    boothSize: form.boothSize.value.trim(),
    eventName: form.eventName.value.trim(),
    startDate: form.startDate.value,
    endDate: form.endDate.value,
    cost: formatCurrency(form.cost.value),
    budget: formatCurrency(form.budget.value),
    otherExpenses: formatCurrency(form.otherExpenses.value),
    backdropSize: form.backdropSize.value.trim(),
    backdropCost: formatCurrency(form.backdropCost.value),
    contact: form.contact.value.trim(),
    description: form.description.value.trim(),
  };

  console.log('Data to save:', data);

  if (editingIndex !== null) {
    booths[editingIndex] = data;
    editingIndex = null;
  } else {
    booths.push(data);
  }

  saveAndRender();
  form.reset();
});

function formatCurrency(value) {
  if (!value || isNaN(value)) return "Rp 0";
  return "Rp " + parseInt(value).toLocaleString("id-ID");
}

function saveAndRender() {
  localStorage.setItem('booths', JSON.stringify(booths));
  renderTable();
  updateEventFilter();
}

function renderTable() {
  tableBody.innerHTML = "";

  const filtered = eventFilter.value
    ? booths.filter(b => b.eventName === eventFilter.value)
    : booths;

  filtered.forEach((b, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${b.booth}</td>
      <td>${b.boothType}</td>
      <td>${b.boothSize}</td>
      <td>${b.eventName}</td>
      <td>${b.startDate}</td>
      <td>${b.endDate}</td>
      <td>${b.cost}</td>
      <td>${b.budget}</td>
      <td>${b.otherExpenses}</td>
      <td>${b.backdropSize}</td>
      <td>${b.backdropCost}</td>
      <td>${b.contact}</td>
      <td>${b.description}</td>
      <td>
        <button onclick="editBooth(${index})">Edit</button>
        <button onclick="deleteBooth(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editBooth(index) {
  const b = booths[index];
  form.booth.value = b.booth;
  form.boothType.value = b.boothType;
  form.boothSize.value = b.boothSize;
  form.eventName.value = b.eventName;
  form.startDate.value = b.startDate;
  form.endDate.value = b.endDate;
  form.cost.value = b.cost.replace(/[^\d]/g, '');
  form.budget.value = b.budget.replace(/[^\d]/g, '');
  form.otherExpenses.value = b.otherExpenses.replace(/[^\d]/g, '');
  form.backdropSize.value = b.backdropSize;
  form.backdropCost.value = b.backdropCost.replace(/[^\d]/g, '');
  form.contact.value = b.contact;
  form.description.value = b.description;
  editingIndex = index;
}

function deleteBooth(index) {
  if (confirm("Yakin ingin menghapus data booth ini?")) {
    booths.splice(index, 1);
    saveAndRender();
  }
}

function updateEventFilter() {
  const events = [...new Set(booths.map(b => b.eventName))];
  eventFilter.innerHTML = `<option value="">Semua Event</option>`;
  events.forEach(e => {
    const option = document.createElement("option");
    option.value = e;
    option.textContent = e;
    eventFilter.appendChild(option);
  });
}

eventFilter.addEventListener('change', renderTable);

// Initial render
saveAndRender();
