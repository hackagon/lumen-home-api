import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return moment(value, 'DD-MM-YYYY', true).isValid();
  }

  defaultMessage(): string {
    return 'Invalid date format. It should be in the format DD-MM-YYYY.';
  }
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsDateFormatConstraint,
    });
  };
}
