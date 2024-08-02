<script setup>
import WqAnswer from '../.vitepress/theme/components/wq-answer.vue'
import { agileList } from './questions.js'
</script>

# 敏捷错题

<wq-answer v-for="item in agileList" :detail="item" />
