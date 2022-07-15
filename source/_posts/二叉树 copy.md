---
title: LRU 缓存
date: 2022-03-01
---

# LRU 缓存

> LRU 的主体思想在于：如果数据最近被访问过,那么将来被访问的几率也更高。

`hashMap + 双向链表`

LRU（Least Recently Used）即最近最少使用缓存，前端在做性能优化的时候会经常用到使用到缓存，用以空间换时间的方式来达到性能优化目标。

1. 需要给定一个数据结构的长度，不能无限制的缓存数据；
2. LRU 实例提供一个 get 方法，可通过关键字 key 获取缓存中数据，若没有则返回 -1；
3. LRU 实例提供一个 put 方法，变更数据值，若数据存在则修改，不存在则插入一条新数据，插入时超过数据长度则删除最久未使用的关键字。
4. get、put 的时间复杂度必须是 O(1)

> 如果用数组存储那么第 4 点的复杂度为 O(n)
> 实现数据对象操作选择使用 双向链表
> 为了解决查询 O(n)，搭配 Map 使用

```
class LRUcache {
  capacity: number
  cache: Map<number, number | null>
  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const node = this.cache.get(key) as number
      this.cache.delete(key)
      this.cache.set(key, node)
      return node
    }
    return -1
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // 迭代器获取下一个 next().value，置空存
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}
```

### keepAlive 中的 LRU 缓存使用

keepAlive 包裹的组件在第一次渲染之后把 VNode 缓存起来，并不需要进行组件初始化。

### 线性表

#### 数据：顺序储存结构

- 查询时间复杂度为 O(1)
- 增和删为 O(N)(插入尾部为 O(1))
- 需要占据连续内存空间

链表：链式储存结构

- 查询时间复杂度为 O(n)
- 增和删为 O(1)

```
class ListNode {
    val: number
    next: ListNode | null
    pre: ListNode | null
    constructor(val?: any, pre?: ListNode | null, next?: ListNode | null) {
        this.val = val
        this.next = (next===undefined ? null : next)
    }
}
```
