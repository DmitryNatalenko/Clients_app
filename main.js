let data = [];


document.addEventListener('DOMContentLoaded', () => {
  createClientsApp();
});


function createClientsApp() {
  const header = createHeader();
  const main = createMain();

  document.body.append(header, main);

  window.onload = () => {
    const preloader = document.querySelector('.preloader');
    preloader.remove();

    createClientsList();
    sortTable();
  }
}


function createHeader() {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  const headerLogo = document.createElement('a');
  const headerInput = document.createElement('input');
  let interval;
  const logoSvg = `
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="#9873FF"/>
    <path d="M17.2617 29.082C17.2617 30.0898 16.9102 30.8574 16.207 31.3848C15.5098 31.9121 14.4639 32.1758 13.0693 32.1758C12.3545 32.1758 11.7451 32.126 11.2412 32.0264C10.7373 31.9326 10.2656 31.792 9.82617 31.6045V29.3896C10.3242 29.624 10.8838 29.8203 11.5049 29.9785C12.1318 30.1367 12.6826 30.2158 13.1572 30.2158C14.1299 30.2158 14.6162 29.9346 14.6162 29.3721C14.6162 29.1611 14.5518 28.9912 14.4229 28.8623C14.2939 28.7275 14.0713 28.5781 13.7549 28.4141C13.4385 28.2441 13.0166 28.0479 12.4893 27.8252C11.7334 27.5088 11.1768 27.2158 10.8193 26.9463C10.4678 26.6768 10.21 26.3691 10.0459 26.0234C9.8877 25.6719 9.80859 25.2412 9.80859 24.7314C9.80859 23.8584 10.1455 23.1846 10.8193 22.71C11.499 22.2295 12.46 21.9893 13.7021 21.9893C14.8857 21.9893 16.0371 22.2471 17.1562 22.7627L16.3477 24.6963C15.8555 24.4854 15.3955 24.3125 14.9678 24.1777C14.54 24.043 14.1035 23.9756 13.6582 23.9756C12.8672 23.9756 12.4717 24.1895 12.4717 24.6172C12.4717 24.8574 12.5977 25.0654 12.8496 25.2412C13.1074 25.417 13.667 25.6777 14.5283 26.0234C15.2959 26.334 15.8584 26.624 16.2158 26.8936C16.5732 27.1631 16.8369 27.4736 17.0068 27.8252C17.1768 28.1768 17.2617 28.5957 17.2617 29.082ZM21.9287 26.6562L23.0977 25.1621L25.8486 22.1738H28.8721L24.9697 26.4365L29.1094 32H26.0156L23.1855 28.0186L22.0342 28.9414V32H19.3535V18.3242H22.0342V24.4238L21.8936 26.6562H21.9287ZM35.9824 21.9893C37.1426 21.9893 38.0508 22.4434 38.707 23.3516C39.3633 24.2539 39.6914 25.4932 39.6914 27.0693C39.6914 28.6924 39.3516 29.9492 38.6719 30.8398C37.998 31.7305 37.0781 32.1758 35.9121 32.1758C34.7578 32.1758 33.8525 31.7568 33.1963 30.9189H33.0117L32.5635 32H30.5156V18.3242H33.1963V21.5059C33.1963 21.9102 33.1611 22.5576 33.0908 23.4482H33.1963C33.8232 22.4756 34.752 21.9893 35.9824 21.9893ZM35.1211 24.1338C34.459 24.1338 33.9756 24.3389 33.6709 24.749C33.3662 25.1533 33.208 25.8242 33.1963 26.7617V27.0518C33.1963 28.1064 33.3516 28.8623 33.6621 29.3193C33.9785 29.7764 34.4766 30.0049 35.1562 30.0049C35.707 30.0049 36.1436 29.7529 36.4658 29.249C36.7939 28.7393 36.958 28.001 36.958 27.0342C36.958 26.0674 36.7939 25.3438 36.4658 24.8633C36.1377 24.377 35.6895 24.1338 35.1211 24.1338ZM41.5283 30.7432C41.5283 30.251 41.6602 29.8789 41.9238 29.627C42.1875 29.375 42.5713 29.249 43.0752 29.249C43.5615 29.249 43.9365 29.3779 44.2002 29.6357C44.4697 29.8936 44.6045 30.2627 44.6045 30.7432C44.6045 31.2061 44.4697 31.5723 44.2002 31.8418C43.9307 32.1055 43.5557 32.2373 43.0752 32.2373C42.583 32.2373 42.2021 32.1084 41.9326 31.8506C41.6631 31.5869 41.5283 31.2178 41.5283 30.7432Z" fill="white"/>
  </svg>  
  `;
  

  header.classList.add('header');
  headerContainer.classList.add('container', 'header-container');
  headerLogo.classList.add('header__logo');
  headerLogo.href = '';
  headerInput.classList.add('header__input');
  headerInput.type = 'text';
  headerInput.placeholder = 'Введите запрос';

  header.append(headerContainer);
  headerContainer.append(headerLogo, headerInput);
  headerLogo.innerHTML = logoSvg;

  headerInput.addEventListener('input', async () => {
    const value = headerInput.value.trim().toLowerCase();
    const filterClients = await searchClientObj(value);
    clearTimeout(interval);

    interval = setTimeout(() => {
      if (value !== '') {
        removeTable(); 
        filterClients.forEach((element) => {
          createClientItem(element);
        })   
      } else {
        createClientsList();
      }
    }, 300);
  });

  return header;
};


