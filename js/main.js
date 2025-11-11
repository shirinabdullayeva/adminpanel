document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("button.bg-green-600");
    const modal = document.getElementById("studentModal");
    const closeBtn = modal.querySelector("button.bg-gray-500");
    const form = modal.querySelector("form");
    const tableBody = document.querySelector("tbody");
    const searchInput = document.querySelector("input[type='search']");
    let students = [];

    // Modalni ochish
    addBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    // Modalni yopish
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
        form.reset();
    });

    // Formani yuborish (student qo‘shish)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input, select");
        const data = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            address: inputs[2].value,
            birthday: inputs[3].value,
            position: inputs[4].value,
            positionType: inputs[5].value,
            salary: inputs[6].value + "$",
            isMarried: inputs[7].checked ? "Ha" : "Yo‘q",
            activity: "Active",
        };

        if (!data.firstName || !data.lastName) {
            alert("Iltimos, barcha majburiy maydonlarni to‘ldiring!");
            return;
        }

        students.push(data);
        renderTable();
        form.reset();
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    // Jadvalni render qilish
    function renderTable(filtered = students) {
        tableBody.innerHTML = "";
        filtered.forEach((s, i) => {
            const row = document.createElement("tr");
            row.className = "bg-gray-100 hover:bg-gray-200 transition";
            row.innerHTML = `
        <td class="px-6 py-4 font-bold text-black">${i + 1}</td>
        <td class="px-6 py-4">${s.firstName}</td>
        <td class="px-6 py-4">${s.lastName}</td>
        <td class="px-6 py-4">${s.address}</td>
        <td class="px-6 py-4">${s.birthday}</td>
        <td class="px-6 py-4">${s.position}</td>
        <td class="px-6 py-4">${s.positionType}</td>
        <td class="px-6 py-4">${s.salary}</td>
        <td class="px-6 py-4">${s.isMarried}</td>
        <td class="px-6 py-4">${s.activity}</td>
        <td class="px-6 py-4 flex gap-2">
          <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md editBtn">Edit</button>
          <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md deleteBtn">Delete</button>
        </td>
      `;
            tableBody.appendChild(row);
        });

        // Delete tugmalari
        document.querySelectorAll(".deleteBtn").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                if (confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
                    students.splice(index, 1);
                    renderTable();
                }
            });
        });
    }

    // Qidiruv
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = students.filter(
            (s) =>
                s.firstName.toLowerCase().includes(value) ||
                s.lastName.toLowerCase().includes(value)
        );
        renderTable(filtered);
    });
});