export let plugins : Array<IPatchPlugin> = [];
export interface IPatchPlugin {
  test : (element, source, property) => boolean;
  resolve : (element, source, property, context? : any) => any;
}
export function registerPlugin(plugin : IPatchPlugin) {
  plugins.push(plugin);
}
export function getPlugin(element, source, property) : IPatchPlugin | null {
  let plugin = null;
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].test(element, source, property)) {
      plugin = plugins[i];
    }
  }
  return plugin;
}