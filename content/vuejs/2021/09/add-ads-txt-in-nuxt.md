---
title: Nuxt에서 ads.txt 추가하는 방법
image: /images/add-ads-txt-in-nuxt/210923-183129.png
tags:
  - adsense
createdAt: 2021-09-24
---

Google Adsense를 사용하는데 ads.txt를 추가하지 않으면 손실이 발생할 수 있다는 무서운 경고를 받았다.

<!--more-->

Nuxt에서도 이를 추가해줘야하는데 다행히도 방법이 아주 쉽다.

## 1. ads.txt 다운로드

위 이미지에서 나오는 데로 `다운로드` 클릭하면 `ads.txt` 파일이 다운로드 된다. 나같은 경우 이런 식으로 내용이 들어있다.

```txt
google.com, pub-2649674681017229, DIRECT, f08c47fec0942fa0
```

## 2. static 폴더에 넣기

이 파일을 static 폴더에 넣어주기만 하면 끝!

![](/images/add-ads-txt-in-nuxt/210923-190002.png)

그럼 (실제 주소)/ads.txt 에 들어가면 나타나는 것을 볼 수 있다.

## 3. 기다리기

반영되기까지 약간 시간이 걸리므로 푸시한 이후 차분히면 기다리면 된다.
