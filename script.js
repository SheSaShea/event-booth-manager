// Referensi elemen-elemen DOM
const boothForm = document.getElementById('boothForm');
const boothTable = document.getElementById('boothTable').getElementsByTagName('tbody')[0];
const filterEvent = document.getElementById('filterEvent');

// Menambahkan booth baru
boothForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const booth = document.getElementById('booth').value;
  const size = document.getElementById('size').value;
  const event = document.getElementById('event').value;
  const date = document.getElementById('date').value;
  const cost = document.getElementById('cost').value;
  const budget = document.getElementById('budget').value;
  const contact = document.getElementById('contact').value;
  const backdrop = document.getElementById('backdrop').value;

  // Membuat baris baru di tabel
  const newRow = boothTable.insertRow();
  newRow.insertCell(0).textContent = booth;
  newRow.insertCell(1).textContent = size;
  newRow.insertCell(2).textContent = event;
  newRow.insertCell(3).textContent = date;
  newRow.insertCell(4).textContent = cost;
  newRow.insertCell(5).textContent = budget;
  newRow.insertCell(6).textContent = contact;
  newRow.insertCell(7).textContent = backdrop;

  // Tombol Edit dan Remove
  const actionsCell = newRow.insertCell(8);
  actionsCell.innerHTML = `
    <button class="btn edit">Edit</button> 
    <button class="btn delete">Remove</button>
  `;

  // Reset form setelah input
  boothForm.reset();
});

// Menghapus booth
boothTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    const row = e.target.closest('tr');
    boothTable.deleteRow(row.rowIndex);
  }
});

// Mengedit booth
boothTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('edit')) {
    const row = e.target.closest('tr');
    const cells = row.getElementsByTagName('td');

    // Menampilkan nilai di dalam form untuk edit
    document.getElementById('booth').value = cells[0].textContent;
    document.getElementById('size').value = cells[1].textContent;
    document.getElementById('event').value = cells[2].textContent;
    document.getElementById('date').value = cells[3].textContent;
    document.getElementById('cost').value = cells[4].textContent;
    document.getElementById('budget').value = cells[5].textContent;
    document.getElementById('contact').value = cells[6].textContent;
    document.getElementById('backdrop').value = cells[7].textContent;

    // Menghapus baris lama setelah edit
    boothTable.deleteRow(row.rowIndex);
  }
});

// Filter booth berdasarkan event
filterEvent.addEventListener('change', function () {
  const filterValue = this.value.toLowerCase();
  const rows = boothTable.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const eventCell = rows[i].getElementsByTagName('td')[2];
    if (eventCell) {
      const text = eventCell.textContent.toLowerCase();
      rows[i].style.display = filterValue === '' || text === filterValue ? '' : 'none';
    }
  }
});
