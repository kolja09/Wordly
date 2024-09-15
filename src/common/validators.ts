import { helpers, required, email } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

export function useValidators() {
  const { t } = useI18n();

  const requiredField = () =>
    helpers.withMessage(() => t("errors.requiredField"), required);

  const passwordValidator = () =>
    helpers.withMessage(
      () => t("errors.password"),
      (value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(value)
    );

  const emailValidator = () =>
    helpers.withMessage(() => t("errors.invalidEmail"), email);

  const userNameValidator = () =>
    helpers.withMessage(
      () => t("errors.userNameField"),
      (value: string) => value.length >= 2
    );

  return {
    requiredField,
    passwordValidator,
    emailValidator,
    userNameValidator,
  };
}
