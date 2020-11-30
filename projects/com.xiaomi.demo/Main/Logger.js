import { Service } from 'miot';

export class _Logger {
  constructor() {
  }

  log(...data) {
    console.log(data);
  }

  /*
      @param page: this, this.constructor.name
      @param func: myFunction.name
      @param params: Object
  */
  trace(page, func, func_params = {}) {
    let params = {
      ...func_params
    };
    params.page_name = page.constructor.name;
    params.func_name = func instanceof Function ? func.name : 'constructor';
    Service.smarthome.reportEvent('rn_plugin_demo', params);
    console.log('统计=>: ', JSON.stringify(params, null, `\t`));
  }
}

const Logger = new _Logger();
export default Logger;