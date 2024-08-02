<script setup>
import WqAnswer from '../.vitepress/theme/components/wq-answer.vue'
import { processList } from './questions.js'
</script>

# 过程组错题

<wq-answer v-for="item in processList" :detail="item" />