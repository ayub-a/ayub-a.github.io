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
  rusTextDiv.setAttribute('class', 'rus-text');

  const engTextDiv = document.createElement('div');
  engTextDiv.setAttribute('class', 'eng-text');


  if (mobile) {
    return doForMobile(
      rusTextDiv, rusText,
      engTextDiv, engText,
    );
  }

  if (rusText.length > 8) {

    rusTextDiv.setAttribute('data-tooltip-rus', rusText);
    rusTextDiv.textContent = `${rusText.substring(0, 7)}...`;
    rusTextDiv.style.cursor = 'pointer';

    engTextDiv.setAttribute('data-tooltip-eng', engText);
    engTextDiv.textContent = `${engText.substring(0, 7)}...`;
    engTextDiv.style.cursor = 'pointer';

  } else {
    rusTextDiv.textContent = rusText;
    engTextDiv.textContent = engText;
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
  let rusTextCapitalize = rusText.split('')[0].toUpperCase() + rusText.slice(1);
  let engTextCapitalize = translitedToEng.split('')[0].toUpperCase() + translitedToEng.slice(1);

  addNewWordToLibrary(rusTextCapitalize, engTextCapitalize);
}

// script for mobile
function doForMobile(rusTextDiv, rusText, engTextDiv, engText) {
  rusTextDiv.removeAttribute('data-tooltip-rus');
  engTextDiv.removeAttribute('data-tooltip-eng');

  if (rusText.length > 8) {
    rusTextDiv.textContent = `${rusText.substring(0, 7)}...`;
    engTextDiv.textContent = `${engText.substring(0, 7)}...`;

    addEllipsisForMobile(rusTextDiv, rusText, engTextDiv, engText);
  } else {
    rusTextDiv.textContent = rusText;
    engTextDiv.textContent = engText;
  }

  libraryRus.appendChild(rusTextDiv);
  libraryEng.appendChild(engTextDiv);

  if (libraryRus.children.length > 0) libraryPlug.style.display = 'none';
}


function addEllipsisForMobile(rusTextDiv, rusText, engTextDiv, engText) {

  //rus text
  rusTextDiv.addEventListener('click', () => {
    rusTextDiv.setAttribute('data-tooltip-rus-mobile', rusText);

    setTimeout(() => {
      rusTextDiv.removeAttribute('data-tooltip-rus-mobile', rusText);
    }, 1500);
  })

  // eng text
  engTextDiv.addEventListener('click', () => {
    engTextDiv.setAttribute('data-tooltip-eng-mobile', engText);

    setTimeout(() => {
      engTextDiv.removeAttribute('data-tooltip-eng-mobile', engText);
    }, 1500);
  })

}