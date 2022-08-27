---
date: '1994'
---

<script setup>
import { useData, useRouter } from 'vitepress'

const { theme } = useData()
const Router = useRouter()
const list = theme.value.sidebar[0].items || []
const routerGo = (url) => {
  Router.go(url)
}

</script>
<h4 v-for="(i, k) in list">
  <a style="display: flex;" href="javaScript:void(0);" @click="routerGo(i.link.split('.md')[0])">
      <span style="flex:1">{{k+1}}. {{i.text}}</span>
      <span>{{i.date}}</span>
  </a>
</h4>