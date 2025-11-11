document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("button"); // + Add Student tugmasi
    const modal = document.getElementById("studentModal");
    const closeBtn = modal.querySelector("button2");
    const form = modal.querySelector("form");
    const tableBody = document.querySelector("tbody");

    let students = [];
    let count = 2;


    addBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });


    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        form.reset();
    });


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, select");
        const data = {
            id: count++,
            firstName: inputs[0].value.trim(),
            lastName: inputs[1].value.trim(),
            address: inputs[2].value,
            birthday: inputs[3].value,
            position: inputs[4].value,
            positionType: inputs[5].value,
            salary: inputs[6].value,
            isMarried: inputs[7].checked ? "Ha" : "Yo‘q",
            activity: "Active",
        };

        students.push(data);
        renderTable();

        form.reset();
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((s, i) => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-gray-100";
            tr.innerHTML = `
        <td class="px-6 py-4 font-bold text-gray-800">${i + 1}</td>
        <td class="px-6 py-4">${s.firstName}</td>
        <td class="px-6 py-4">${s.lastName}</td>
        <td class="px-6 py-4">${s.address}</td>
        <td class="px-6 py-4">${s.birthday}</td>
        <td class="px-6 py-4">${s.position}</td>
        <td class="px-6 py-4">${s.positionType}</td>
        <td class="px-6 py-4">${s.salary}$</td>
        <td class="px-6 py-4">${s.isMarried}</td>
        <td class="px-6 py-4">${s.activity}</td>
        <td class="px-6 py-4 flex gap-2">
          <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md edit-btn">Edit</button>
          <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md delete-btn">Delete</button>
        </td>
      `;
            tableBody.appendChild(tr);
        });

    
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                students.splice(index, 1);
                renderTable();
            });
        });
    }
});