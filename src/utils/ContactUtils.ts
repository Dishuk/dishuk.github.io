export default class ContactUtils {
  public static readonly linkedin: string = 'https://linkedin.com/in/dmytro-hranchak-69162521b';
  public static readonly github: string = 'https://github.com/Dishuk';

  public static readonly email: string = 'dmytro.hranchak@gmail.com';
  public static readonly subject: string = 'Hey!';

  public static generateMailtoLink() {
    const encodedEmail = encodeURIComponent(this.email);
    const encodedSubject = encodeURIComponent(this.subject);

    return `mailto:${encodedEmail}?subject=${encodedSubject}`;
  }
}
