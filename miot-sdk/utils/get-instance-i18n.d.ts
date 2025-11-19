export function getI18nForSpecs(specs?: any[], did?: any): any;
/**
 * 将多个文案配置依次合并成一个，后者相对于前者的差异部分，替换或新增
 * 注意：参数中不需要带有语言标识
 * @param {object} 文案配置，如{title: 'xxx'}，支持多个参数依次列开
 * @return {object} 合并后的配置
 */
export function mergeI18n(...i18ns: any[]): object;