function createMain() {
  const main = document.createElement('main');
  const container = document.createElement('div');
  const title  = document.createElement('h1');
  const tableWrap = document.createElement('div');
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  const tableRow = document.createElement('tr');
  const theadId = document.createElement('td');
  const theadName = document.createElement('td');
  const theadDateCreate = document.createElement('td');
  const theadDateChange = document.createElement('td');
  const theadContact = document.createElement('td');
  const theadAction = document.createElement('td');
  const nameSort = document.createElement('span');
  const wrapBtn = document.createElement('div');
  const btnAddClient = document.createElement('button');

  const theadSvg = `
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
    </svg> 
    `;
  const btnAddSvg = `
    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"/>
    </svg>
    `;

  main.classList.add('main');
  container.classList.add('container');
  title.classList.add('main__title');
  tableWrap.classList.add('table__wrap');
  table.classList.add('table');
  tableHead.classList.add('table__head', 'table-head');
  theadId.classList.add('table-title', 'table-head__id', 'table-sort');
  theadName.classList.add('table-title', 'table-head__name', 'table-sort');
  theadDateCreate.classList.add('table-title', 'table-head__date-create', 'table-sort');
  theadDateChange.classList.add('table-title', 'table-head__date-change', 'table-sort');
  theadContact.classList.add('table-title', 'table-head__contacts');
  theadAction.classList.add('table-title', 'table-head__action');
  nameSort.classList.add('table-head__name-sort');
  tableBody.classList.add('table__body');
  wrapBtn.classList.add('wrap__btn');
  btnAddClient.classList.add('btn-add', 'btn-reset');

  title.textContent = 'Клиенты';
  nameSort.textContent = 'А-Я';
  theadId.innerHTML = 'ID' + theadSvg;
  theadName.innerHTML = 'Фамилия Имя Отчество' + theadSvg;
  theadDateCreate.innerHTML = 'Дата и время создания' + theadSvg;
  theadDateChange.innerHTML = 'Последние изменения' + theadSvg;
  theadContact.textContent = 'Контакты';
  theadAction.textContent = 'Действия';
  btnAddClient.innerHTML = btnAddSvg + 'Добавить клиента';
 
  theadId.dataset.sort = 'id';
  theadName.dataset.sort = 'surname';
  theadDateCreate.dataset.sort = 'createdAt';
  theadDateChange.dataset.sort = 'updatedAt';

  main.append(container);
  container.append(title, tableWrap, wrapBtn);
  tableWrap.append(table);
  table.append(tableHead, tableBody, preloaderCreate());
  tableHead.append(tableRow);
  tableRow.append(theadId, theadName, theadDateCreate, theadDateChange, theadContact, theadAction);
  theadName.append(nameSort);
  wrapBtn.append(btnAddClient);

  btnAddClient.addEventListener('click', () => {
    openModalNewClient();
  });

  return main;
}


