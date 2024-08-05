<script setup>
import WqAnswer from '../.vitepress/theme/components/wq-answer.vue'
import { dualList } from './questions.js'
</script>

# 多选题

<wq-answer v-for="item in dualList" :detail="item" type="dual" />