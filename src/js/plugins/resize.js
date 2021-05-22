import evt from "./events";
import { bindAll } from "js/utils";

export default new (class {
  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    bindAll(this, ["onResize"]);
    this.addEvents();
  }
  addEvents() {
    evt.on("resize", window, this.onResize);
  }
  onResize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    evt.emit("resize", { w: this.w, h: this.h });
  }
})();
