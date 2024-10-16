import { Notify } from "quasar";

function errorMessage(message, icon) {
  Notify.create({
    message: message,
    icon: icon ? icon : "error",
    position: "top",
    color: "negative",
    badgeColor: "red",
  });
}

function warningMessage(message, icon) {
  Notify.create({
    message: message,
    icon: "error",
    icon: icon ? icon : "warning",
    position: "top",
    color: "warning",
    textColor: "dark",
    badgeColor: "orange",
  });
}

function positiveMessage(message, icon) {
  Notify.create({
    message: message,
    icon: icon ? icon : "done",
    position: "top",
    color: "positive",
    badgeColor: "blue",
  });
}

function infoMessage(message, icon) {
  Notify.create({
    message: message,
    icon: icon ? icon : "info",
    position: "top",
    color: "info",
    badgeColor: "yellow",
  });
}

export { errorMessage, warningMessage, positiveMessage, infoMessage };