function preloaderCreate() {
  const preloaderWrap = document.createElement('div');
  const preloaderCircle = document.createElement('span');
  const preloaderSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#9873ff" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
  </svg>
  `;

  preloaderWrap.classList.add('preloader');
  preloaderCircle.innerHTML = preloaderSvg;
  preloaderWrap.append(preloaderCircle);

  return preloaderWrap
}


function createClientItem(clientObj) {
  const tableBody = document.querySelector('.table__body');
  const rowTable = document.createElement('tr');
  const idTable = document.createElement('th');
  const nameTable = document.createElement('th');
  const dateCreateTable = document.createElement('th');
  const timeCreateTable = document.createElement('span');
  const dateChangeTable = document.createElement('th');
  const timeChangeTable = document.createElement('span');
  const contactTable = document.createElement('th');
  const actionWrap = document.createElement('th');
  const changeBtnTable = document.createElement('div');
  const deleteBtnTable = document.createElement('div');
  const dateCreate = new Date(clientObj.createdAt);
  const dateChange = new Date(clientObj.updatedAt);
  const option = {hour: 'numeric', minute: 'numeric'};

  
  rowTable.classList.add('table__row');
  idTable.classList.add('table-body__id');
  dateCreateTable.classList.add('table-body__date-create');
  timeCreateTable.classList.add('table-body__time-create');
  dateChangeTable.classList.add('table-body__date-change');
  timeChangeTable.classList.add('table-body__time-change');
  contactTable.classList.add('table-body__contacts');
  actionWrap.classList.add('table-body__action-wrap');
  changeBtnTable.classList.add('table-body__action-change');
  deleteBtnTable.classList.add('table-body__action-delete');

  function normName(nameForm) {
    return (nameForm.substr(0, 1).toUpperCase() + nameForm.substr(1).toLowerCase()).trim();
  }

  changeBtnTable.addEventListener('click', () => {
    openModalChangeClient(clientObj);
  })

  deleteBtnTable.addEventListener('click', () => {
    onDelete(clientObj);
  })

  function createContactsTable(array) {
    array.forEach((element) => {
      const popupWrap = document.createElement('div');
      const popupBtn = document.createElement('div');
      const popup = document.createElement('div');
      const popupValue = document.createElement('span');

      const phoneSvg = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="8" cy="8" r="8" fill="#9873FF"/>
          <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
      </svg>
      `;
      const emailSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>
      `;
      const fbSvg = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
      </svg>
      `;
      const vkSvg = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
      </svg>
      `;
      const otherSvg = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
      </svg>
      `;

      popupWrap.classList.add('popup__wrap');
      popupBtn.classList.add('popup__btn');
      popup.classList.add('popup');
      popupValue.classList.add('popup__value');

      popup.textContent = `${element.type}: `;
      popupValue.textContent = element.value;

      contactTable.append(popupWrap);
      popupWrap.append(popupBtn, popup);
      popup.append(popupValue);
      
      if (element.type === 'Телефон') {
        popupBtn.innerHTML = phoneSvg;
        popup.textContent = element.value;
        popup.classList.add('popup__phone');
      }
      if (element.type === 'Email') {
        popupBtn.innerHTML = emailSvg;
      }
      if (element.type === 'VK') {
        popupBtn.innerHTML = vkSvg;
      }
      if (element.type === 'Facebook') {
        popupBtn.innerHTML = fbSvg;
      }
      if (element.type === 'Другое') {
        popupBtn.innerHTML = otherSvg;
      }
    })
  }

  if (clientObj.contacts.length <= 5) {
    createContactsTable(clientObj.contacts);
  } else {
    createContactsTable(clientObj.contacts.slice(0, 4));
    const popupBtnMore = document.createElement('div');
    popupBtnMore.classList.add('popup__btn-more', 'popup__btn');
    popupBtnMore.textContent = `+${clientObj.contacts.length - 4}`
    contactTable.append(popupBtnMore);
    popupBtnMore.addEventListener('click', () => {
      popupBtnMore.remove();
      contactTable.querySelectorAll('.popup__wrap').forEach(element => element.remove());
      createContactsTable(clientObj.contacts);
    })
  }

  idTable.textContent = clientObj.id;
  nameTable.textContent = `${normName(clientObj.surname)} ${normName(clientObj.name)} ${normName(clientObj.lastName)}`;
  dateCreateTable.textContent = dateCreate.toLocaleDateString() + ' ';
  timeCreateTable.textContent = dateCreate.toLocaleTimeString('ru', option);
  dateChangeTable.textContent = dateChange.toLocaleDateString() + ' ';
  timeChangeTable.textContent = dateChange.toLocaleTimeString('ru', option);
  changeBtnTable.textContent = 'Изменить';
  deleteBtnTable.textContent = 'Удалить';

  tableBody.append(rowTable);
  rowTable.append(idTable, nameTable, dateCreateTable, dateChangeTable, contactTable, actionWrap);
  actionWrap.append(changeBtnTable, deleteBtnTable);
  dateCreateTable.append(timeCreateTable);
  dateChangeTable.append(timeChangeTable);
}


