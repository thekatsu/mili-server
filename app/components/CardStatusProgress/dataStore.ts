//aciona o inngest caso não tenha o processo ativo
//

export function dataStore() {
  let idx = 0;
  let data = {
    idx,
    total: 1000,
  };
  let listeners: any = [];

  function emitChange() {
    for (let listener of listeners) {
      listener();
    }
  }

  setInterval(() => {
    data = {
      ...data,
      idx: idx++,
    };
    emitChange();
  }, 1000);

  return {
    subscribe(listener: any) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l: any) => l !== listener);
      };
    },
    getSnapshot() {
      return data;
    },
  };
}
