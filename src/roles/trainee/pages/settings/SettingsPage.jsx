
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import styles from "./SettingsPage.module.css";

export default function SettingsPage({
  onChangePassword,
  loading = false,
}) {
  const { t, i18n } = useTranslation();

  const [activeTab] = useState("password");
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
      ...(field === "newPassword" ? { confirmPassword: "" } : {}),
    }));

    setStatus({ type: "", message: "" });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.currentPassword) {
      nextErrors.currentPassword = t(
        "settings.validation.currentRequired",
        { defaultValue: "Current password is required." }
      );
    }

    if (!formData.newPassword) {
      nextErrors.newPassword = t(
        "settings.validation.newRequired",
        { defaultValue: "New password is required." }
      );
    } else if (formData.newPassword.length < 8) {
      nextErrors.newPassword = t(
        "settings.validation.minLength",
        { defaultValue: "Password must contain at least 8 characters." }
      );
    } else if (formData.newPassword === formData.currentPassword) {
      nextErrors.newPassword = t(
        "settings.validation.samePassword",
        { defaultValue: "New password must differ from current password." }
      );
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = t(
        "settings.validation.confirmRequired",
        { defaultValue: "Please confirm your new password." }
      );
    } else if (
      formData.newPassword !== formData.confirmPassword
    ) {
      nextErrors.confirmPassword = t(
        "settings.validation.passwordMismatch",
        { defaultValue: "Passwords do not match." }
      );
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validateForm()) return;

    if (typeof onChangePassword !== "function") {
      setStatus({
        type: "error",
        message: t("settings.apiNotConnected", {
          defaultValue:
            "Password update is not connected to the API yet.",
        }),
      });
      return;
    }

    try {
      await onChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setStatus({
        type: "success",
        message: t("settings.success", {
          defaultValue: "Your password has been changed successfully.",
        }),
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          t("settings.failure", {
            defaultValue:
              "Unable to change your password. Please try again.",
          }),
      });
    }
  };

  const passwordFields = [
    {
      name: "currentPassword",
      label: t("settings.currentPassword", {
        defaultValue: "Current password",
      }),
      placeholder: t("settings.currentPlaceholder", {
        defaultValue: "Enter your current password",
      }),
      visible: showCurrentPassword,
      toggle: () => setShowCurrentPassword((value) => !value),
    },
    {
      name: "newPassword",
      label: t("settings.newPassword", {
        defaultValue: "New password",
      }),
      placeholder: t("settings.newPlaceholder", {
        defaultValue: "Enter your new password",
      }),
      visible: showNewPassword,
      toggle: () => setShowNewPassword((value) => !value),
    },
    {
      name: "confirmPassword",
      label: t("settings.confirmPassword", {
        defaultValue: "Confirm new password",
      }),
      placeholder: t("settings.confirmPlaceholder", {
        defaultValue: "Re-enter your new password",
      }),
      visible: showConfirmPassword,
      toggle: () =>
        setShowConfirmPassword((value) => !value),
    },
  ];

  return (
    <main className={styles.page} dir={i18n.dir()}>
      <header className={styles.pageHeader}>
        <div className={styles.headerIcon}>
          <LockKeyhole size={25} />
        </div>

        <div>
          <h1 className={styles.pageTitle}>
            {t("settings.title", {
              defaultValue: "Settings",
            })}
          </h1>

          <p className={styles.pageDescription}>
            {t("settings.description", {
              defaultValue:
                "Manage your account security and password.",
            })}
          </p>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>
            {t("settings.account", {
              defaultValue: "Account",
            })}
          </p>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "password" ? styles.activeTab : ""
            }`}
            aria-current="page"
          >
            <LockKeyhole size={18} />
            <span>
              {t("settings.changePassword", {
                defaultValue: "Change Password",
              })}
            </span>
          </button>
        </aside>

        <section className={styles.content}>
          <div className={styles.cardHeader}>
            <div>
              <h2>
                {t("settings.changePassword", {
                  defaultValue: "Change Password",
                })}
              </h2>

              <p>
                {t("settings.passwordDescription", {
                  defaultValue:
                    "Update your password to keep your account secure.",
                })}
              </p>
            </div>

            <div className={styles.securityIcon}>
              <ShieldCheck size={23} />
            </div>
          </div>

          <div className={styles.divider} />

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            {passwordFields.map((field) => (
              <div className={styles.field} key={field.name}>
                <label htmlFor={field.name}>
                  {field.label}
                  <span className={styles.required}>*</span>
                </label>

                <div
                  className={`${styles.inputWrapper} ${
                    errors[field.name] ? styles.inputError : ""
                  }`}
                >
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.visible ? "text" : "password"}
                    value={formData[field.name]}
                    onChange={(event) =>
                      updateField(field.name, event.target.value)
                    }
                    placeholder={field.placeholder}
                    autoComplete={
                      field.name === "currentPassword"
                        ? "current-password"
                        : field.name === "newPassword"
                          ? "new-password"
                          : "new-password"
                    }
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name]
                        ? `${field.name}-error`
                        : undefined
                    }
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className={styles.visibilityButton}
                    onClick={field.toggle}
                    aria-label={
                      field.visible
                        ? t("settings.hidePassword", {
                            defaultValue: "Hide password",
                          })
                        : t("settings.showPassword", {
                            defaultValue: "Show password",
                          })
                    }
                    disabled={loading}
                  >
                    {field.visible ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors[field.name] && (
                  <p
                    className={styles.errorText}
                    id={`${field.name}-error`}
                    role="alert"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <p className={styles.passwordHint}>
              {t("settings.passwordHint", {
                defaultValue:
                  "Use at least 8 characters. Avoid reusing your current password.",
              })}
            </p>

            {status.message && (
              <div
                className={
                  status.type === "success"
                    ? styles.successMessage
                    : styles.errorMessage
                }
                role="status"
              >
                {status.message}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setErrors({});
                  setStatus({ type: "", message: "" });
                }}
                disabled={loading}
              >
                {t("common.cancel", {
                  defaultValue: "Cancel",
                })}
              </button>

              <button
                type="submit"
                className={styles.saveButton}
                disabled={loading}
              >
                {loading
                  ? t("common.saving", {
                      defaultValue: "Saving...",
                    })
                  : t("settings.saveChanges", {
                      defaultValue: "Save Changes",
                    })}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
