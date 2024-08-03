// localStorage.clear();

const globalTaskData = JSON.parse(localStorage.getItem("tasks")) || {};

const reloadBrowser = () => {
	window.location.reload();
};

const saveToLocalStorage = () => {
	localStorage.setItem("tasks", JSON.stringify(globalTaskData));
};

// Function that returns date in dd/mm/yyyy format from milliseconds as string
const formatDate = (date) => {
	let monthName = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let cardDate = new Date(Number(date));

	// below function return date with abbreviation in string format
	let getDay = (day) => {
		let abbr = "";
		switch (day) {
			case 1:
				abbr = "st";
				break;
			case 2:
				abbr = "nd";
				break;
			case 3:
				abbr = "rd";
				break;
			default:
				abbr = "th";
		}
		return `${day}<sup>${abbr}</sup>`;
	};
	let day = getDay(cardDate.getDate());
	let month = monthName[cardDate.getMonth()];
	let year = cardDate.getFullYear();
	return `${day} ${month} ${year}`;
};

const renderCards = (tasksData = globalTaskData) => {
	let cardsSection = document.getElementsByClassName("cards__container")[0];

	// condition to check if localStorage is an empty object

	if (Object.keys(tasksData).length === 0) {
		const newDivElement = document.createElement("div");
		newDivElement.className = "text-secondary";
		newDivElement.innerHTML = `No data found`;
		cardsSection.insertBefore(newDivElement, cardsSection.firstElementChild);
		return;
	}

	// returning the card element if localStorage has entries

	for (let [cardId, cardData] of Object.entries(tasksData)) {
		let cardDate = formatDate(cardId);
		let html_text = `
	<div class="col-7 col-md-5 col-lg-4 d-flex justify-content-between" id=${cardId}>
		<div class="card border-dark" style="width: 20rem">
			<div class="card-header d-flex justify-content-between align-items-center gap-2">
				<span class="fw-bold">${cardDate}</span>
				<button type="button" class="btn btn-outline-danger" onclick="deleteTask('${cardId}')">
					<i class="fa-solid fa-trash"></i>
				</button>
			</div>
			<img
				src=${cardData.taskImageUrl}
				class="card-img-top"
				alt="Task Image"
			/>
			<div class="card-body">
				<h4 class="card-title">${cardData.taskTitle}</h4>
				<p class="card-text">${cardData.taskDescription}</p>
				<div class="d-flex justify-content-end">
					<a
						href="#"
						class="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#viewTaskModal"
						onclick=showTaskDetails('${cardId}')
						>View task</a
					>
				</div>
			</div>
		</div>
	</div>
	`;
		cardsSection.children[0].insertAdjacentHTML("beforeBegin", html_text);
	}
};

const searchTaskFunction = (e, formElement) => {
	e.preventDefault();
	let searchString = new FormData(formElement).get("searchText");

	let searchButton = formElement.getElementsByClassName("btn-outline-dark")[0];
	searchButton.setAttribute("onclick", "reloadBrowser()");
	// Changing search button icon to 'X'
	searchButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

	let searchInput = formElement.getElementsByClassName("border-dark")[0];
	searchInput.setAttribute("disabled", "true");

	// variable to store data whose title contains searched text as substring
	let filteredData = {};
	for (let [cardId, cardData] of Object.entries(globalTaskData)) {
		if (cardData["taskTitle"].toUpperCase().includes(searchString.toUpperCase()))
			filteredData[cardId] = cardData;
	}

	let cardsSection = document.getElementsByClassName("cards__container")[0];
	let emptyCard = cardsSection.lastElementChild;
	let clone1 = emptyCard.cloneNode(true);

	// clearing the previous cards
	cardsSection.innerHTML = "";

	// !DON'T REMOVE (adding empty card elements for alignment) -->
	cardsSection.appendChild(emptyCard);
	cardsSection.appendChild(clone1);
	renderCards((tasksData = filteredData));
};

// Search element for large screen devices
const searchTasks = document.getElementById("searchTasks");
searchTasks.addEventListener("submit", (e) => searchTaskFunction(e, searchTasks));

// Search element for small screen devices
const searchTasks2 = document.getElementById("searchTasks2");
searchTasks2.addEventListener("submit", (e) => searchTaskFunction(e, searchTasks2));

// prompting confirmation before adding task
const addTaskModal = document.getElementById("addTaskModal");
addTaskModal.addEventListener("hide.bs.modal", (event) => {
	let shouldClose = confirm("Are you sure???");
	if (!shouldClose) event.preventDefault();
});

// reloading so if user has updated any data of card from view task option so browser will show updated data
const viewTaskModal = document.getElementById("viewTaskModal");
viewTaskModal.addEventListener("hide.bs.modal", () => {
	reloadBrowser();
});

// adding task data to localStorage
const addTaskForm = document.getElementById("addTaskForm");
addTaskForm.addEventListener("submit", (e) => {
	const formData = new FormData(addTaskForm);
	let taskData = {};
	formData.forEach((value, key) => {
		taskData[key] = value;
	});
	globalTaskData[Date.now()] = taskData;
	saveToLocalStorage();
});

// helper function to get task element from view task window
const getTaskElement = () => {
	let detailsModal = document.getElementById("viewTaskModal");
	let [editButton, closeButton] = [...detailsModal.getElementsByTagName("button")];
	let taskImage = detailsModal.getElementsByTagName("img")[0];
	let taskImageUrl = detailsModal.getElementsByTagName("span")[0];
	let taskTitle = detailsModal.getElementsByTagName("h1")[0];
	let taskDate = detailsModal.getElementsByTagName("time")[0];
	let taskDescription = detailsModal.getElementsByTagName("p")[0];
	return [editButton, closeButton, taskImage, taskImageUrl, taskTitle, taskDate, taskDescription];
};

