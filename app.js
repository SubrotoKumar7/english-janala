const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showLessons(data.data));
};

const loadLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showLevelWord(data.data));
};

const showLessons = (lessons) => {
  const container = document.getElementById("level-container");
  container.innerHTML = "";
  lessons.forEach((lesson) => {
    const btn = document.createElement("div");
    btn.innerHTML = `
            <button onclick="loadLevel(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lessons - ${lesson.level_no}</button>
        `;
    container.append(btn);
  });
};

loadLessons();

const showLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
            <div class="bg-white py-7 px-5 rounded-lg">
                <div class="text-center space-y-3">
                    <h1 class="font-bold text-2xl">${word.word}</h1>
                    <p class="font-semibold">Meaning / Pronounciation</p>
                    <div class="text-2xl text-gray-500 font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <div class="p-2 bg-[#1A91FF10] hover:bg-[#1A91FF50] rounded cursor-pointer"><i class="fa-solid fa-circle-info"></i></div>
                    <div class="p-2 bg-[#1A91FF10] hover:bg-[#1A91FF50] rounded cursor-pointer"><i class="fa-solid fa-volume-high"></i></div>
                </div>
            </div>
        `;
    wordContainer.append(wordCard);
  });
};
