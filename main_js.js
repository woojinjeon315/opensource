const diaryList = document.getElementById("diary-list");
const newEntryBtn = document.getElementById("new-entry-btn");
const searchInput = document.getElementById("search");

let entries = [];

newEntryBtn.addEventListener("click", () => {
  const date = prompt("날짜를 입력하세요 (예: 2025-05-23):");
  const content = prompt("일기 내용을 입력하세요:");
  const emotion = prompt("감정을 입력하세요 (예: 😊 😢 😠):");

  if (date && content) {
    const entry = { date, content, emotion };
    entries.push(entry);
    renderEntries(entries);
  }
});


function renderEntries(list) {
  diaryList.innerHTML = "";

  list.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "diary-entry";

    div.innerHTML = `
      <h3>${entry.date} ${entry.emotion || ""}</h3>
      <p>${entry.content}</p>
      <button onclick="editEntry(${index})">수정</button>
      <button onclick="deleteEntry(${index})">삭제</button>
    `;

    diaryList.appendChild(div);
  });
}

function deleteEntry(index) {
  if (confirm("정말 삭제하시겠습니까?")) {
    entries.splice(index, 1);
    renderEntries(entries);
  }
}

function editEntry(index) {
  const entry = entries[index];
  const newContent = prompt("수정할 내용을 입력하세요:", entry.content);
  const newEmotion = prompt("감정을 수정하세요:", entry.emotion || "");

  if (newContent !== null) {
    entries[index].content = newContent;
    entries[index].emotion = newEmotion;
    renderEntries(entries);
  }
}


searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = entries.filter(entry =>
    entry.date.includes(keyword) || entry.content.toLowerCase().includes(keyword)
  );
  renderEntries(filtered);
});
