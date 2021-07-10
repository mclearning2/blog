---
title: 셀렉트박스(selectbox) option css 커스텀
image:  
---

HTML에서 셀렉트박스(selectbox)를 css로 custom하고 싶은데 option은 기본적으로 할 수가 없습니다.
그래서 select option을 사용하되, 보이는 부분은 다른 요소로 하는 방법을 사용할 겁니다.

## 실행 목표 (한번 클릭해보세요)

<stackoverflow-custom-select></stackoverflow-custom-select>

## 설명

### HTML] wrapper 만들기

select와 option 기반으로 또다른 요소를 만들겁니다. 하지만 select와 동일한 위치에 있어야겠죠?
위치를 잡아주기 위해 이를 감싸는 요소를 하나 만듭니다.

```html
<div class="select-wrapper"> <!-- 감싸는 요소 -->
  <select>
    <option selected hidden disabled>Select word</option>
    <option value="apple">apple</option>
    <option value="banana">banana</option>
    <option value="coin">coin</option>
    <option value="dragon">dragon</option>
    <option value="emerald">emerald</option>
  </select>
</div>
```

### JS] 새로운 div 만들기

위 select 기반으로 동일한 내용이 담긴 div들을 만듭니다.

- div.selected-item : 선택된 아이템 표시하는 부분
- div.option-list: option들을 감싸고 있는 부분
- div.option-item: option을 대체

![](/images/210710-select-customize/select-custom.png)

```javascript

// select를 여러 개 만들 수도 있기 때문에 해당 클래스들을 모두 가져옵니다.
const wrapper = document.getElementsByClassName('select-type');
for (const w of wrapper) {
  // 기존 select
  const oldSelect = w.getElementsByTagName('select')[0];
  
  // 선택된 select 표시하는 부분
  const selectedItem = document.createElement('div');
  selectedItem.setAttribute('class', 'selected-item');
  
  // select에 선택되어 있는 값 할당
  selectedItem.innerHTML = oldSelect.options[oldSelect.selectedIndex].innerHTML;

  // option들을 감싸줄 영역
  // 기본적으로 보이지 않게 하기 위해 (class) option-list-hidden 추가
  const optionList = document.createElement('div');
  optionList.setAttribute('class', 'option-list option-list-hidden');

  // 기존 select option 값들 할당
  for (let i = 0; i < oldSelect.length; i++){
    const option = document.createElement('div');
    option.setAttribute('class', 'option-item');
    option.innerHTML = oldSelect.options[i].innerHTML;
    
    optionList.appendChild(option);
  }
  w.appendChild(selectedItem);
  w.appendChild(optionList);
}
```

그러면 다음과 같이 나타나게 됩니다. 
![](/images/210710-select-customize/result1.png)

### placeholder 역할을 하는 hidden, selected

selectbox엔 placeholder가 없지만 option에서 `selected`로 기본으로 선택되게 한 다음, 
hidden으로 숨기는 방법으로 이를 대체하고 있습니다. 우리가 구현한 div에서도 동일하게 적용되도록 해야겠죠?

```javascript
// ...

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

  optionList.appendChild(option);
}

// ...
```

자 이제 필요한 요소들은 다 있는데, 보이는게 별로 마음에 안드네요. 약간 css로 손대도록 하겠습니다.

![](/images/210710-select-customize/result2.png)

### css로 꾸미기
```css

.select-wrapper {
  position: relative; 
  width: 200px;
  cursor: pointer; /* hover 시 커서를 클릭되는 모양으로 변경 */
  user-select: none; /* 드래그 방지 */
}

/* 기존의 select 가리기 */
.select-wrapper select {
  display: none;
}

/* 선택된 select item 표시 */
.selected-item {
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
.option-list {
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
.option-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.option-item:hover {
  background-color: #e29c9c;
}

/* 이 클래스가 있다면 숨기도록(클릭할 때 토글) */
.option-list-hidden {
  display: none;
}
```

### 이벤트 등록

여기까지는 아무일도 일어나지를 않습니다. 마우스 클릭 시 다음과 같은 일들이 일어나야 합니다.

- .select-wrapper 내에 클릭시 열리거나 닫혀야한다. (toggle)
- .select-wrapper 외에 클릭시 닫혀야한다.
- .option-item 선택되었을 때 해당 값이 .selecte-item 의 값을 바꾸어야 한다.

```javascript
  //...

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
```

## 코드

select 하나 떄문에 너무나 긴 코드를 작성한 것 같지만 하나의 javascript로 여러 개의 select 기능이
동작하도록 할 수 있습니다.

<p class="codepen" data-height="483" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWmjaqJ" data-editable="true" data-user="mclearning2" style="height: 483px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/MWmjaqJ">
  select-custom</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
