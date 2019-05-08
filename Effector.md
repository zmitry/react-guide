# Effector api intro

Features:

- Decentralized stores.
- Built in batching without any setTimeout's or globals.
- Cycles and complex dependency flow optimizations.
- Exposed core primitives for building custom operators similar to map, watch, on, etc.
- User managed batching.
- Ability to build reactive models on top of effector primitives

# Intro

## Basic api

```ts
import { createStore, createEvent, Event } from "effector";

const isMyModalOpened = createStore(false);

const openModal: Event<boolean> = createEvent("open");
const closeModal: Event<boolean> = createEvent("close");

isMyModalOpened.on(openModal, (state, actionPayload) => true);
isMyModalOpened.on(closeModal, (state, actionPayload) => false);

isMyModalOpened.watch(currentState => {
  console.log("modal state now is: " + currentState ? "opened" : "closed");
});

openModal();
closeModal();
```

A bit more sugar

```js
import { createStore, createEvent, createApi } from "effector";

const isMyModalOpened = createStore(false);

const {openModal, closeModal} = createApi(isMyModalOpened, {
    openModal(state,actionPayload ) {
        return true
    }
    closeModal(state,actionPayload ) {
        return false
    }
})

isMyModalOpened.watch(currentState => {
  console.log("modal state now is: " + currentState ? "opened" : "closed");
});

openModal();
closeModal();
```

## Computed values

```js
import { createStore, createEvent, createApi } from "effector";

const isMyModalOpened = createStore(false);

// create computed value
const modalInfo = isMyModalOpened.map(currentState =>
  currentState ? "opened" : "closed"
);

const {openModal, closeModal} = createApi(isMyModalOpened, {
    openModal(state,actionPayload ) {
        return true
    }
    closeModal(state,actionPayload ) {
        return false
    }
})

.watch(currentState => {
  console.log("modal now is: " + currentComputedState);
});

openModal();
closeModal();
```

## Stores composition

```js
import { createStore, createEvent, createStoreObject, combine } from "effector";

const isModalOpened = createStore(false);
const isModalDataLoaded = createStore(false);

// createStoreObject will create composed store for you. You can map it and add watcher on it.
// But you have to handle each of store updates in the respective store but not in composed store
// think about it more like computed rather than combineReducers
const composedStore = createStoreObject({
  isModalOpened,
  isModalDataLoaded
});

// in some cases you might want to custom combine function for store composition
const composedStoreAlt = combine(isModalOpened, isModalDataLoaded, () => {
  return { isModalOpened, isModalDataLoaded };
});

// you will get store updates if one of the stores has changed its value
composedStoreAlt.watch(console.log);
composedStore.watch(console.log);
```

# Advanced usage

```js
import { createStore, createEvent, createStoreObject } from "effector";

const changeText = createEvent("change text");

const text = createStore("");

// shows if text is empty (has spaces or tabs but not content)
const isTextEmpty = createStore(false);

// !! here we subscribed to store changes and whenever text store changes it will trigger change in isTextValid
// effector will handle updates for us, so we will get only required set of updates
isTextValid.on(text, (isEmpty, text) => text.trim() != "");

// and now we combined store and dependent store so in result we have such dependency tree
/* changeText-> text ---------------> rootStore -> watch
 *               \                    /
 *                \-> isTextValid -> /
 *  In this case effector knows your store structure and sees that rootStore needs to be updated only once.
 *  Effector computes synchronously what state needs to be changed and what watches to run and it does that without mutating your data
 * Comparing to mobx this approach is more reliable, faster and leads to better debug experience in future
 */
const rootStore = createStoreObject({
  isTextEmpty,
  text
});

rootStore.watch(store => {
  console.log("update with value", store);
});

changeText("  ");

changeText("  asfd");
```
