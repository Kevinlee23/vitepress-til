# 一些按钮

## 壹

<div class="one-hover-animation">
  Try it free
</div>

```scss
.one-hover-animation {
  transition: all 0.4s;
  display: inline-block;
  width: fit-content;
  position: relative;
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  border-width: 4px;
  border-style: solid;
  border-color: black;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    width: 0px;
    z-index: -1;
    background: black;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }
  &:hover {
    color: white;
  }
  &:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
```

<style lang="scss">
.one-hover-animation {
  transition: all 0.4s;
  display: inline-block;
  width: fit-content;
  position: relative;
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  border-width: 4px;
  border-style: solid;
  border-color: black;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    width: 0px;
    z-index: -1;
    background: black;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }
  &:hover {
    color: white;
  }
  &:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>
