---
title: NuxtJS fetch 와 asyncData 차이
createdAt: 2021-09-20
---

Nuxt에서 페이지가 마운트 되기 전에 API를 호출하여 데이터를 가져오는 두 가지 방법에 대해 알아보겠습니다.

<!--more-->

## Data Fetching

NuxtJS에서는 비동기적으로 데이터를 불러오기 위해 두 가지 hook을 제공합니다.

- `asyncData`
- `fetch`

둘 다 API를 호출하여 데이터를 가져오는 목적은 동일하나 미묘한 차이가 있습니다.

## 비교

- `asyncData`는 `pages`의 컴포넌트에서만 사용 가능하다. / `fetch`는 어디서든 사용 가능하다.
- `asyncData`는 `this`를 사용하지 못하는 대신 `context`를 인자로 받는다. / `fetch`는 사용 가능하다.
- `asyncData`는 반환하면 `data`와 병합한다. / `fetch`는 `this`를 사용해 `data`를 변경한다.
- `asyncData`는 로직이 끝날 때까지 페이지 전환 자체를 막기 때문에 오래 걸리면 기다려야할 수도 있다. 만일 에러가 발생하면 렌더링되지 않는다. / `fetch`는 `$fetchState`를 통해 pending, error 상태 값을 통해 렌더링 방식을 마음대로 구성할 수 있다.
- `asyncData`는 컴포넌트가 만들어지기 전에 호출된다. / `fetch`는 컴포넌트가 만들어진 이후 호출된다.
- `asyncData`는 페이지가 로드될 때마다 호출된다. / `fetch`는 컴포넌트 내에 함수처럼 사용 가능하다. 즉, 여러 번 호출이 가능하며 `activated` hook을 통해 동일한 페이지로 이동할 때 조건에 따라 호출하게 할 수 있다.
- `asyncData`는 캐시를 사용하지 않는다. / `fetch`는 캐시를 사용하여 한 번 방문했던 곳에서 원하는 데이터를 저장할 수 있다.

## 결론

`asyncData`는 컴포넌트가 만들어지기 전부터 실행되기 때문에 어찌보면 **좀 더 빨리 데이터를 불러오기 시작한다는 장점**이 있지만 `fetch`가 좀 더 유연하게 에러 처리를 할 수 있고 `this`를 사용할 수 있다는 장점이 있는 것 같다.

복잡한 로직이 아니라면 `asyncData`를, 에러 처리나 자주 호출해야하는 상황이 있다면 `fetch`를 쓰면 어떨까.
