export function bindAll(self, toBind) {
  const l = toBind.length;

  for (let i = 0; i < l; i += 1) {
    self[toBind[i]] = self[toBind[i]].bind(self);
  }
}

export function linearstep(edge0, edge1, x) {
  let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t;
}
export function smoothstep(edge0, edge1, x) {
  let t = linearstep(edge0, edge1, x);
  return t * t * (3.0 - 2.0 * t);
}

export function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
