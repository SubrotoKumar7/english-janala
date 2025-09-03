const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => showLessons(data.data))
}

const showLessons = lessons => {
    const container = document.getElementById("level-container");
    container.innerHTML = "";
    lessons.forEach(lesson => {
        const btn = document.createElement('div');
        btn.innerHTML = `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lessons - ${lesson.level_no}</button>
        `;
        container.append(btn);
    })
}

loadLessons();