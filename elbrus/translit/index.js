const libraryInput = document.querySelector('.library-add-input');
  libraryInput.setAttribute('placeholder', 'только кирилица');

const addToLibraryBtn = document.querySelector('.library-add-btn');
const clearLibraryBtn = document.querySelector('.library-clear-btn');
const libraryRus = document.querySelector('.library-rus');
const libraryEng = document.querySelector('.library-eng');
const libraryPlug = document.querySelector('.library-plug');
const emptyInput = document.querySelector('.empty-input');


// check mobile 
const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(mobile){
  emptyInput.textContent = '';
  emptyInput.textContent = 'Мобильная версия в разработке!';

  emptyInput.classList.add('active');
  
  setTimeout(() => {
    emptyInput.classList.remove('active');
  }, 3000);
}

// add to library button
addToLibraryBtn.addEventListener('click', () => {
  inputValidation(libraryInput.value)
});

// input validation
function inputValidation(inputValue) {

  if (inputValue.length > 30) {
    emptyInput.textContent = '';
    emptyInput.textContent = 'Не более 30 символов';
    return errorAlert();
  }

  if (inputValue.match(/\d/)) {
    emptyInput.textContent = '';
    emptyInput.textContent = 'Без цифр';
    return errorAlert();
  } 

  if (inputValue.length === 0 || inputValue === ' ') {
    emptyInput.textContent = '';
    emptyInput.textContent = 'Поле ввода пустое';
    return errorAlert();
  }

  if (inputValue.match(/\w/)) {
    emptyInput.textContent = '';
    emptyInput.textContent = 'Только кириллица';
    return errorAlert();
  }

  libraryInput.value = '';

  translit(inputValue);
}

// сlear library button
clearLibraryBtn.addEventListener('click', () => {

  if (libraryRus.children.length === 0) {
    emptyInput.textContent = '';
    emptyInput.textContent = 'И так чисто, куда чище';
    return errorAlert();
  } 

  libraryRus.textContent = '';
  libraryEng.textContent = '';
  libraryPlug.style.display = 'block';
})

// error alert
function errorAlert() {

  emptyInput.classList.add('active');
  
  setTimeout(() => {
    emptyInput.classList.remove('active');
  }, 1500);
}

// add new word to library 
function addNewWordToLibrary(rusText, engText) {

  const rusTextDiv = document.createElement('div');
    let rusText0ToUpperCase = rusText.split('')[0].toUpperCase() + rusText.slice(1);
    rusTextDiv.textContent = rusText0ToUpperCase;
    rusTextDiv.setAttribute('class', 'rus-text');

  const engTextDiv = document.createElement('div');
    let engText0ToUpperCase = engText.split('')[0].toUpperCase() + engText.slice(1);
    engTextDiv.textContent = engText0ToUpperCase;
    engTextDiv.setAttribute('class', 'eng-text');

  if (mobile) {
    console.log('mobile');
    return doForMobile(
      rusTextDiv, rusText0ToUpperCase,
      engTextDiv, engText0ToUpperCase,
      rusText
    );
  }

  if (rusText.length > 10) {
    console.log('desktop');
    rusTextDiv.setAttribute('data-tooltip-rus', rusText0ToUpperCase);
    rusTextDiv.style.cursor = 'pointer';

    engTextDiv.setAttribute('data-tooltip-eng', engText0ToUpperCase);
    engTextDiv.style.cursor = 'pointer';
  }

  libraryRus.appendChild(rusTextDiv);
  libraryEng.appendChild(engTextDiv);

  if (libraryRus.children.length > 0) libraryPlug.style.display = 'none';
}

// T.R.A.N.S.L.I.T.
function translit(rusText) {

  const rusEng = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'yo',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sh',
    ы: 'i',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': ' ',
    '.': '.',
    ',': ',',
    '!': '!',
    '?': '?',
  };

  let translitedToEng = '';

  for (let i = 0; i < rusText.length; i++) {

    for (let letter in rusEng) {
      if (rusText[i].toLowerCase() === letter) {
        translitedToEng += rusEng[letter];
      }
    }
  }

  addNewWordToLibrary(rusText, translitedToEng);
}

// script for mobile
function doForMobile(...idk) {
  idk[0].removeAttribute('data-tooltip-rus');
  idk[2].removeAttribute('data-tooltip-eng');

  if (idk[4].length > 10) {

    idk[0].addEventListener('click', () => {
      idk[0].setAttribute('data-tooltip-rus-mobile', idk[1]);
  
      setTimeout(() => {
        idk[0].removeAttribute('data-tooltip-rus-mobile', idk[1]);
      }, 1500);
    })
  
    idk[2].addEventListener('click', () => {
      idk[2].setAttribute('data-tooltip-eng-mobile', idk[3]);
  
      setTimeout(() => {
        idk[2].removeAttribute('data-tooltip-eng-mobile', idk[3]);
      }, 1500);
    })

  }

  libraryRus.appendChild(idk[0]);
  libraryEng.appendChild(idk[2]);

  if (libraryRus.children.length > 0) libraryPlug.style.display = 'none';
}

