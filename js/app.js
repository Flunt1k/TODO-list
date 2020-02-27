let submitBtn = document.getElementById('add-button');
let myForm = document.querySelector('form');
let editBtn = document.getElementsByClassName('edit')[0];
let deleteBtn = document.getElementsByClassName('delete')[0];
let item = document.getElementsByClassName('todo-item')[0];
let checkBox = document.getElementsByClassName('checkbox')[0];
let counter = 0;
let isClickedEdit = false;
let save;

function addNewTODO(input) {
    counter++;
    let copyElement = item.cloneNode(true);
    let inputBlock = copyElement.childNodes[3];
    let editButton = copyElement.childNodes[7];
    let deleteButton = copyElement.childNodes[9];
    let checkBoxButton = copyElement.childNodes[1];
    inputBlock.textContent = input.value;
    editButton.addEventListener('click', editTODOBlock);
    deleteButton.addEventListener('click', deleteTODOBlock);
    checkBoxButton.addEventListener('change', checkTODOBlock);
    document.getElementById('todo-list').appendChild(copyElement);
    input.value = '';
}

function editTODOBlock() {
    let currentBtn = this.parentNode.childNodes;
    let allButtons = [].slice.call(document.querySelectorAll('button'));
    allButtons = allButtons.concat([].slice.call(document.getElementsByClassName('checkbox')));
    if (!isClickedEdit){
        this.id = 'set';
       allButtons.forEach((btn) => {
            if (btn.id !== 'set') btn.disabled = true;

        });
        currentBtn[5].setAttribute('style', 'display: block');
        currentBtn[5].value = currentBtn[3].textContent;
        save = currentBtn[3].textContent;
        currentBtn[5].addEventListener('keyup', function(){
            currentBtn[3].textContent =  currentBtn[5].value;
        });
        isClickedEdit = true;
    } else {
        if (currentBtn[3].textContent === ''){
            if(confirm('Ваша заметка пуста, удалить её?')){
                deleteTODOBlock();
            } else {
                console.log(231);
                currentBtn[5].value = save;
                currentBtn[3].textContent = save;
            }
        } else {
            currentBtn[5].removeAttribute('style');
            this.removeAttribute('id');
            allButtons.forEach((btn) => {
                if (btn.id !== 'set') btn.disabled = false;

            });
            isClickedEdit = false;
        }
    }



}

function deleteTODOBlock(){
    document.getElementById('todo-list').removeChild(this.parentNode)
}

function checkTODOBlock(){
    let currentBlock = this.parentNode;
    if(this.checked){
        currentBlock.childNodes[7].disabled = true;
        currentBlock.childNodes[9].disabled = true;
        currentBlock.style.backgroundColor = '#c2c2d6';
    } else {
        currentBlock.childNodes[7].disabled = false;
        currentBlock.childNodes[9].disabled = false;
        currentBlock.style.backgroundColor = '#fff';
    }
}

function formController(event){
    if (event.target === submitBtn){
        let input = document.getElementById('add-input');
        input.value = (input.value).trim();
        if (input.value === '') {
            input.innerHTML = '';
            return alert('Input is blank');
        }

        addNewTODO(input);
    }

}

submitBtn.addEventListener('click', formController);
editBtn.addEventListener('click', editTODOBlock);
deleteBtn.addEventListener('click', deleteTODOBlock);
checkBox.addEventListener('change', checkTODOBlock);



//Prevent refresh the page when click on submit button
myForm.addEventListener('submit', (event) =>{
    event.preventDefault();
});