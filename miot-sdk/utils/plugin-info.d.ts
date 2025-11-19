/**
 * @description 获取插件信息，
 *
 * @export fetchPluginInfos
 * @param {array<string>} [models=[]] 需要获取的插件model
 * @param {array<object>} [specifiedModelVersions=[]] 需要获取的指定版本插件model和版本
 * @return {Promise<array>}
 */
export function fetchPluginInfos(models?: any, specifiedModelVersions?: any): Promise<array>;