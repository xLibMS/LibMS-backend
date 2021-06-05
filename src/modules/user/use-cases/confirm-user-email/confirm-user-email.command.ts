export interface ConfirmUserEmailProps {
  confirmationToken: string;
}

export class ConfirmUserEmailCommand {
  constructor(props: ConfirmUserEmailProps) {
    this.confirmationToken = props.confirmationToken;
  }

  readonly confirmationToken: string;
}
