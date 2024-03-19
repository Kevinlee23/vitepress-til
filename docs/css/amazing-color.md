<script setup>
import { ref } from 'vue'
import {
  BLUE_COLOR, BLUE_COLOR_NAME, GREEN_COLOR, GREEN_COLOR_NAME, RED_COLOR, RED_COLOR_NAME, BROWNISH_YELLOW, BROWNISH_YELLOW_NAME, PURPLE_COLOR, PURPLE_COLOR_NAME, WHITE_COLOR, WHITE_COLOR_NAME
} from './color.constant.js'

const blueColor = ref(BLUE_COLOR)
const blueColorName = ref(BLUE_COLOR_NAME)
const greenColor = ref(GREEN_COLOR)
const greenColorName = ref(GREEN_COLOR_NAME)
const redColor = ref(RED_COLOR)
const redColorName = ref(RED_COLOR_NAME)
const yellowColor = ref(BROWNISH_YELLOW)
const yellowColorName = ref(BROWNISH_YELLOW_NAME)
const purpleColor = ref(PURPLE_COLOR)
const purpleColorName = ref(PURPLE_COLOR_NAME)
const whiteColor = ref(WHITE_COLOR)
const whiteColorName = ref(WHITE_COLOR_NAME)

const handleClick = (type, index) => {
  let selected = null
  let temp = ''
  let copy = ''

  switch (type) {
    case 'blue': 
      selected = blueColorName.value
      temp = blueColorName.value[index]
      copy = blueColor.value[index]
      break
    case 'green': 
      selected = greenColorName.value
      temp = greenColorName.value[index]
      copy = greenColor.value[index]
      break
    case 'red': 
      selected = redColorName.value
      temp = redColorName.value[index]
      copy = redColor.value[index]
      break
    case 'purple': 
      selected = purpleColorName.value
      temp = purpleColorName.value[index]
      copy = purpleColor.value[index]
      break
    case 'yellow': 
      selected = yellowColorName.value
      temp = yellowColorName.value[index]
      copy = yellowColor.value[index]
      break
    default: 
      selected = whiteColorName.value
      temp = whiteColorName.value[index]
      copy = whiteColor.value[index]
  }

  navigator.clipboard.writeText(copy)
  selected[index] = 'Copy!'
  setTimeout(() => {
    selected[index] = temp
  }, 2000)
}
</script>

# 令人惊讶的颜色

## Blue

<div :class="$style.container">
  <div 
    v-for="(color, index) in blueColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('blue', index)"
  >
    <div>{{ color }}</div>
    <div>{{ blueColorName[index] }}</div>
  </div>
</div>

## Green

<div :class="$style.container">
  <div
    v-for="(color, index) in greenColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('green', index)"
  >
    <div>{{ color }}</div>
    <div>{{ greenColorName[index] }}</div>
  </div>
</div>

## Red

<div :class="$style.container">
  <div
    v-for="(color, index) in redColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('red', index)"
  >
    <div>{{ color }}</div>
    <div>{{ redColorName[index] }}</div>
  </div>
</div>

## Brownish Yellow

<div :class="$style.container">
  <div
    v-for="(color, index) in yellowColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('yelow', index)"
  >
    <div>{{ color }}</div>
    <div>{{ yellowColorName[index] }}</div>
  </div>
</div>

## Purple

<div :class="$style.container">
  <div
    v-for="(color, index) in purpleColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('purple', index)"
  >
    <div>{{ color }}</div>
    <div>{{ purpleColorName[index] }}</div>
  </div>
</div>

## White

<div :class="$style.container">
  <div
    v-for="(color, index) in whiteColor"
    :class=$style.card
    :style="{backgroundColor: color}"
    :onClick="() => handleClick('white', index)"
  >
    <div>{{ color }}</div>
    <div>{{ whiteColorName[index] }}</div>
  </div>
</div>

<style module>
.container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.card {
  font-size: 14px;
  font-family: 'Fira Code';
  height: 92px;
  padding: 0px 10px;
  border-radius: 8px;
  color: white;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
</style>
