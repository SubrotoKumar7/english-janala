const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showLessons(data.data));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; 
  window.speechSynthesis.speak(utterance);
}

const removeActive = () => {
  const lessonsBtn = document.querySelectorAll(".lessons-btn");
  lessonsBtn.forEach((active) => {
    active.classList.remove("active");
  });
};

const loadLevel = (id) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const btnStatus = document.getElementById(`btn-${id}`);
      btnStatus.classList.add("active");
      showLevelWord(data.data);
    });
};

const showLessons = (lessons) => {
  const container = document.getElementById("level-container");
  container.innerHTML = "";
  lessons.forEach((lesson) => {
    const btn = document.createElement("div");
    btn.innerHTML = `
            <button id="btn-${lesson.level_no}" onclick="loadLevel(${lesson.level_no})" class="btn btn-outline btn-primary lessons-btn"><i class="fa-solid fa-book-open"></i> Lessons - ${lesson.level_no}</button>
        `;
    container.append(btn);
  });
};

loadLessons();

const showLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full">
            <img class="mx-auto mb-2" src="assets/alert-error.png" alt="alert-error">
            <p class="font-bangla text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bangla text-3xl mt-5">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    spinner(false);
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
            <div class="bg-white py-7 px-5 rounded-lg h-full">
                <div class="text-center space-y-3">
                    <h1 class="font-bold text-2xl">${
                      word.word ? word.word : "শব্দ খুঁজে পাওয়া যায়নি"
                    }</h1>
                    <p class="font-semibold">Meaning / Pronounciation</p>
                    <div class="text-2xl text-gray-500 font-bangla">"${
                      word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                    } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <div onclick="loadWordDetails(${word.id})" class="p-2 bg-[#1A91FF10] hover:bg-[#1A91FF50] rounded cursor-pointer"><i class="fa-solid fa-circle-info"></i></div>
                    <div onclick="pronounceWord('${word.word}')" class="p-2 bg-[#1A91FF10] hover:bg-[#1A91FF50] rounded cursor-pointer"><i class="fa-solid fa-volume-high"></i></div>
                </div>
            </div>
        `;
    wordContainer.append(wordCard);
  });
  spinner(false);
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showWordDetails(details.data);
};

const showWordDetails = (word) => {
  const modal = document.getElementById("word-details-container");
  modal.innerHTML = `
        <div class="space-y-5">
            <div class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation})</div>
            <div class="font-semibold">Meaning</div>
            <p class="font-bangla">${word.pronunciation}</p>
            <div class="font-semibold">Example</div>
            <p class="text-gray-500">${word.sentence}</p>
            <div class="font-semibold font-bangla">সমার্থক শব্দ গুলো</div>
            <div class="flex justify-start items-center gap-2">${synonymElements(word.synonyms)}</div>
        </div>
    `;
  document.getElementById("word_modal").showModal();
};

const synonymElements = (arr) => {
  const elements = arr.map(ele => `<span class="btn">${ele}</span>`);
  return elements.join(" ");
}

const spinner = (status) => {
  if(status === true){
    document.getElementById('spinner').classList.remove("hidden");
    document.getElementById('word-container').classList.add("hidden");
  }
  else{
    document.getElementById('word-container').classList.remove("hidden");
    document.getElementById('spinner').classList.add("hidden");
  }
}

document.getElementById('btn-search').addEventListener('click', () => {
  removeActive();
  const userInput = document.getElementById('user-input');
  const searchValue = userInput.value.trim().toLowerCase();
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res => res.json())
  .then(data => {
    const words = data.data;
    const filter = words.filter((word) => word.word.toLowerCase().includes(searchValue));
    showLevelWord(filter);
  })
})