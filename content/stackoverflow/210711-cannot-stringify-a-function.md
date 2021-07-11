---
title: NuxtJS cannot stringify a function 문제
image: /images/210711-cannot-stringify-a-function/210711-195534.png
---

NuxtJS에서 배포를 하는데 알 수없는 Warning이 발생했습니다. 해결은 하긴 했지만 우연히 알게된 거라 정확한 원인은 모르겠습니다.
다만 도움이 되시길 바라며 글을 씁니다.

```
Cannot stringify a function _7f5f4f01
```

함수 이름이 청크(chunk) 형태로 분할되어 있어서 어떤 함수인지 몰라 검색을 해보았습니다.

[stackoverflow의 한 답변](https://stackoverflow.com/questions/57959383/nuxt-all-pages-show-a-warning-cannot-stringify-a-function-object-how-do-i-fi)에 의하면
asyncData, data, vuex store state 부분에 문제 있을 수 있다고 확인해보라 해서 여러가지 수정을 해본 결과

this.$router.options.routes을 사용하는 `store.commit`을 created에서 사용하고 있었는데 이를 mounted로 옮기니 되었습니다.

아무래도 어떤 함수내에서 부르지 못했다던가 뭔가 문제일거같은데 mounted로 가니 해결되었습니다.
