---
title: html input 숫자 하나 입력 후 바로 다음으로 넘기기 
image: /images/210708-css-mac-sec-code/mac-two-factor-auth.png
---


맥의 이중인증(two-factor authentication)에서 보이는 input에서 숫자 하나만 입력하면 바로 다음 input으로 이동합니다. input을 그냥 사용하면 글이 끝없이 나오고, 탭을 눌러야만 다음
input으로 넘어갑니다. mac처럼 편한 input을 만드려면 어떻게 해야할까요??

### 실행 목표 (입력해보세요)

<cssMacTwoFactor></cssMacTwoFactor>

## 설명

### 1. input을 감쌀 요소 추가

key event를 등록하려면 input 마다 하는 것보다 **감싸는 요소를 두고 이벤트를 등록**하는 게 편합니다.

```html

<div id="wrapper"> <!-- 감싸는 요소 -->
</div>
```

### 2. input 최대 길이 설정

input에는 **글자 수를 제한할 수 있는 속성**이 있습니다. 바로 `maxlength`입니다. 제한을 둔 요소들을 원하는 만큼 둡니다.

```html

<div id="wrapper"> <!-- 감싸는 요소 -->
  <input maxlength="1">
  <input maxlength="1">
  <input maxlength="1">
  <input maxlength="1">
  <input maxlength="1">
</div>
```

보기 편하게 css를 약간 넣어주시구요

```css
input {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
}
```

### 3. Javascript 이벤트 등록

wrapper에 key event를 등록해줍니다. 지울
때엔 [backspace를 사용할 것이기 때문에 onkeypress는 사용할 수 없습니다.](https://stackoverflow.com/questions/4843472/javascript-listener-keypress-doesnt-detect-backspace)
그리고 해당 엘리멘트를 target으로 저장해두겠습니다.

```javascript
const i = document.getElementById('wrapper');

i.onkeydown = function(e) {
  const target = e.target;
}
```

### 4. Key 입력과 maxlength에 따른 조건 추가

이제 경우의 수를 생각해봅니다.

- key 입력이 backspace인 경우
  - 지울게 하나 남은 경우
  - 더 이상 지울 게 없는 경우
  - 그 외
- key 입력이 backspace가 아닌 경우
  - 입력이 적용되면 maxlength인 경우
  - 입력하기도 전에 maxlength인 경우
  - 그 외

그 외의 경우는 그냥 그대로 키입력이 적용되도록 놔두면 됩니다. 그럼 나머지 경우를 나타내볼까요

```javascript
// backspace를 누를 경우
if (e.key.toLowerCase() === 'backspace') {
  // 아직 입력할 게 남은 경우
  if (target.value.length === 1) {
  }
  // 더 이상 지울 것이 없는 경우 
  else if (target.value.length === 0) {
  }
}
// backspace외의 키를 누를 경우 입력해줍니다.
else {
  // 입력이 적용되면 maxlength인 경우 (또한 들어오는 키 값의 길이는 1개 이하여야한다.)
  if (target.value.length === maxlength - 1 && e.key.length <= 1) {
  }
  // 입력하기도 전에 maxlength인 경우
  else if (target.value.length === maxlength) {
  }
}
```

**지울게 하나 남은 경우** : 남은 하나를 지우고 키 입력을 적용하는 것 대신 바로 다음 요소에 focus를 맞춰줍니다.

```javascript
target.value = ''; // 값을 비운다
e.preventDefault(); // 키 입력 적용하지 않는다.
if (target.nextElementSibling) { // 다음 요소가 있을 경우만
  target.nextElementSibling.focus(); // 다음 요소에 포커싱
}
```

**더 이상 지울 게 없는 경우** : 바로 다음 요소에 focus를 맞춰줍니다.

```javascript
if (target.nextElementSibling) { // 다음 요소가 있을 경우만
  target.nextElementSibling.focus(); // 다음 요소에 포커싱
}
```

**입력이 적용되면 maxlength인 경우** : 마지막으로 입력한 키만 마저 채워주고 해당 이벤트(키값 적용)은 발생하지 않도록 하고 바로 다음 요소로 포커싱

```javascript
target.value = target.value + e.key;
e.preventDefault();
if (target.nextElementSibling) {
  target.nextElementSibling.focus();
} 
```

**입력하기도 전에 maxlength인 경우** : 더 이상 입력할 게 없으므로 바로 다음 요소로 포커싱

```javascript
if (target.nextElementSibling) {
  target.nextElementSibling.focus();
}
```

## 코드

바로 적용해보면서 확인해보실까요?! maxlength를 늘려도 잘 적용되는 것을 확인할 수 있습니다.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="bGWppJb" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/bGWppJb">
  two-factor-authentification</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
