// import Utils from './utils';
// 全局事件处理
export default (globalEventProfiles, EventEmitter) => {
  const createEventProfile = (eventType, builder) => {
    const profile = globalEventProfiles[eventType] || { actions: new Set() };
    if (profile.close) {
      profile.close();
    } else {
      globalEventProfiles[eventType] = profile;
    }
    profile.emitter = {
      get eventType() { return eventType; },
      emit: (...args) => {
        profile.actions.forEach((cb) => cb(...args));
      },
      isEmpty() {
        return profile.actions.size < 1;
      },
      clear() {
        profile.actions.clear();
      },
      onAddListener: (callback) => callback,
      onRemoveListener: () => { }
    };
    profile.close = builder(profile.emitter);
    profile.addListener = (callback) => {
      callback = profile.emitter.onAddListener(callback);
      profile.actions.add(callback);
      return {
        remove() {
          profile.actions.delete(callback);
          profile.emitter.onRemoveListener(callback);
        }
      };
    };
    profile.toString = () => {
      return eventType;
    };
    return {
      get name() {
        return eventType;
      },
      close: profile.close,
      clear: profile.emitter.clear,
      addListener: profile.addListener,
      emit: profile.emitter.emit,
      toString: profile.toString
    };
  };
  const createEventManager = (eventsDef) => {
    const eventProfiles = {};
    Object.keys(eventsDef).forEach((name) => {
      const def = eventsDef[name];
      if (typeof (def) === "function") {
        eventProfiles[name] = createEventProfile(name, def);
        return;
      }
      const realname = def.sameas || name;
      const createProfile = (builder) => {
        const profile = createEventProfile(realname, builder);
        eventProfiles[realname] = profile;
        if (def.sameas) {
          eventProfiles[name] = profile;
        }
      };
      if (def.local) {
        createProfile(() => () => {});
        return;
      }
      if (def.forever) {
        if (typeof (def.forever) != "function") {
          def.forever = (emitter) => (...args) => emitter.emit(...args);
        }
        createProfile((emitter) => {
          const ret = { subscription: EventEmitter.addListener(realname,
            def.forever(emitter)
          ) };
          return () => {
            if (ret.subscription) {
              ret.subscription.remove();
              ret.subscription = null;
              if (emitter.onClose) {
                emitter.onClose();
              }
            }
          };
        });
        return;
      }
      if (def.always) {
        if (typeof (def.always) != "function") {
          def.always = (emitter) => (...args) => emitter.emit(...args);
        }
        createProfile((emitter) => {
          const ret = {};
          const close = () => {
            if (ret.subscription) {
              ret.subscription.remove();
              ret.subscription = null;
              if (emitter.onClose) {
                emitter.onClose();
              }
            }
          };
          emitter.onAddListener = (callback) => {
            if (!ret.subscription) {
              ret.subscription = EventEmitter.addListener(realname, def.always(emitter));
            }
            return callback;
          };
          emitter.onRemoveListener = () => {
            if (emitter.isEmpty()) {
              close();
            }
          };
          return close;
        });
        return;
      }
    });
    return eventProfiles;
  };
  return {
    createEventProfile,
    createEventManager
  };
};