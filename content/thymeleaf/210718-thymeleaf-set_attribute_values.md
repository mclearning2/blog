---
title: Thymeleaf 정리 - 속성값 설정 (Setting attribute values)
---

`th:*` 중에서 요소(tag)의 속성을 할당하는 다양한 방법들에 대해 알아보겠습니다.

HTML에는 많은 속성들이 있다보니 이에 맞춰 많은 `th:*`값들이 있습니다.

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

## th:attr (Not recommended)

`th:*` 형태로 사용하는 대신 `th:attr`를 사용하여 원하는 속성에 값을 대입할 수도 있습니다.

```html
<img
  src="../../images/gtvglogo.png"
  th:attr="src=@{/images/gtvglogo.png},title=#{logo},alt=#{logo}"
/>
```

이는 아래 코드와 같습니다. (`#{logo}`는 "Logo de Good Thymes값이 들어있다고 가정)

```html
<img
  src="/images/gtvglogo.png"
  title="Logo de Good Thymes"
  alt="Logo de Good Thymes"
/>
```

하지만 `th:value=${something}`과 `th:attr="value=${something}"`를 비교해봤을 떄, 앞의 것이 좀 더 짧고 명료해보이기 때문에, `th:attr`은 거의 사용하지 않습니다.

이와 비슷하게 두 가지 값을 동시에 할당할 수 있는 것도 있습니다. 참고만 해주세요.

```html
<!-- same -->
<!-- <img ... th:title="#{logo}" th:alt="#{logo}" />  -->
<img
  src="../../images/gtvglogo.png"
  th:src="@{/images/gtvglogo.png}"
  th:alt-title="#{logo}"
/>
```

## Appending and prepending

속성에 값을 덮어 쓰는 것이 아니라 앞이나 뒤에 값을 붙일 수 있습니다. 예를 들어 class 속성에 title 뿐만 아니라 red-color도 뒤에 추가하고싶다고 하겠습니다.

```html
<h2 class="title"></h2>
```

여기에 딱 좋은 dialect가 `th:attrappend` 또는 `th:classappend` 입니다. 다음 세 코드는 동일한 결과가 나옵니다. (${color} = 'red')

```html
<h2 class="title red"></h2>
```

```html [attrappend]
<h2 class="title" th:attrappend="class=${' ' + color}"></h2>
```

```html [th:classappend]
<h2 class="title" th:classappend="${color}"></h2>
```

## Fixed-value boolean attributes

HTML 속성들 중에 boolean 개념이 있는 것들이 있습니다. 예를 들어 input 태그에서 `checked`나 `disabled` 같은 것들은 존재하거나 없는 것으로 속성이 적용여부가 결정됩니다.

```html
<input type="checkbox" name="active" checked />
```

이에 맞게 `th:checked`와 `th:disabled` 등이 있으며, boolean(true or false) 값을 넣어줌으로써 속성을 동적으로 적용할 수 있습니다.

```html
<input type="checkbox" name="active" th:checked="${boolValue}" />
```

## Setting the value of any attribute (default attribute preprocessor)

Standard Dialect에 없다해도 `th:*`에 형태로만 적어준다면 원하는 속성값으로 넣을 수 있습니다.

```html
<span th:helloworld="${user.name}">...</span>
```

```html
<span helloworld="John Apricot">...</span>
```

## 마치며

다음 시간에는 반복을 통해 여러 태그를 만들 수 있는 `th:each`에 대해서 다뤄보겠습니다.
