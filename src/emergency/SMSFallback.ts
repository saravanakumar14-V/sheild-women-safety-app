export class SMSFallback {
  sendSOS(contact: string, message: string) {
  sendSMS(contact, `${message}\nReply YES to acknowledge.`);
}
}