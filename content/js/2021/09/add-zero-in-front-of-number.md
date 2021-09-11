---
title: Javscript 숫자 앞에 0 붙이기
---

달력을 표시할 때나 숫자들의 표시 나열일 일관성있게 하기 위해 앞에 0을 붙인다. 그에 대한 방법을 알아본다.

<!--more-->

## 방법

- `slice` 함수에 음수를 사용하면 끝에서 n번 째 문자부터 끝 문자까지 추출할 수 있다.
- `repeat` 함수는 문자열을 반복해서 만들어준다.

![](/images/add-zero-in-front-of-number/210910-143402.png)

```js[test.js]
function addZero(text, num) {
  return ("0".repeat(num) + text).slice(-num);
}
```

## 예제

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="xxrEZKx" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/xxrEZKx">
  </a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>