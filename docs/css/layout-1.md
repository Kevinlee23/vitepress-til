# 布局实例一

布局预期效果如下：

![layout](/images/layout-1-preview.png)

`home.vue`

```vue
<script setup lang="ts">
import ThreeColumnLayout from "../layouts/ThreeColumnLayout.vue";
import ArticleCard from "../components/ArticleCard.vue";
import WidgetFriendSuggestions from "../components/WidgetFriendSuggestions.vue";
import useArticles from "../composables/useArticles";
const articles = useArticles().getArticles();
</script>

<template>
  <!-- the layout has 3 columns -->
  <ThreeColumnLayout>
    <h2 class="text-3xl font-bold mb-4">Homepage content</h2>
    <ArticleCard v-for="article in articles" :article="article" />

    <template #aside>
      <WidgetFriendSuggestions />
    </template>
  </ThreeColumnLayout>
</template>
```

`ThreeColumnLayout`

```vue
<script setup>
import AppNavigation from "../components/AppNavigation.vue";
import AppFooter from "../components/AppFooter.vue";
import AppLogo from "../components/AppLogo.vue";
</script>

<template>
  <div class="three-column-layout">
    <header>
      <AppLogo />
      <AppNavigation />
    </header>

    <main>
      <slot />
    </main>

    <aside>
      <slot name="aside" />
      <AppFooter />
    </aside>
  </div>
</template>

<style scoped lang="scss">
.three-column-layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "aside";

  header {
    grid-area: header;
    margin-top: 30px;
  }
  main {
    grid-area: main;
    margin-top: 10px;
    padding: 20px;
  }
  aside {
    grid-area: aside;
    margin-top: 10px;
    padding: 20px;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: "header main aside";
  }
}
</style>
```

实际效果如下：

![layout](/images/layout-1-display.png)