function createModal() {
  const modal = document.createElement('div'); 
  const title = document.createElement('h2');
  const closeBtn = document.createElement('button');
  const form = document.createElement('form');
  const wrapInputSurname = document.createElement('div');
  const labelSurname = document.createElement('label');
  const surnameRequired = document.createElement('span');
  const inputSurname = document.createElement('input');
  const wrapInputName = document.createElement('div');
  const labelName = document.createElement('label');
  const nameRequired = document.createElement('span');
  const inputName = document.createElement('input');
  const wrapInputLastName = document.createElement('div');
  const labelLastName = document.createElement('label');
  const inputLastName = document.createElement('input');
  const wrapperContacts = document.createElement('div');
  const contactsWrap = document.createElement('div');
  const addContactBtn = document.createElement('button');
  const wrapBtnCenter = document.createElement('div');
  const errorMessage = document.createElement('div');
  const saveBtn = document.createElement('button');
  const canselBtn = document.createElement('button');  
  const addContactSvg = `
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.99998 3.66665C6.63331 3.66665 6.33331 3.96665 6.33331 4.33331V6.33331H4.33331C3.96665 6.33331 3.66665 6.63331 3.66665 6.99998C3.66665 7.36665 3.96665 7.66665 4.33331 7.66665H6.33331V9.66665C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66665V7.66665H9.66665C10.0333 7.66665 10.3333 7.36665 10.3333 6.99998C10.3333 6.63331 10.0333 6.33331 9.66665 6.33331H7.66665V4.33331C7.66665 3.96665 7.36665 3.66665 6.99998 3.66665ZM6.99998 0.333313C3.31998 0.333313 0.333313 3.31998 0.333313 6.99998C0.333313 10.68 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.68 13.6666 6.99998C13.6666 3.31998 10.68 0.333313 6.99998 0.333313ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93998 1.66665 6.99998C1.66665 4.05998 4.05998 1.66665 6.99998 1.66665C9.93998 1.66665 12.3333 4.05998 12.3333 6.99998C12.3333 9.93998 9.93998 12.3333 6.99998 12.3333Z"/>
  </svg>
  `;                  

  modal.classList.add('modal'); 
  title.classList.add('modal__title');
  closeBtn.classList.add('modal__close', 'btn-reset');
  form.classList.add('modal__form');
  wrapInputSurname.classList.add('modal__input-wrap');
  labelSurname.classList.add('modal__label');
  inputSurname.classList.add('modal__input');
  wrapInputName.classList.add('modal__input-wrap');
  labelName.classList.add('modal__label');
  inputName.classList.add('modal__input');
  wrapInputLastName.classList.add('modal__input-wrap');
  labelLastName.classList.add('modal__label');
  inputLastName.classList.add('modal__input');
  surnameRequired.classList.add('modal__label--required');
  nameRequired.classList.add('modal__label--required');
  wrapperContacts.classList.add('modal__wrapper');
  contactsWrap.classList.add('modal__contacts-wrap');
  addContactBtn.classList.add('modal__add-contact', 'btn-reset');
  wrapBtnCenter.classList.add('modal__btn-center');
  errorMessage.classList.add('error-message');
  saveBtn.classList.add('modal__btn-save', 'btn-reset');
  canselBtn.classList.add('modal__cansel-contact', 'modal__undo', 'btn-reset');

  inputSurname.placeholder = 'Фамилия';
  inputName.placeholder = 'Имя';
  inputLastName.placeholder = 'Отчество';
  labelSurname.setAttribute('for', 'surname');
  inputSurname.setAttribute('id', 'surname');
  inputSurname.setAttribute('type', 'text');
  labelName.setAttribute('for', 'name');
  inputName.setAttribute('id', 'name');
  inputName.setAttribute('type', 'text');
  labelLastName.setAttribute('for', 'lastName');
  inputLastName.setAttribute('id', 'lastName');
  inputLastName.setAttribute('type', 'text');
  saveBtn.setAttribute('type', 'submit');

  title.textContent = 'Новый клиент';
  labelSurname.textContent = 'Фамилия';
  labelName.textContent = 'Имя';
  labelLastName.textContent = 'Отчество';
  surnameRequired.textContent = '*';
  nameRequired.textContent = '*';
  saveBtn.textContent = 'Сохранить';
  canselBtn.textContent = 'Отмена';
    
  modal.append(title, closeBtn, form);
  form.append(wrapInputSurname, wrapInputName, wrapInputLastName, wrapperContacts, wrapBtnCenter);
  wrapInputSurname.append(inputSurname, labelSurname);
  wrapInputName.append(inputName, labelName);
  wrapInputLastName.append(inputLastName, labelLastName);
  labelSurname.append(surnameRequired);
  labelName.append(nameRequired);
  wrapperContacts.append(contactsWrap, addContactBtn);
  addContactBtn.innerHTML = addContactSvg + 'Добавить контакт';
  wrapBtnCenter.append(errorMessage, saveBtn, canselBtn);

  addContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactsField = createContactsField();
    contactsWrap.append(contactsField.modalContacts)
    wrapperContacts.style = 'padding-top: 30px; padding-bottom: 30px';
    createInputMask();
    if (document.querySelectorAll('.modal__contacts').length > 9) {
      addContactBtn.classList.add('modal__add-contact--hidden');
    } 
    if (document.querySelectorAll('.modal__contacts').length > 4) {
      document.querySelector('.body__shadow').style = 'align-items: flex-start';
    } 
  })

  return {
    modal,
    title,
    closeBtn,
    form,
    inputSurname,
    inputName,
    inputLastName,
    wrapperContacts,
    contactsWrap,
    addContactBtn,
    errorMessage,
    saveBtn,
    canselBtn,
  }
}