// helper function to reset changes that has been added to let user edit task date
const removeTaskEditing = (cardId) => {
	let [editButton, closeButton, taskImage, taskImageUrl, taskTitle, taskDate, taskDescription] =
		getTaskElement();

	editButton.classList.remove("btn-outline-success");
	editButton.innerHTML = `<i class="fa-solid fa-file-pen"></i>`;
	editButton.setAttribute("onclick", `editTask(${cardId})`);

	closeButton.setAttribute("data-bs-dismiss", "modal");
	closeButton.removeAttribute("onclick");
	closeButton.classList.remove("btn-outline-danger");

	taskImage.classList.remove("opacity-50");
	taskImageUrl.classList.add("d-none");
	taskImageUrl.setAttribute("contenteditable", `false`);

	taskTitle.setAttribute("contenteditable", `false`);
	taskDescription.setAttribute("contenteditable", `false`);
};

// function to display single task data in view tasks window
const showTaskDetails = (cardId) => {
	let taskDetails = globalTaskData[cardId];
	let [editButton, closeButton, taskImage, taskImageUrl, taskTitle, taskDate, taskDescription] =
		getTaskElement();

	editButton.setAttribute("onclick", `editTask(${cardId})`);
	taskImage.setAttribute("src", taskDetails["taskImageUrl"]);
	taskImageUrl.innerHTML = taskDetails["taskImageUrl"];
	taskTitle.innerHTML = taskDetails["taskTitle"].toUpperCase();
	taskDate.innerHTML = formatDate(cardId);
	taskDescription.innerHTML = taskDetails["taskDescription"];
};

// function to allow user to update task data in view tasks window
const editTask = (cardId) => {
	let [editButton, closeButton, taskImage, taskImageUrl, taskTitle, taskDate, taskDescription] =
		getTaskElement();

	editButton.classList.add("btn-outline-success");
	editButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
	editButton.setAttribute("onclick", `updateTask(${cardId})`);

	closeButton.removeAttribute("data-bs-dismiss");
	closeButton.setAttribute("onclick", `cancelTaskUpdate(${cardId})`);
	closeButton.classList.add("btn-outline-danger");

	taskImage.classList.add("opacity-50");
	taskImageUrl.classList.remove("d-none");
	taskImageUrl.setAttribute("contenteditable", `true`);

	taskTitle.setAttribute("contenteditable", `true`);
	taskDescription.setAttribute("contenteditable", `true`);
};

// function to discard current changes and show previous data in view tasks window
const cancelTaskUpdate = (cardId) => {
	let shouldCancel = confirm("Are you sure???");
	if (!shouldCancel) return;
	removeTaskEditing(cardId);
	showTaskDetails(cardId);
};

// function to update edited data in localStorage
const updateTask = (cardId) => {
	let shouldUpdate = confirm("Save Changes ???");
	if (!shouldUpdate) return;
	let [editButton, closeButton, taskImage, taskImageUrl, taskTitle, taskDate, taskDescription] =
		getTaskElement();
	taskDetails = {};

	taskDetails["taskImageUrl"] = taskImageUrl.innerHTML;
	taskDetails["taskTitle"] = taskTitle.innerHTML;
	taskDetails["taskDescription"] = taskDescription.innerHTML;

	globalTaskData[cardId] = taskDetails;
	saveToLocalStorage();
	removeTaskEditing(cardId);
	showTaskDetails(cardId);
};

// function to remove card data from localStorage
const deleteTask = (cardId) => {
	delete globalTaskData[cardId];
	saveToLocalStorage();
	reloadBrowser();
};

// async function addTaskConfirmation() {
// 	const addTaskButton = document.getElementById("addNewTask");
// 	const cancelTaskButton = document.getElementById("cancelAddTask");

// 	return new Promise((resolve) => {
// 		addTaskButton.addEventListener("click", () => resolve("add"));
// 		cancelTaskButton.addEventListener("click", () => resolve("cancel"));
// 	});
// }

// myModal.addEventListener("hide.bs.modal", async (event) => {
// 	event.preventDefault();
// 	let isCancel = await addTaskConfirmation();
// 	if (isCancel === "cancel") {
// 		let shouldClose = confirm("sure");
// 		console.log(`isCancel : ${isCancel}, shouldClose : ${shouldClose}`);
// 		if (!shouldClose) event.preventDefault();
// 	}
// });

// const showTaskDetails = (cardId) => {
// 	let taskDetails = globalTaskData[cardId];
// 	let detailsModal = document.getElementById("viewTaskModal");

// 	let modalButtons = [...detailsModal.getElementsByTagName("button")];
// 	modalButtons[0].setAttribute("onclick", `editTask(${cardId})`);
// 	modalButtons[1].setAttribute("onclick", `deleteTask(${cardId})`);

// 	let taskImage = detailsModal.getElementsByTagName("img")[0];
// 	taskImage.setAttribute("src", taskDetails["taskImageUrl"]);

// 	let taskImageUrl = detailsModal.getElementsByTagName("span")[0];
// 	taskImageUrl.innerHTML = taskDetails["taskImageUrl"];

// 	let taskTitle = detailsModal.getElementsByTagName("h1")[0];
// 	taskTitle.innerHTML = taskDetails["taskTitle"].toUpperCase();

// 	let taskDate = detailsModal.getElementsByTagName("time")[0];
// 	taskDate.innerHTML = formatDate(cardId);

// 	let taskDescription = detailsModal.getElementsByTagName("p")[0];
// 	taskDescription.innerHTML = taskDetails["taskDescription"];
// };
