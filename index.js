const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

/*
    1. 삭제 버튼 추가
    2. 저장 기능
    3. 삭제 버튼 -> 저장된 데이터 업데이트
*/

let todos = [];

const save = () => {
    localStorage.setItem('todos',JSON.stringify(todos));
}

const delItem = (event) => {
    const target = event.target.parentElement;
    
    todos = todos.filter((todo) => todo.id != target.id); //각각의 요소에 필터적용 지우려는 타겟의 아이디값과 다른 값들을 모아서 todos에 저장
    save();

    target.remove();
}

const addItem = (todo) =>{ //input.value는 텍스트로 취급
    if(todo.text !== ''){
        const li = document.createElement('li');
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerText = todo.text;
        button.innerText = '삭제';
        button.addEventListener('click',delItem);

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
        li.id = todo.id;
    }
}

const handler = (event) => {
    event.preventDefault(); //새로고침 안되게

    const todo = {
        id : Date.now(),
        text : input.value,
    };

    todos.push(todo);
    addItem(todo); //addItem 호출 input.value값을 넘겨줌
    save();
    input.value = ''; //addItem 동작 종료후 input.value는 공백으로 초기화
}

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    
    if(userTodos){
        userTodos.forEach((todo) => {
            addItem(todo);
        });
    
        todos = userTodos;
    }
}

init();
form.addEventListener('submit',handler); //form이 submit 이벤트가 일어날때 handler함수 동작

