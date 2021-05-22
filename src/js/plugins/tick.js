import evt from "./events";
import { bindAll } from "js/utils";

export default new (class {
  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    bindAll(this, ["tick"]);
    this.addEvents();
  }
  addEvents() {
    this.tick();
  }
  tick(t) {
    evt.emit("tick", t);
    requestAnimationFrame(this.tick);
  }
})();
