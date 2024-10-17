---
outline: deep
---

# Zustand 使用

## 安装

```sh
$ npm install zustand
```

## 简单创建

`create`

```js
import { create } from "zustand";

const useStore = create((set) => ({
  // state
  bears: 0,
  // actions
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
```

`import in components`

```jsx
function BearCounter() {
  const bears = useStore((state) => state.bears);
  // state, bind with content
  return <h1>{bears} around here...</h1>;
}

function Controls() {
  // action, reflect by event
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
```

## 引入 typescript

`type one`

```ts
import { create } from "zustand";

// type for state
type State = {
  count: number;
};

// type for actions
type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

// store bind with type
const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));
```

`type two`

```ts
import { create } from "zustand";

// use interface <someState> include state and actions
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
```

`with middlewares`: have not to do anyting special

## 与 immer 组合使用

```typescript
export const useCountStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    increment: (qty: number) =>
      set((state) => {
        state.count += qty;
      }),
    decrement: (qty: number) =>
      set((state) => {
        state.count -= qty;
      }),
  }))
);
```

## 持久化

`basic use`;

```js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
```

`options`:

- `name`:
  - `only required`
  - `unique`
- `storage`:
  - type: `() => StateStorage`
  - recommanded to use the `createJsonStorage` with `StateStorage`
- `partialize`:
  - type: `(state: Object) => Object`
  - default: `(state) => state`
  - pick some of states'filede to be stored in storage
- `version`:
  - type: `number`
  - default: `0`
- `migrate` (迁移):
  - type: `(persistedState: Object, version: number) => Object | Promise<Object>`
- `merge` (合并):
  - type: `(persistedState: Object, currentState: Object) => Object`
  - example: `{ foo: { bar: 0 }}` => `{foo: { bar: 0, baz: 1 }}`

:::code-group

```js [partialize]
export const useBoundStore = create(
  persist(
    (set, get) => ({
      foo: 0,
      bar: 1,
    }),
    {
      // ...
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["foo"].includes(key))
        ),
    }
  )
);
```

```js [version and migrate]
export const useBoundStore = create(
  persist(
    (set, get) => ({
      newField: 0, // let's say this field was named otherwise in version 0
    }),
    {
      // ...
      version: 1, // a migration will be triggered if the version in the storage mismatches this one
      migrate: (persistedState, version) => {
        if (version === 0) {
          // if the stored value is in version 0, we rename the field to the new name
          persistedState.newField = persistedState.oldField;
          delete persistedState.oldField;
        }

        return persistedState;
      },
    }
  )
);
```

```js [merge]
export const useBoundStore = create(
  persist(
    (set, get) => ({
      foo: {
        bar: 0,
        baz: 1,
      },
    }),
    {
      // ...
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState),
    }
  )
);
```

:::

## more

more api (getOptions, setOptions, clearStorage...):

- [see](https://zustand.docs.pmnd.rs/integrations/persisting-store-data#getoptions)
