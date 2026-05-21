declare module "maath/random" {
  export function inSphere(
    buffer: Float32Array,
    options?: { radius?: number; center?: number[] }
  ): Float32Array;
  
  // Add other maath random functions if needed in the future
}
