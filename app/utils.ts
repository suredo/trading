/**
 * A simplified utility function for conditionally joining class names.
 *
 * @param args - A list of arguments, which can be strings, objects, or arrays.
 * - Strings: CSS class names.
 * - Objects: Key-value pairs where the key is the class name, and the value
 * is a boolean.  If the value is true, the class is included.
 * - Arrays:  Arrays of strings or objects (which are flattened recursively).
 * @returns A string of class names, with any falsey values or excluded classes removed.
 */
export function cn(...args: any[]): string {
  const classes = [];

  for (const arg of args) {
    if (!arg) {
      continue; // Skip falsey values (null, undefined, false, 0, '')
    }

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      if (Array.isArray(arg)) {
        // Recursively handle arrays
        classes.push(cn(...arg)); // Spread the result of the recursive call
      } else {
        // Handle objects
        for (const key in arg) {
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ').trim();
}
