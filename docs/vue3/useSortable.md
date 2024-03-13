# useSortable

Wrapper for sortable

## Install

`npm install sortablejs@^1`

`npm install @vueuse/integrations`

## Usage

```js

import { useSortable } from '@vueuse/integrations/useSortable'

// const el = ref<HTMLElement | null>(null)  ts 定义

/**
 * @ref HTML element
 * @list real list
 * @animation ms, animation speed moving items when sorting, `0` — without animation
 * @ghostClass Class name for the drop placeholder
 * @chosenClass Class name for the chosen item
 */
const option = useSortable(ref, list, {
  animation: 150,
  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  onEnd(() => {
    // Element dragging ended
  })
});

// You can use the option method to set and get the option of Sortable
option('animation', 200) // set
option('animation') // 200
```

For more infomation on what options can be passed, see:

- sortable options https://github.com/SortableJS/Sortable#options
