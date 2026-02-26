type AnyRecord = Record<string, any>;

const toStringId = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object" && typeof (value as AnyRecord).$oid === "string") {
    return (value as AnyRecord).$oid;
  }
  if (value && typeof (value as AnyRecord).toString === "function") {
    const asString = (value as AnyRecord).toString();
    if (asString && asString !== "[object Object]") return asString;
  }
  return null;
};

export const normalizeLandingPage = (item: any): AnyRecord => {
  const root = item?._doc ?? item ?? {};
  const id = toStringId(root._id ?? item?._id);

  return {
    ...root,
    _id: id ?? root._id,
    heading: root.heading ?? "",
    describe: root.describe ?? "",
    imageLandpageurl: root.imageLandpageurl ?? item?.imageLandpageurl,
  };
};

export const normalizeLandingPages = (items: any[]): AnyRecord[] => {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeLandingPage);
};
