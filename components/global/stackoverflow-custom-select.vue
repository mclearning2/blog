<template>
  <div class="select-wrapper">
    <!-- 감싸는 요소 -->
    <select>
      <option selected hidden>Select word</option>
      <option value="apple">apple</option>
      <option value="banana">banana</option>
      <option value="coin">coin</option>
      <option value="dragon">dragon</option>
      <option value="emerald">emerald</option>
    </select>
  </div>
</template>

<script>
export default {
  mounted() {
    // select를 여러개 만들 수도 있기 때문에 해당 클래스들을 모두 가져옵니다.
    const wrapper = document.getElementsByClassName('select-wrapper');
    for (const w of wrapper) {
      // 기존 select
      const oldSelect = w.getElementsByTagName('select')[0];

      // 선택된 select 표시하는 부분
      const selectedItem = document.createElement('div');
      selectedItem.setAttribute('class', 'selected-item');

      // select에 선택되어 있는 값 할당
      selectedItem.innerHTML =
        oldSelect.options[oldSelect.selectedIndex].innerHTML;

      // option들을 감싸줄 영역
      const optionList = document.createElement('div');
      optionList.setAttribute('class', 'option-list option-list-hidden');

      for (let i = 0; i < oldSelect.length; i++) {
        // 만약 hidden 된거라면 만들지 않기
        // -----------------------------------------------------------------------
        if (oldSelect.options[i].getAttribute('hidden') !== null) {
          continue;
        }
        // -----------------------------------------------------------------------

        const option = document.createElement('div');
        option.setAttribute('class', 'option-item');
        option.innerHTML = oldSelect.options[i].innerHTML;

        // 클릭 시 표시할 값 교체 (기존 select도 마찬가지로 같이 업데이트)
        option.addEventListener('click', (e) => {
          selectedItem.innerHTML = e.target.innerHTML;
          oldSelect.selectedIndex = i;
        });
        optionList.appendChild(option);
      }

      // select wrapper를 클릭하면 열리거나 닫히는 toggle!
      w.addEventListener('click', (e) => {
        if (optionList.classList.contains('option-list-hidden')) {
          optionList.classList.remove('option-list-hidden');
        } else {
          optionList.classList.add('option-list-hidden');
        }
        // 외부 클릭까지 적용되는 것을 막기
        e.stopPropagation();
      });

      w.appendChild(selectedItem);
      w.appendChild(optionList);

      // select 밖에서는 select가 닫히도록 구현
      document.addEventListener('click', () => {
        optionList.classList.add('option-list-hidden');
      });
    }
  },
};
</script>

<style>
.select-wrapper {
  position: relative;
  width: 200px;
  cursor: pointer; /* hover 시 커서를 클릭되는 모양으로 변경 */
  user-select: none; /* 드래그 방지 */
  margin: 30px auto;
}

/* 기존의 select 가리기 */
.select-wrapper select {
  display: none;
}

/* 선택된 select item 표시 */
.select-wrapper .selected-item {
  display: flex;
  align-items: center;
  height: 50px;

  padding-left: 20px;
  padding-right: 20px;

  border: 1px solid black;
  border-radius: 4px;

  color: white;
  background-color: #e29c9c;
}

/* select-item 바로 아래에 option들을 감싸주는 요소 */
.select-wrapper .option-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #f1c5c5;
  border-radius: 4px;
  padding: 4px 4px;
  box-sizing: border-box;
  z-index: 1000;
}

/* option을 대체 */
.select-wrapper .option-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.select-wrapper .option-item:hover {
  background-color: #e29c9c;
}

/* 이 클래스가 있다면 숨기도록(클릭할 때 토글) */
.select-wrapper .option-list-hidden {
  display: none;
}
</style>