function createConfirmModal() {
  const modalContent = document.createElement('div');
  const title = document.createElement('h2');
  const modalClose = document.createElement('button');
  const text = document.createElement('p');
  const deleteClient = document.createElement('button');
  const cansel = document.createElement('button');

  modalContent.classList.add('modal', 'modal-confirm');
  title.classList.add('modal__title');
  modalClose.classList.add('modal__close', 'btn-reset');
  text.classList.add('modal-confirm__text');
  deleteClient.classList.add('modal__btn-save', 'btn-reset');
  cansel.classList.add('modal__cansel-contact', 'btn-reset');

  title.textContent = 'Удалить клиента';
  text.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteClient.textContent = 'Удалить';
  cansel.textContent = 'Отмена';

  modalContent.append(title, modalClose, text, deleteClient, cansel);

  return {
    modalContent,
    deleteClient,
    modalClose,
    cansel,
  }
}


function openModalNewClient() {
  const createClientModal = createModal();
  const modalWrap = document.createElement('div');
  const bodyShadow = document.querySelector('.body__shadow');
  const modalExists = document.querySelectorAll('.modal');

  modalWrap.classList.add('body__shadow', 'modal__visibility');

  if (modalExists.length !== 0 ) {
    modalExists.forEach((element) => element.classList.remove('modal--hidden'));
    bodyShadow.classList.add('modal__visibility');
  } else {
    document.body.append(modalWrap);
    modalWrap.append(createClientModal.modal);
  }

  createClientModal.canselBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrap.remove();
  })

  modalWrap.addEventListener('mousedown', (e) => {
    if (e.target == modalWrap) {
      modalWrap.classList.remove('modal__visibility');
      createClientModal.modal.classList.add('modal--hidden');
    }
  });

  createClientModal.closeBtn.addEventListener('click', () => {
    modalWrap.remove();
  });
  
  createClientModal.form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkForm(createClientModal, 'POST');
  })
}


