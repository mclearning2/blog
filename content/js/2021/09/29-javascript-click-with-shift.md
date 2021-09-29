---
title: Javascript에서 마우스 클릭 쉬프트랑 같이 적용하는 법
tags:
  - event
---

가끔 쉬프트를 누르면서 마우스 클릭한 이벤트를 처리하고 싶은 경우가 있다.

<!--more-->

이벤트 리스너에서 `shiftKey` 값이 True인지 확인하면 된다.

```js
window.addEventListener('click', function (event) {
  if (event.shiftKey) {
    alert('Shift key is pressed.');
  } else {
    alert('Shift key is not pressed.');
  }
});
```
