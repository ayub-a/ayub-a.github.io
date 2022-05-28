const libraryInput = document.querySelector('.library-add-input');
  libraryInput.setAttribute('placeholder', 'только кирилица');

const addToLibraryBtn = document.querySelector('.library-add-btn');
const clearLibraryBtn = document.querySelector('.library-clear-btn');
const libraryRus = document.querySelector('.library-rus');
const libraryEng = document.querySelector('.library-eng');
const libraryPlug = document.querySelector('.library-plug');
const emptyInput = document.querySelector('.empty-input');


// add new word to library button
addToLibraryBtn.addEventListener('click', () => {
  const inputValue = libraryInput.value;

  let translited = translit(inputValue);
  addWordToLibrary(inputValue, translited, inputValue);

  libraryInput.value = '';
});

// сlear library button
clearLibraryBtn.addEventListener('click', () => {
  libraryRus.textContent = '';
  libraryEng.textContent = '';
  libraryPlug.textContent = 'Наполни меня';
})

function alertEmptyInput() {
  emptyInput.classList.add('active');

  setTimeout(() => {
    emptyInput.classList.remove('active');
  }, 1500);
}

// add new word to library 
function addWordToLibrary(rus, eng, input) {
  if (input.length === 0) return alertEmptyInput();
  libraryPlug.textContent = '';

  const rusText = document.createElement('div');
    rusText.textContent = rus.split('')[0].toUpperCase() + rus.slice(1);
    rusText.setAttribute('class', 'rus-text');

  const engText = document.createElement('div');
    engText.textContent = eng.split('')[0].toUpperCase() + eng.slice(1);
    engText.setAttribute('class', 'eng-text');

  if(input.length > 10) {
    rusText.setAttribute('data-tooltip-rus', rus);
    engText.setAttribute('data-tooltip-rus', eng);
  }

  libraryRus.appendChild(rusText);
  libraryEng.appendChild(engText);
}

// T.R.A.N.S.L.I.T.
function translit(strRus) {
  if (strRus.length === 0) return 0;

  const rusEng = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'j',
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

  let res = '';

  for (let i = 0; i < strRus.length; i++) {

    for (let letter in rusEng) {
      if (strRus[i].toLowerCase() === letter) {
        res += rusEng[letter];
      }

      // if (strRus[i].toLowerCase() === rusEng[letter]) {
      //   res += letter;
      // }
    }
  }

  return res;
}

