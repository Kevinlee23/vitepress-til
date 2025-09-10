<script lang="ts" setup>
import { getNewNBlogs } from "../../constant/2025-mark-link";
import type { Link } from "../../utils/createTag";

const newNum = 10;
const newBlogs: Link[] = getNewNBlogs(newNum);

const handleTo = (link: string) => {
  window.open("/vitepress-til" + link);
};
</script>

<template>
  <div class="new-blog-container">
    <div class="new-blog-title">最新笔记 (Newest {{ newNum }})</div>
    <div class="grid gap-[10px] 2xl:grid-cols-5 2xl:gap-[20px] lg:grid-cols-4 md:grid-cols-2">
      <div
        v-for="(blog, index) in newBlogs"
        :key="index"
        class="new-blogs-box"
        @click="handleTo(blog.link)"
      >
        <div class="new-blog-item">
          {{ blog.title }}
          <div class="blog-item-sub">
            <div>{{ blog.createDate }}</div>
            <div class="blog-tag">{{ blog.tagName }}</div>
          </div>
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

.new-blogs-box {
  background-color: #f6f6f7;
  border-radius: 8px;

  font-weight: 500;
  color: black;

  cursor: pointer;

  .new-blog-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    min-height: 100px;
    padding: 10px;

    border-radius: 8px;

    // transition
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 400ms;
    transition-delay: 200ms;

    .blog-item-sub {
      display: flex;
      justify-content: space-between;

      font-size: 12px;
      .blog-tag {
        text-align: right;
        color: #2c9678;
      }
    }
  }

  &:hover {
    background-color: #83cbac !important;

    .new-blog-item {
      color: white !important;
      background-color: #2c9678 !important;

      transform: translateX(-10px) translateY(-10px);

      /* right-bottom border  */
      border-bottom: inset white 4px;
      border-right: inset white 4px;
      .blog-item-sub {
        .blog-tag {
          color: white !important;
        }
      }
    }
  }
}

.dark {
  .new-blogs-box {
    background-color: #202127;

    color: white;
  }
}
</style>
