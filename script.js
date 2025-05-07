const costInput = document.getElementById("cost");
const budgetInput = document.getElementById("budget");
const backdropInput = document.getElementById("backdrop");

// Format Rupiah real-time saat mengetik
[costInput, budgetInput, backdropInput].forEach(input => {
  input.addEventListener("input", function () {
    let clean = this.value.replace(/[^\d]/g, "");
    if (!clean) {
      this.value = "";
      return;
    }
    const formatted = parseInt(clean).toLocaleString("id-ID") + ",-";
    this.value = formatted;
  });
});

document.getElementById("boothForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const booth = document.getElementById("booth").value;
  const size = document.getElementById("size").value;
  const event = document.getElementById("event").value;
  const date = document.getElementById("date").value;
  const cost = costInput.value;
  const budget = budgetInput.value;
  const contact = document.getElementById("contact").value;
  const backdrop = backdropInput.value;
  const notes = document.getElementById("notes").value;

  const data = { booth, size, event, date, cost, budget, contact, backdrop, notes };

  // Simpan ke localStorage
  const boothList = JSON.parse(localStorage.getItem("booths")) || [];
  boothList.push(data);
  localStorage.setItem("booths", JSON.stringify(boothList));

  appendRowToTable(data);
  this.reset();
});

function appendRowToTable(data) {
    const table = document.getElementById("boothTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    Object.values(data).forEach(value => {
      const cell = newRow.insertCell();
      cell.textContent = value;
    });
  
    // Tambahkan Event ke dropdown jika belum ada
    addEventToFilter(data.event);
  }  

  function loadBooths() {
    const boothList = JSON.parse(localStorage.getItem("booths")) || [];
    boothList.forEach(data => {
      appendRowToTable(data);
      addEventToFilter(data.event);
    });
  }
  
function addEventToFilter(eventName) {
    const filter = document.getElementById("filterEvent");
  
    // Cek apakah event sudah ada di dropdown
    const exists = Array.from(filter.options).some(option => option.value === eventName);
    if (!exists) {
      const option = document.createElement("option");
      option.value = eventName;
      option.textContent = eventName;
      filter.appendChild(option);
    }
  }  

document.getElementById("filterEvent").addEventListener("change", function () {
  const filter = this.value;
  const rows = document.querySelectorAll("#boothTable tbody tr");

  rows.forEach(row => {
    const eventName = row.cells[2].textContent;
    row.style.display = !filter || eventName === filter ? "" : "none";
  });
});

// Saat halaman pertama kali dibuka, muat data dari localStorage
window.addEventListener("load", loadBooths);

document.getElementById("clearData").addEventListener("click", function () {
    const confirmDelete = confirm("Yakin ingin menghapus semua data?");
    if (confirmDelete) {
      localStorage.removeItem("booths");
      const tbody = document.querySelector("#boothTable tbody");
      tbody.innerHTML = "";
    }
  });
  