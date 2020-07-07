// @ts-nocheck
class GlobalStore {
  store = global;

  constructor() {
    this.prefix = `_MIOTRN${new Date().getTime()}`;
  }

  static getInstance() {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }

    return GlobalStore.instance;
  }

  getValue(key) {
    return this.store[`${this.prefix}${key}`];
  }

  setValue(key, value) {
    this.store[`${this.prefix}${key}`] = value;
  }

}

export default GlobalStore;