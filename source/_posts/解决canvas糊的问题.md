---
title: 解决canvas糊的问题
date: 2021-08-12
---

# 解决 canvas 糊的问题

对于 css 宽度，跟所有其它移动端的 css 一样。css 是逻辑像素，跟真实设备像素宽度存在一个换算比 ，1px 对应真实物理像素多少 1px。具体是多少，由 dpr，也就是 window.devicePixelRatio 决定。记为 Radio1

我们写 style 宽高 100 _ 100（ content="width=device-width" ），可能直接就能对应物理的，300 _ 300。所以非常高清。但这只是 style 的，是 canvas 容器的，而不是 canvas 的像素矩阵的。

canvas.width 的像素，跟实际物理像素也存在一个换算比，这个换算比现在就是 1。记为 Radio2=1

所以在 style width 为 100 的画布上画 canvas.width 为 100 的画，相当于把 100 的像素映射到 200 或者 300，相当于 大屏看蓝光，就会糊。

```
// 获取canvas与实际屏幕像素的比例
const getRadio = () => window.devicePixelRatio || 1;

const setupCanvas = (canvas) => {
  const r = getRadio();
  const rect = canvas.getBoundingClientRect();
  // 扩大像素矩阵的宽高
  canvas.width = rect.width * r;
  canvas.height = rect.height * r;
  const ctx = canvas.getContext('2d');
  // 像素矩阵变大后由于1对1映射，不再会拉伸，100就是真实物理的100，就会导致图变小。所以需要scale放大
  ctx.scale(r, r);
  return ctx;
}

const ctx = setupCanvas(canvas);
```
