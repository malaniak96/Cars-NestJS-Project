export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim().toLowerCase() : value;
  }

  public static trimEmail({ value }) {
    return value.trim().toLowerCase();
  }
}
