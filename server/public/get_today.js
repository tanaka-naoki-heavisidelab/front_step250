document.addEventListener('DOMContentLoaded', function () {
  setTodayDate();
});

// 今日の日付を取得してinput要素に設定する関数
function setTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  document.getElementById('end_time').value = formattedDate;
}