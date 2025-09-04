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

  if(words.length === 0){
    wordContainer.innerHTML = `
        <div class="col-span-full">
            <img class="mx-auto mb-2" src="assets/alert-error.png" alt="alert-error">
            <p class="font-bangla text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bangla text-3xl mt-5">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
            <div class="bg-white py-7 px-5 rounded-lg">
                <div class="text-center space-y-3">
                    <h1 class="font-bold text-2xl">${word.word ? word.word : "শব্দ খুঁজে পাওয়া যায়নি"}</h1>
                    <p class="font-semibold">Meaning / Pronounciation</p>
                    <div class="text-2xl text-gray-500 font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
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
