const customerHeads = ["customerName", "customerBalance"];
const formData = document.querySelector("#formSection form");
const tableBody = document.querySelector("#customersTable");

const getCustomers = () => {
  customers = localStorage.getItem("customers") || "[]";
  return JSON.parse(customers);
};
const setCustomers = () => {
  localStorage.setItem("customers", JSON.stringify(customers));
};
const addElement = (parent, element, attributes, classes, txt) => {
  const ele = document.createElement(element);
  parent.appendChild(ele);
  if (classes != "") ele.classList = classes;
  if (txt != "") ele.innerText = txt;
  attributesTypes = Object.keys(attributes);
  attributesTypes.forEach((attr) => {
    ele.setAttribute(attr, attributes[attr]);
  });
  return ele;
};

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  customer = { accNum: new Date().getTime() };
  customerHeads.forEach((head) => (customer[head] = this.elements[head].value));
  customers = getCustomers();
  customers.push(customer);
  setCustomers(customers);
  this.reset();
});

withdarw = (customer, i) => {
  customers = getCustomers();
  accNum = customer.accNum;
  numWithdraw = prompt("How many credits do you want to withdraw?");
  index = customers.findIndex((customer) => customer.accNum === accNum);
  if (parseInt(customers[index].customerBalance) >= parseInt(numWithdraw)) {
    customers[index].customerBalance =
      parseInt(customers[index].customerBalance) - parseInt(numWithdraw);
    // console.log(customers[index].customerBalance);
    customers[index].customerBalance = document.querySelectorAll(".x td")[
      index
    ] = customers[index].customerBalance;
    setCustomers(customers);
  } else {
    alert("No balance allowed");
  }
};
addBalance = (customer) => {
  customers = getCustomers();
  accNum = customer.accNum;
  numAddBalance = prompt("How many credits do you want to add?");
  index = customers.findIndex((customer) => customer.accNum === accNum);
  customers[index].customerBalance =
    parseInt(customers[index].customerBalance) + parseInt(numAddBalance);
  customers[index].customerBalance = document.querySelectorAll(".x td")[index] =
    customers[index].customerBalance;
  setCustomers(customers);
};
deleteCustomer = (customer) => {
  customers = getCustomers();
  accNum = customer.accNum;
  index = customers.findIndex((customer) => customer.accNum === accNum);
  customers.splice(index, 1);
  setCustomers(customers);
  document.querySelectorAll(".x")[index].remove();
};

showSingleCustomer = (customer, i) => {
  customers = getCustomers();
  customers.forEach((customer) => {
    tr = addElement(tableBody, "tr", { id: customer.accNum }, "x", "");
    // customerHeads.forEach((head) => {
    //   addElement(tr, "td", customer[head]);
    // });
    addElement(tr, "td", "", "", customer.accNum);
    addElement(tr, "td", "", "", customer.customerName);
    addElement(tr, "td", "", "", customer.customerBalance);
    actions = addElement(tr, "td", "", "", "");
    btnWithdraw = addElement(
      actions,
      "button",
      "",
      "btn btn-primary",
      "Withdraw"
    );
    btnWithdraw.addEventListener("click", function (e) {
      withdarw(customer);
    });
    btnAddBalance = addElement(
      actions,
      "button",
      "",
      " mx-2 btn btn-info",
      "Add Balancea"
    );
    btnAddBalance.addEventListener("click", function (e) {
      addBalance(customer);
    });
    btnDelete = addElement(
      actions,
      "button",
      "",
      " mx-2 btn btn-danger",
      "Delete"
    );
    btnDelete.addEventListener("click", function (e) {
      deleteCustomer(customer);
    });
  });
};
showCustomers = () => {
  customers = getCustomers();
  if (customers.length != 0) {
    customers.forEach((customer, i) => {
      showSingleCustomer(customer, i);
    });
  }
};
showSingleCustomer();
