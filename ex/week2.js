const open = document.getElementById("submit-btn");
const close = document.getElementById("close");
const modal = document.querySelector(".modal-wrapper");

open.onclick = () => {
  event.preventDefault();
  modal.style.display = "flex";
};

close.onclick = () => {
  modal.style.display = "none";
};

let info = document.getElementById('name');
let nameI = document.getElementById('name-i');
let nickname = document.getElementById('nickname');
let nicknameI = document.getElementById('nickname-i');
let email = document.getElementById('email');
let emailI = document.getElementById('email-i');
let password = document.getElementById('password');
let passwordI = document.getElementById('password-i');
let repassword = document.getElementById('repassword');
let repasswordI = document.getElementById('repassword-i');
let check = [false, false, false, false, false];

function checking(check) {
  if (!check.includes(false)) {
    open.disabled = false;
  }
}

function email_check(e) {
  const regex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return e != '' && e != 'undefined' && regex.test(e);
}

function password_check(e) {
  const regex =
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{5,20}$/;
  return e != '' && e != 'undefined' && regex.test(e);
}

info.addEventListener('input', () => {
  if (info.value == '' || info.value.trim() == '') {
    nameI.innerText = '필수 입력 항목입니다!';
    nameI.style.color = 'red';
    nameI.style.visibility = 'visible';
    check[0] = false;
    open.disabled = true;
  } else {
    nameI.innerText = '멋진 이름이네요!';
    nameI.style.color = 'greenyellow';
    nameI.style.visibility = 'visible';
    check[0] = true;
    checking(check);
  }
});

nickname.addEventListener('input', () => {
  if (nickname.value.length < 2 || nickname.value.length > 5) {
    nicknameI.innerText = '닉네임은 2~5글자로 구성해주세요!';
    nicknameI.style.color = 'red';
    nicknameI.style.visibility = 'visible';
    check[1] = false;
    open.disabled = true;
  } else {
    nicknameI.innerText = '멋진 닉네임이군요!';
    nicknameI.style.color = 'greenyellow';
    nicknameI.style.visibility = 'visible';
    check[1] = true;
    checking(check);
  }
});

email.addEventListener('input', () => {
  if (!email_check(email.value)) {
    emailI.innerText = '올바른 메일 형식이 아닙니다!';
    emailI.style.color = 'red';
    emailI.style.visibility = 'visible';
    check[2] = false;
    open.disabled = true;
  } else {
    emailI.innerText = '올바른 메일 형식입니다!';
    emailI.style.color = 'greenyellow';
    emailI.style.visibility = 'visible';
    check[2] = true;
    checking(check);
  }
});

password.addEventListener('input', () => {
  if (!password_check(password.value)) {
    passwordI.innerText = '영어+숫자+특수문자를 조합하여 작성해주세요.';
    passwordI.style.color = 'red';
    passwordI.style.visibility = 'visible';
    check[3] = false;
    open.disabled = true;
  }
  else {
    passwordI.innerText = '안전한 비밀번호입니다!';
    passwordI.style.color = 'greenyellow';
    passwordI.style.visibility = 'visible';
    check[3] = true;
    checking(check);
  }
});

repassword.addEventListener('input', () => {
  if (password.value != repassword.value) {
    repasswordI.innerText = '비밀번호가 일치하지 않습니다.';
    repasswordI.style.color = 'red';
    repasswordI.style.visibility = 'visible';
    check[4] = false;
    open.disabled = true;
  } else {
    repasswordI.innerText = '비밀번호가 일치합니다.';
    repasswordI.style.color = 'greenyellow';
    repasswordI.style.visibility = 'visible';
    check[4] = true;
    checking(check);
  }
});