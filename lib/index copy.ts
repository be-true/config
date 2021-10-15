import { isArgumentsObject } from "util/types";

const configClasses: {new (...args: any[]): {}}[] = [];

export function configClass(target: { new (...args: any[]): {} }) {
  configClasses.push(target);
  console.log("Register class ", target)
}

class TestBase {
  constructor() {
    this.validate()
  }

  validate() {
    const list: { [key: string]: any } = Object.getOwnPropertyDescriptors(
      // @ts-ignore
      this.__proto__
    );

    const self: any = this;
    Object.entries(list)
      .filter(([_, desc]) => desc.get !== undefined)
      .forEach(([name, _]) => {
        self[name];
      });

    return this;
  }
}

@configClass
class Test1 extends TestBase {
  constructor() {
    super();
    console.log("Create Test1")
  }

  get asd() {
    return "asd";
  }
}

@configClass
class Test2 extends TestBase {
  constructor() {
    super();
    console.log("Create Test2")
  }
}

configClasses.forEach(c => new c())