async function checkForm(modalElement, method, id) {
  const checkSurname = modalElement.inputSurname;
  const checkName = modalElement.inputName;
  const checkLastName = modalElement.inputLastName;
  const errorField = modalElement.errorMessage;
  const regexpName = /[^а-яА-ЯёЁ]+$/g;
  const regexpContact = /[^a-zA-Z0-9|@|.]+$/g;
  let checkResult = true;
  const dataContact = [];

  modalElement.errorMessage.textContent = '';

  modalElement.modal.querySelectorAll('.is-invalid').forEach((element) => element.classList.remove('is-invalid'));

  modalElement.wrapperContacts.querySelectorAll('input').forEach((element) => {
    dataContact.push({type: element.dataset.type, value : element.value.trim()});
    
    if (element.type === 'tel') {
      if (element.inputmask.unmaskedvalue().length < 10) {
        element.classList.add('is-invalid');
        errorField.textContent = `${errorField.textContent} Введите данные в поле ${element.dataset.type}`;
        checkResult = false;
      }
    } else {
      validatorName(element, element.dataset.type, regexpContact)
    }
  });

  const dataClient = {
    name: checkName.value.trim().toLowerCase(),
    surname: checkSurname.value.trim().toLowerCase(),
    lastName: checkLastName.value.trim().toLowerCase(),
    contacts: dataContact,
  };

  validatorName(checkSurname, 'Фамилия', regexpName);
  validatorName(checkName, 'Имя', regexpName)

  if (checkResult) {
    await postClientObj(dataClient, method, id);
    document.querySelectorAll('.body__shadow').forEach((element) => element.remove());

    createClientsList();
  }


  function validatorName(checkInput, meaning, regexp) {
    if (!checkInput.value.trim()) {
      checkInput.classList.add('is-invalid');
      errorField.textContent = `${errorField.textContent} Введите данные в поле ${meaning}`;
      checkResult = false;
    }

    if (regexp.test(checkInput.value.trim())) {
      checkInput.classList.add('is-invalid');
      errorField.textContent = `${errorField.textContent} Вы ввели недопустимые символы в поле ${meaning} `;
      checkResult = false;
    }

    return checkResult;
  }
}


function openModalChangeClient(clientObj) {
  const createClientModal = createModal();
  const titleId = document.createElement('span');
  const modalWrap = document.createElement('div');

  modalWrap.classList.add('body__shadow', 'modal__visibility');
  titleId.classList.add('modal__title-id');

  createClientModal.title.textContent = 'Изменить данные';
  titleId.textContent = `ID: ${clientObj.id}`;
  createClientModal.inputSurname.value = clientObj.surname;
  createClientModal.inputName.value = clientObj.name;
  createClientModal.inputLastName.value = clientObj.lastName;
  createClientModal.canselBtn.textContent = 'Удалить клиента';

  document.body.append(modalWrap);
  modalWrap.append(createClientModal.modal);
  createClientModal.title.append(titleId);

  for (contactItem of clientObj.contacts) {
    const createContact = createContactsField();
    createContact.modalSelected.textContent = contactItem.type
    createContact.modalData.value = contactItem.value;
    createContact.modalData.setAttribute('data-type', contactItem.type);
    if(contactItem.type === 'Телефон') {
      createContact.modalData.type = 'tel';
    } else {
      createContact.modalData.type = 'text';
    }
    
    createClientModal.contactsWrap.append(createContact.modalContacts);
    createClientModal.wrapperContacts.style = 'padding: 25px 30px';
    createInputMask();
    

    if (document.querySelectorAll('.modal__contacts').length > 9) {
      createClientModal.addContactBtn.classList.add('modal__add-contact--hidden');
    } 
    if (document.querySelectorAll('.modal__contacts').length > 5) {
      createClientModal.contactsScroll.style = 'overflow-y: scroll';
    } 
  }

  createClientModal.form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkForm(createClientModal, 'PATCH', clientObj.id);
  })

   createClientModal.closeBtn.addEventListener('click', () => {
    modalWrap.remove();
  });

  modalWrap.addEventListener('mousedown', (e) => {
    if (e.target == modalWrap) {
      modalWrap.remove();
    }
  });

  createClientModal.canselBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrap.remove();
    onDelete(clientObj);
  })
}


