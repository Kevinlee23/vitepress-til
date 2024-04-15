<script lang="ts" setup>
import { getNewNBlogs } from "../../constant/2024-mark-link";
import type { Link } from "../../utils/createTag";

const newBlogs: Link[] = getNewNBlogs();

const handleTo = (link: string) => {
  window.location.href = "/vitepress-til" + link;
};
</script>

<template>
  <div class="new-blog-container">
    <div class="new-blog-title">最新笔记</div>
    <div class="new-blog-grid">
      <div
        v-for="(blog, index) in newBlogs"
        :key="index"
        class="new-blogs-box"
        @click="handleTo(blog.link)"
      >
        <div class="new-blog-item">
          {{ blog.title }}
          <div class="blog-tag">{{ blog.tagName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.new-blog-container {
  margin: 32px 0;
}

.new-blog-title {
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 16px;
}

.new-blog-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
}

.new-blogs-box {
  position: relative;

  .new-blog-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    min-height: 100px;
    padding: 10px;

    border-radius: 8px;
    background-color: #f6f6f7;

    cursor: pointer;

    &:hover {
      color: white;
      background-color: #2c9678;

      transform: translateX(-10px) translateY(-10px);

      .blog-tag {
        color: white;
      }
    }

    .blog-tag {
      font-size: 12px;
      font-weight: 500;
      text-align: right;
      color: #2c9678;
    }
  }
}
</style>
