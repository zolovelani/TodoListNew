/* eslint-disable no-undef */
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const addItems = $(".add-items");
const itemsList = $(".to-do-list");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
	e.preventDefault(); 

	const itemName = $("input[name=item]").val();
	const dueDate = $("[name=duedate]").val();
	
	
	const item = {
		text: itemName,
		date: dueDate,
		done: false,
	};

	items.push(item);

	PopulateListWithItems();

	localStorage.setItem("items", JSON.stringify(items)); 

	this.reset();
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function toggleDone(e) {
	if (!e.target.matches("input")) return; // skip this unless it's an input
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem("items", JSON.stringify(items));
	PopulateListWithItems(items, itemsList);
}


function PopulateListWithItems() {
	// get the template
	var taskTemplate = $("#task-template").html();

	// compile the template
	var taskTemplateCompiled = Handlebars.compile(taskTemplate);

	// inject context into template
	var html = taskTemplateCompiled({
		items : items
	});

	// display in page somewhere
	$("#tasksContainer").empty().append(html);
}

addItems.on("submit", addItem);
itemsList.on("click", toggleDone);
PopulateListWithItems();

// get the template
var titleTemplate = $("#title-template").html();

// compile the template
var titleTemplateCompiled = Handlebars.compile(titleTemplate);

// project context to be injected into template
var context = { "title" : "My todo list"};

// inject context into template
var html = titleTemplateCompiled(context);
// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    
});

// display in page somewhere
$("#titleContainer").empty().append(html);

