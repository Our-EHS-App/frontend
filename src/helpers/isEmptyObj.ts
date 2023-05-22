/**
 * It takes an object and returns true if the
 * object is empty or if all of its properties are falsy
 * @param obj - { [k: string]: unknown }
 * @returns A function that takes an object and returns a boolean.
 */
export const IsEmptyObj = (obj: { [k: string]: unknown }) => {
  const newObj = { ...obj };
  if (!newObj) {
    return true;
  }
  for (const k in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, k) && !newObj[k]) {
      delete newObj[k];
    }
  }
  return Object.keys(newObj).length === 0;
};

export function conditionalInObject<Type>(
  condition: boolean,
  item: Type
): Type | null {
  return condition ? item : null;
}

export const isTrue: (obj: any) => boolean = (obj: any) => {
  return obj == 'true' || obj == true;
};
