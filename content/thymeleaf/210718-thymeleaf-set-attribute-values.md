---
title: Thymeleaf 정리 - 속성값 설정 (Setting attribute values)
tags: [test, test2, test3, 이렇게해도 되나]
image: /images/210713-what-is-thymeleaf/210713-164531.png
---

`th:*` 중에서 요소(tag)들의 속성 값을 할당할 수 있는 것들에 대해 다뤄보겠습니다.

HTML에는 많은 속성들이 있습니다. 그리고 이 속성들에 맞춰 많은 `th:*`값들이 있습니다. 상황에 맞춰서 `th:(할당할 속성)`을 이용하면 되겠습니다.

```
th:abbr
th:accesskey
th:alt
th:autocomplete
th:bgcolor
th:cellspacing
th:cite
th:class
th:name
th:ondrop
.
.
.
```
