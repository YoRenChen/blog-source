---
title: 对TS的type和interface思考
date: 2021-10-25
---

# 对TS的type和interface思考
我们知道type 和 interface的区别，如：

1. 基本类型使用type，因为 interface做不到
2. 元祖使用 type，因为 interface做不到
3. 函数使用 type， 因为可读性更好
4. MappedType 使用type
```
type Fruit = 'apple' | 'orange' | 'banana';
type FruitCount = {
  [key in Fruit]: number;
}
const fruits: FruitCount = {
  apple: 2,
  orange: 3,
  banana: 4
};
```
5. UnionType 使用type，因为interface没发Union
```
type Fruit = 'apple' | 'pear' | 'orange';
type Vegetable = 'broccoli' | 'carrot' | 'lettuce';
// 'apple' | 'pear' | 'orange' | 'broccoli' | 'carrot' | 'lettuce';
type HealthyFoods = Fruit | Vegetable;
```
除了之外，都用 interface。因为性能更好：
> Interfaces create a single flat object type that detects property conflicts, which are usually important to resolve! Intersections on the other hand just recursively merge properties, and in some cases produce never. Interfaces also display consistently better, whereas type aliases to intersections can't be displayed in part of other intersections. Type relationships between interfaces are also cached, as opposed to intersection types as a whole. A final noteworthy difference is that when checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type.


```
const enum A {
  a,
  b
}
interface K {
  a: A
}
type V = {
  a: A
}
type CustomData<T> = T extends {
    [key: string]: string | number
} ? T : never
const a: CustomData<K> = {
  // Type 'A' is not assignable to type 'never'.(2322)
  a: A.a
}
```
interface 可以多次定义、扩充和覆盖；而 type 是一锤定音的，那么对于 type 来说，我们可以直接一口气推导到最终结果，而 interface 却不能。

> Just to fill people in, this behavior is currently by design. Because interfaces can be augmented by additional declarations but type aliases can't, it's "safer" (heavy quotes on that one) to infer an implicit index signature for type aliases than for interfaces. But we'll consider doing it for interfaces as well if that seems to make sense

(来源)[https://github.com/microsoft/TypeScript/issues/15300#issuecomment-332366024]