export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim().toLowerCase() : value;
  }

  public static trimmer({ value }) {
    return value.trim();
  }

  public static trimEmail({ value }) {
    return value.trim().toLowerCase();
  }
  public static trimPassword({ value }) {
    return value.trim();
  }

  public static trimCurrency({ value }) {
    return value.trim().toUpperCase();
  }
}
