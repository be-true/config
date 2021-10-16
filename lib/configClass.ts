export const configClasses: {new (...args: any[]): {}}[] = [];
export function configClass(target: { new (...args: any[]): {} }) {
  configClasses.push(target);
}