function createContactsField() {
  const modalContacts = document.createElement('div');
  const modalSelect = document.createElement('div');
  const modalSelected = document.createElement('button')
  const selectList = document.createElement('ul');
  const selectItemPhone = document.createElement('li');
  const selectItemOther = document.createElement('li');
  const selectItemEmail = document.createElement('li');
  const selectItemVk = document.createElement('li');
  const selectItemFb = document.createElement('li');
  const modalData = document.createElement('input');
  const btnDeleteContact = document.createElement('button');
  const selectedDirect = document.createElement('span');
  const popupDelWrap = document.createElement('div');
  const popupDel = document.createElement('div');
  const btnDeleteContactSvg = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"/>
    </svg>
  `;
  
  modalContacts.classList.add('modal__contacts');
  modalSelect.classList.add('modal__select');
  modalSelected.classList.add('modal__selected', 'btn-reset');
  selectList.classList.add('modal-select__list', 'list-reset', 'modal-select__list--hidden');
  selectItemPhone.classList.add('modal-select__item');
  selectItemOther.classList.add('modal-select__item');
  selectItemEmail.classList.add('modal-select__item');
  selectItemVk.classList.add('modal-select__item');
  selectItemFb.classList.add('modal-select__item');
  modalData.classList.add('modal__data');
  modalData.type = 'tel';
  modalData.setAttribute('data-type', 'Телефон');
  modalData.placeholder = 'Введите данные контакта';
  btnDeleteContact.classList.add('modal__btn-delete', 'btn-reset', 'popup__btn');
  selectedDirect.classList.add('selected-direct');
  popupDelWrap.classList.add('popup__wrap', 'popup-del__wrap')
  popupDel.classList.add('popup', 'popup-del');

  modalSelected.textContent = 'Телефон';
  selectItemPhone.textContent = 'Телефон';
  selectItemOther.textContent = 'Другое';
  selectItemEmail.textContent = 'Email';
  selectItemVk.textContent = 'VK';
  selectItemFb.textContent = 'Facebook';
  btnDeleteContact.innerHTML = btnDeleteContactSvg;
  popupDel.textContent = 'Удалить контакт';

  modalContacts.append(modalSelect, modalData, popupDelWrap);
  popupDelWrap.append(btnDeleteContact, popupDel);
  modalSelect.append(modalSelected, selectList);
  selectList.append(selectItemPhone, selectItemEmail, selectItemVk, selectItemFb, selectItemOther);
  modalSelected.append(selectedDirect);

  modalSelected.addEventListener('click', (e) => {
    e.preventDefault();
    selectList.classList.toggle('modal-select__list--hidden');
    selectedDirect.classList.toggle('selected-direct--rotate');
    selectList.querySelectorAll('li').forEach((element) => {
      element.style = 'display: list-item';

      if (element.textContent === modalSelected.textContent) {
        element.style = 'display: none';
      }
      
      element.addEventListener('click', (e) => {
        e.preventDefault();
        modalSelected.textContent = element.textContent;
        selectList.classList.add('modal-select__list--hidden');
        modalSelected.append(selectedDirect);
        selectedDirect.classList.remove('selected-direct--rotate');
        modalData.value = '';
        modalData.setAttribute('data-type', element.textContent);

        if(element.textContent === 'Телефон') {
          modalData.type = 'tel';
          createInputMask();
        } else {
          modalData.type = 'text';
          createInputMask();
        }
      })
    })
  });

  modalContacts.addEventListener('mouseleave', () => {
    selectList.classList.add('modal-select__list--hidden');
    selectedDirect.classList.remove('selected-direct--rotate');
  });

  btnDeleteContact.addEventListener('click', (e) => {
    e.preventDefault();
    modalContacts.remove();
    document.querySelector('.modal__add-contact').classList.remove('modal__add-contact--hidden');
    if (document.querySelectorAll('.modal__contacts').length === 0) {
      document.querySelector('.modal__wrapper').style = 'padding: 8px';
    }
  });

  return {
    modalContacts,
    modalSelect,
    modalSelected,
    modalData,
    btnDeleteContact,
  }
}


function createInputMask() {
  Inputmask.remove(document.querySelectorAll('input'));
  Inputmask({ mask: "+7 (999) 999-99-99"}).mask(document.querySelectorAll("input[type='tel']"));
}


function sortTable() {
  let dir = false;  
  const headCell = document.querySelectorAll('.table-sort');
  const startSort = document.querySelector('.table-head__id');
  const startSignId = startSort.querySelector('svg');

  const sortClients = (arr, prop, dir = false) => arr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);
  
  function renderClientsTable(clientsList) {
    for (const clientItem of clientsList) {
      createClientItem(clientItem);
    }
  }

  sortClients([...data], 'id', dir);

  headCell.forEach((element, index) => {
    const sortSign = element.querySelector('svg');

    element.dataset.direction = index;

    startSort.dataset.direction = 'sortUp';
    startSignId.classList.add('sort-sign--rotate'); 
    startSort.style.color = '#9873FF';

    element.addEventListener('click', () => {

      headCell.forEach((item, number) => {
        item.style.color = '#B0B0B0';
        element.style.color = '#9873FF';

        if (item.dataset.direction === `${index}`) {
          item.dataset.direction = 'sortUp';
        } else {
          item.dataset.direction = number;
        }
      })
      
      if (element.dataset.direction !== 'sortUp') {
        dir = true;
      } else {
        dir = false;
      }
      
      if (dir === false) {
        sortSign.classList.add('sort-sign--rotate'); 
        if (element.dataset.sort === 'surname') {element.querySelector('span').textContent = 'А-Я'};
      } else {
        sortSign.classList.remove('sort-sign--rotate');
        if (element.dataset.sort === 'surname') {element.querySelector('span').textContent = 'Я-А'};
      }
      removeTable();
      renderClientsTable(sortClients([...data], element.dataset.sort, dir));
    })
  })
}


function removeTable() {
  const tbody = document.querySelector('.table__body');
  tbody.innerHTML = '';
}


function onDelete(clientItem) {
  const modalConfirm = createConfirmModal();
  const modalWrap = document.createElement('div');
  modalWrap.classList.add('body__shadow', 'modal__visibility');
  document.body.append(modalWrap);
  modalWrap.append(modalConfirm.modalContent);

  modalWrap.addEventListener('mousedown', (e) => {
    if (e.target == modalWrap) {
      modalWrap.remove();
    }
  });

  modalConfirm.modalClose.addEventListener('click', () => {
    modalWrap.remove();
  });

  modalConfirm.cansel.addEventListener('click', () => {
    modalWrap.remove();
  })

  modalConfirm.deleteClient.addEventListener('click', () => {
    modalConfirm.modalContent.remove();
    modalWrap.classList.remove('modal__visibility');
    const clientIndex = data.findIndex(client => client.id === clientItem.id);
    data.splice(clientIndex, 1);  

    fetch(`http://localhost:3000/api/clients/${clientItem.id}`, {
      method: 'DELETE',
    });

    document.querySelectorAll('.table__row').forEach((element, index) => {
      if(clientIndex === index) {
        element.remove();
      }
    });    
  });
};


async function postClientObj(clientItem, method, id) {
  try {
    await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
      method,
      body: JSON.stringify(clientItem),
      headers: {
          'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    alert(error);
  }
}


async function getClientObj() {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET'
    });
    const clientsList = await response.json();

    return clientsList;
  } catch (error) {
    alert(error)
  }
}


async function searchClientObj(value) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
    method: 'GET'
  });
  const clientsList = await response.json();

  return clientsList;
}


async function createClientsList() {
  const clientsList = await getClientObj();
  data = [];

  removeTable();

  for (const clientItem of clientsList) {
    createClientItem(clientItem);
    data.push(clientItem);
  }
}
