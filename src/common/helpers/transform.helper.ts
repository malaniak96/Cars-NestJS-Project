export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim().toLowerCase() : value;
  }
  public static trimmer({ value }) {
    return value ? value.trim() : value;
  }
  public static trimEmail({ value }) {
    return value.trim().toLowerCase();
  }
  public static trimPassword({ value }) {
    return value.trim();
  }

  public static trimUpperCase({ value }) {
    return value.trim().toUpperCase();
  }

  public static trimArray({ value }) {
    return value && Array.isArray(value)
      ? value.map((item) => item.trim())
      : value;
  }
}
